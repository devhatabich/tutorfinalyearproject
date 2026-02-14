const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fyp').then(res=>{
    console.log("Database Successfully connected")
}).catch(err=>{
    console.log(err)
})

















