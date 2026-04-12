const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    reportType: { type: String, enum: ['message', 'post', 'user'], required: true },
    targetId: { type: String, required: true },
    reason: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'read', 'reviewed'], default: 'pending' },
    targetSnapshot: { type: Object, default: {} },
}, { timestamps: true });

const ReportModel = mongoose.model('report', ReportSchema);
module.exports = ReportModel;
