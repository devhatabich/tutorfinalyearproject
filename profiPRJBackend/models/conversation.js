const mongoose = require('mongoose')

const ConvoSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
},{timestamps:true})
const ConvoModel = mongoose.model('conversation', ConvoSchema);
module.exports = ConvoModel;