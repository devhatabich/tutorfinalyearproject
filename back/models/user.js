const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
    },
    f_name: {
        type: String,
        default: ""
    },
    headline: {
        type: String,
        default: ""
    },
    curr_company: {
        type: String,
        default: ""
    },
    curr_location: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default:""
    },
    cover_pic:{
        type:String,
        default:''
    },
    about: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [
        {
            designation: {
                type: String,
            },
            company_name: {
                type: String,
            },
            duration: {
                type: String,
            },
            location: {
                type: String,
            },
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    resume: {
        type: String,
    },
    points: {
        type: Number,
        default: 500,
    },
    stars: [
        {
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String, default: '' },
            meetingId: { type: mongoose.Schema.Types.ObjectId, ref: 'meeting' },
            fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            fromUserName: { type: String },
            meetingTitle: { type: String },
            meetingDate: { type: Date },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    linkedinConnected: {
        type: Boolean,
        default: false,
    },
    twitterConnected: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

const userModel = mongoose.model('user',UserSchema);
module.exports = userModel;