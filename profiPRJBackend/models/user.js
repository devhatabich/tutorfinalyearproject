const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true

    },
    f_name:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:""
    },

    curr_location:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },
    cover_pic:{
        type:String,
        default:'https://www.farmersjournal.ie/WEBFILES/000/710/256/1861240-710256.jpg'
    },
    about:{
        type:String,
        default:""
    },
    skills:{
        type:[String],
        default:[],
    },
    experience:[
        {
            designation:{
                type:String,
            },
            course_name:{
                type:String,
            },
            year:{
                type:String,
            },
            campus:{
                type:String,
            }

        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    pending_friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    resume:{
        type:String
    }
}, {timestamps:true});

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;