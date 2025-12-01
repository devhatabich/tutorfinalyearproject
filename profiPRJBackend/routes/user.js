const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/authentication');
const UserController = require("../controller/user");
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('google', UserController.loginThroughGmail())

router.get('/self',Authentication.auth, (req,res)=>{
    return res.status(200).json({
        user:req.user
    })
})
module.exports = router;