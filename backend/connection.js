const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/profi').then(res=>{
//     console.log("success!")
// }).catch(err=> {
//     console.log(err)
// })

//5vsvQskF598okKt7

//mongodb+srv://cstimich_prj:5vsvQskF598okKt7@cluster0.f4tqxty.mongodb.net/?appName=Cluster0

mongoose.connect('mongodb+srv://cstimich_prj:5vsvQskF598okKt7@cluster0.f4tqxty.mongodb.net/?appName=Cluster0').then(()=>{
    console.log("Success!")
}).catch(err=> {
    console.log(err)
})