const mongoose=require("mongoose");

const studentDetail=new mongoose.Schema({
    Rollno:{
        type:Number,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Fathername:{
        type:String,
        required:true,
    },
    Mothername:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    cgpa:{
        type:Number,
        required:true,
    },
    Class:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    mobno:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
});

const student=mongoose.model("student",studentDetail);

module.exports=student;