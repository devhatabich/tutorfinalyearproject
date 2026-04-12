const Report = require('../models/report');
const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');
const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');
const Meeting = require('../models/meeting');

exports.getStats = async (req, res) => {
    try {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const [totalUsers, totalPosts, pendingReports, totalMeetings, newUsersThisWeek] = await Promise.all([
            User.countDocuments(),
            Post.countDocuments(),
            Report.countDocuments({ status: 'pending' }),
            Meeting.countDocuments(),
            User.countDocuments({ createdAt: { $gte: weekAgo } }),
        ]);
        return res.status(200).json({ totalUsers, totalPosts, pendingReports, totalMeetings, newUsersThisWeek });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user').sort({ createdAt: -1 });
        return res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find({ status: 'pending' })
            .populate('reporter')
            .sort({ createdAt: -1 });
        return res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.markReportRead = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByIdAndUpdate(id, { status: 'read' });
        if (!report) return res.status(404).json({ error: 'Report not found' });
        return res.status(200).json({ message: 'Report marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.markReportReviewed = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id);
        if (!report) return res.status(404).json({ error: 'Report not found' });

        if (report.reportType === 'post') {
            await Post.findByIdAndDelete(report.targetId);
        } else if (report.reportType === 'message') {
            await MessageModel.findByIdAndDelete(report.targetId);
        }

        report.status = 'reviewed';
        await report.save();

        return res.status(200).json({ message: 'Report reviewed and content removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.freezeUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Delete all posts by this user
        await Post.deleteMany({ user: userId });

        // Remove from all friends/pending lists
        await User.updateMany(
            { $or: [{ friends: userId }, { pending_friends: userId }] },
            { $pull: { friends: userId, pending_friends: userId } }
        );

        // Delete conversations and messages
        const conversations = await ConversationModel.find({ members: userId });
        const convIds = conversations.map(c => c._id);
        await MessageModel.deleteMany({ conversation: { $in: convIds } });
        await ConversationModel.deleteMany({ members: userId });

        // Delete notifications
        await Notification.deleteMany({ $or: [{ sender: userId }, { reciever: userId }] });

        // Delete meetings
        await Meeting.deleteMany({ $or: [{ creator: userId }, { receiver: userId }] });

        // Mark user reports as reviewed
        await Report.updateMany({ targetId: userId.toString(), reportType: 'user' }, { status: 'reviewed' });

        // Delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: 'User account removed from system' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};
