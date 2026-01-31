const mongoose = require('mongoose')

const NotifSchema = new mongoose.Schema({
    receiver:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
    sender:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
    content:
        {
            type:String,
            required:true
        },
    type:{
        type:String,
        required:true,
        enum:['friendrequest','comment']
    },
    isRead:{
        type:Boolean,
        default:false
    },
    postId:{
        type:String,
        default:''
    }
},{timestamps:true})
const NotifModel = mongoose.model('message', NotifSchema);
module.exports = NotifModel;