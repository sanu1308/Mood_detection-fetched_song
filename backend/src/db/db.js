const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(" connected to mongoDB");
    })
    .catch((err)=>{
        console.error("ERROR coonecting with mongoDB is:",err)
    })
}
module.exports=connectDB;