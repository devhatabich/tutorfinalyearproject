const Meeting = require('../models/meeting');
const User = require('../models/user');
const Notification = require('../models/notification');

exports.createMeeting = async (req, res) => {
    try {
        const { receiverId, title, description, scheduledAt, pointsPromised } = req.body;
        const creator = req.user;

        if (!receiverId || !title || !scheduledAt || !pointsPromised) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (creator.points < pointsPromised) {
            return res.status(400).json({ error: `Insufficient points. You have ${creator.points} points.` });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ error: 'Receiver not found' });

        if (creator._id.equals(receiverId)) {
            return res.status(400).json({ error: 'Cannot schedule a meeting with yourself' });
        }

        const meetingDate = new Date(scheduledAt);
        const startOfDay = new Date(meetingDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(meetingDate);
        endOfDay.setHours(23, 59, 59, 999);

        // 1. Max 3 meetings per day for creator
        const creatorDailyCount = await Meeting.countDocuments({
            $or: [{ creator: creator._id }, { receiver: creator._id }],
            scheduledAt: { $gte: startOfDay, $lte: endOfDay }
        });
        if (creatorDailyCount >= 3) {
            return res.status(400).json({ error: 'You cannot have more than 3 meetings on the same day' });
        }

        // 2. Max 3 meetings per day for receiver
        const receiverDailyCount = await Meeting.countDocuments({
            $or: [{ creator: receiverId }, { receiver: receiverId }],
            scheduledAt: { $gte: startOfDay, $lte: endOfDay }
        });
        if (receiverDailyCount >= 3) {
            return res.status(400).json({ error: 'The recipient already has 3 meetings scheduled for this day' });
        }

        // 3. One meeting with same person per day
        const existingWithPerson = await Meeting.findOne({
            $or: [
                { creator: creator._id, receiver: receiverId },
                { creator: receiverId, receiver: creator._id }
            ],
            scheduledAt: { $gte: startOfDay, $lte: endOfDay }
        });
        if (existingWithPerson) {
            return res.status(400).json({ error: 'You can only schedule one meeting with the same person per day' });
        }

        // 4. No overlapping meetings (1 hour gap)
        const oneHourMillis = 60 * 60 * 1000;
        const startWindow = new Date(meetingDate.getTime() - oneHourMillis + 1);
        const endWindow = new Date(meetingDate.getTime() + oneHourMillis - 1);

        const overlappingCreator = await Meeting.findOne({
            $or: [{ creator: creator._id }, { receiver: creator._id }],
            scheduledAt: { $gte: startWindow, $lte: endWindow }
        });
        if (overlappingCreator) {
            return res.status(400).json({ error: 'You have another meeting scheduled within 1 hour of this time' });
        }

        const overlappingReceiver = await Meeting.findOne({
            $or: [{ creator: receiverId }, { receiver: receiverId }],
            scheduledAt: { $gte: startWindow, $lte: endWindow }
        });
        if (overlappingReceiver) {
            return res.status(400).json({ error: 'The recipient has another meeting scheduled within 1 hour of this time' });
        }

        const meeting = new Meeting({
            creator: creator._id,
            receiver: receiverId,
            title,
            description: description || '',
            scheduledAt: new Date(scheduledAt),
            pointsPromised,
        });
        await meeting.save();

        // Notify receiver
        await new Notification({
            sender: creator._id,
            reciever: receiverId,
            content: `${creator.f_name} has scheduled a meeting with you: "${title}"`,
            type: 'meeting_created',
        }).save();

        // Notify creator (confirmation)
        await new Notification({
            sender: receiverId,
            reciever: creator._id,
            content: `Your meeting "${title}" with ${receiver.f_name} has been scheduled`,
            type: 'meeting_created',
        }).save();

        const populated = await meeting.populate('creator receiver');
        return res.status(201).json({ message: 'Meeting created', meeting: populated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.getMeetings = async (req, res) => {
    try {
        const userId = req.user._id;
        const meetings = await Meeting.find({
            $or: [{ creator: userId }, { receiver: userId }]
        }).populate('creator receiver').sort({ scheduledAt: 1 });

        const now = new Date();
        for (const meeting of meetings) {
            if (meeting.status === 'pending' && new Date(meeting.scheduledAt) < now && !meeting.rateReminderSent) {
                meeting.status = 'completed';
                meeting.rateReminderSent = true;
                await meeting.save();

                await new Notification({
                    sender: meeting.receiver._id,
                    reciever: meeting.creator._id,
                    content: `Your meeting "${meeting.title}" has concluded. Please rate your experience.`,
                    type: 'meeting_rate_reminder',
                }).save();

                await new Notification({
                    sender: meeting.creator._id,
                    reciever: meeting.receiver._id,
                    content: `Your meeting "${meeting.title}" has concluded. You may receive a rating soon.`,
                    type: 'meeting_rate_reminder',
                }).save();
            }
        }

        return res.status(200).json({ meetings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const meeting = await Meeting.findById(id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

        if (!meeting.creator.equals(userId) && !meeting.receiver.equals(userId)) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (meeting.status === 'rated') {
            return res.status(400).json({ error: 'Cannot delete a rated meeting' });
        }

        await Meeting.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Meeting deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.rateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const meeting = await Meeting.findById(id).populate('creator receiver');
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

        if (!meeting.creator._id.equals(userId)) {
            return res.status(403).json({ error: 'Only the meeting creator can rate' });
        }

        if (meeting.status !== 'completed') {
            return res.status(400).json({ error: 'Meeting is not ready to be rated' });
        }

        const pointsTransferred = Math.round(meeting.pointsPromised * rating / 5);

        const creator = await User.findById(meeting.creator._id);
        creator.points = Math.max(0, creator.points - pointsTransferred);
        await creator.save();

        const receiver = await User.findById(meeting.receiver._id);
        receiver.points += pointsTransferred;
        receiver.stars.push({
            rating,
            comment: comment || '',
            meetingId: meeting._id,
            fromUser: userId,
            fromUserName: creator.f_name,
            meetingTitle: meeting.title,
            meetingDate: meeting.scheduledAt,
        });
        await receiver.save();

        meeting.status = 'rated';
        meeting.rating = rating;
        meeting.comment = comment || '';
        meeting.pointsTransferred = pointsTransferred;
        await meeting.save();

        await new Notification({
            sender: meeting.receiver._id,
            reciever: meeting.creator._id,
            content: `${pointsTransferred} points have been deducted from your account for rating "${meeting.title}"`,
            type: 'points_deducted',
        }).save();

        await new Notification({
            sender: meeting.creator._id,
            reciever: meeting.receiver._id,
            content: `${creator.f_name} rated your meeting "${meeting.title}" ${rating}/5 stars. You received ${pointsTransferred} points!`,
            type: 'points_received',
        }).save();

        return res.status(200).json({ message: 'Meeting rated successfully', pointsTransferred });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};
