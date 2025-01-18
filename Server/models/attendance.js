const mongoose=require("mongoose");
const studAttend=new mongoose.Schema({
    Rollno:{
        type:Number,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    Present:{
        type:Boolean,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    }
});

const Attendance=mongoose.model("Attendance",studAttend)
module.exports=Attendance;