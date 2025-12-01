const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('./connection');
require('dotenv').config({path:'./config.env'});
const PORT = process.env.PORT || 7777;
// app.get('/', (req, res)=> {
//     res.send({
//         message:"Congratulations you have created a backend server"
//     })
// })
app.use(express.json());
app.use(cookieParser());
const UserRoutes = require("./routes/user");
app.use('/api/auth', UserRoutes);
app.listen(7777, () => {
    console.log("Backend server is running on port:", PORT)
})