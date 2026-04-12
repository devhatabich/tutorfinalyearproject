const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"conversation"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    message: {
        type:String,
    },
    picture:{
        type:String
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        default: null
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const MessageModel = mongoose.model('message',MessageSchema);
module.exports = MessageModel;