const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    clearedHistory: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            clearedAt: { type: Date }
        }
    ]
},{timestamps:true});

const ConversationModel = mongoose.model('conversation',ConversationSchema);
module.exports = ConversationModel;