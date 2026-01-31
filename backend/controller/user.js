const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite:'Lax'
}

exports.loginThroughGmail = async(req, res) => {
    try{
        const {
            token
        } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        const {
            sub, email, name, picture
        } = payload;
        const userExist = await User.findOne({
            email
        });
        if(!userExist){
            userExist = await User.create({
                googleId: sub,
                email,
                f_name:name,
                profilePice: picture
            })
        }
        let jwttoken = jwt.sign({
            userId:userExist._id
        }, process.env.JWT_PRIVATE_KEY)
        res.cookie('token', jwttoken,cookieOptions)
        return res.status(200).json({
            user: userExist
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:'Server Error',
            message:err.message
        })
    }
}
exports.register = async(req, res)=>{
    try{
        let{
            email, password,f_name
        } = req.body;
        let doesUserExist = await User.findOne({
            email
        });
        if(doesUserExist){
            res.status(400).json({
                error:'Already have an account with this email. Try another email!'
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({
            email, password:hashedPassword, f_name
        });
        await newUser.save();
        return res.status(201).json({
            message: "User registered successfully",
            success:'yes',
            data:newUser
        })

    }catch(err){
        res.status(500).json({
            error:'Server error',
            message:err.message
        })

    }
}

exports.login = async(req,res)=>{
    try{
        let{
            email, password,f_name
        } = req.body;
        const userExist = await User.findOne({email});
        if(userExist && await bcryptjs.compare(password, userExist.password)){
            let token = jwt.sign({
                userId:userExist._id
            }, process.env.JWT_PRIVATE_KEY)
            res.cookie('token', token,cookieOptions)
            return res.join({
                message:'Logged in',
                success:'true',
                userExist
            })

        }else{
            return res.status(400).json({
                error:'Invalid credentials'
            })
        }

    }catch(err){
        res.status(500).json({
            error:'Server error',
            message:err.message
        })

    }
}