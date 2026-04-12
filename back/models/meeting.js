const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    scheduledAt: { type: Date, required: true },
    pointsPromised: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['pending', 'completed', 'rated'], default: 'pending' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, default: '' },
    pointsTransferred: { type: Number },
    rateReminderSent: { type: Boolean, default: false },
}, { timestamps: true });

const MeetingModel = mongoose.model('meeting', MeetingSchema);
module.exports = MeetingModel;
