const jwt = require('jsonwebtoken');
const Attendance=require("../models/attendance");
const admin = require('../models/admins');


async function markAttendance(req,res) {
    try{
        const token = req.body.token;
        if(!token){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const username = jwt.decode(token,process.env.JWT_SECRET);
        const adminresponse = await admin.find({username: username});
        if(adminresponse.length == 0){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const {Rollno,Class,Section,Present,Date}= req.body;
        await Attendance.create({Rollno: Rollno,class: Class,section: Section,Present: Present,Date: Date})
        .then(()=>{
            return res.status(200).json({msg: " Attendence Marked Successfully "})
        })
        .catch(err=>{
            return res.status(500).json({error: err});
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}


async function getAttendance(req,res) {
    try{
        const token = req.body.token;
        if(!token){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const username = jwt.decode(token,process.env.JWT_SECRET);
        const adminresponse = await admin.find({username: username});
        if(adminresponse.length == 0){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const rollno = req.body.rollno;
        if(!rollno){
            return res.status(200).json({error:"Roll no. not found"});
        }
        const response = await Attendance.find({ Rollno: rollno });
        if(response.length==0){
            return res.status(500).json({error: "No Attendence found"});
        }
        return res.status(200).json(response);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}


async function getAll(req,res) {
    try{
        const token = req.body.token;
        if(!token){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const username = jwt.decode(token,process.env.JWT_SECRET);
        const adminresponse = await admin.find({username: username});
        if(adminresponse.length == 0){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const response = await Attendance.find({});
        if(response.length==0){
            return res.status(500).json({error: "No Attendence found"});
        }
        return res.status(200).json(response);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}



async function countAttendance(req,res) {
    try{
        const token = req.body.token;
        if(!token){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const username = jwt.decode(token,process.env.JWT_SECRET);
        const adminresponse = await admin.find({username: username});
        if(adminresponse.length == 0){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const rollno = req.body.rollno;
        if(!rollno){
            return res.status(200).json({error:"Roll no. not found"});
        }
        const response = await Attendance.find({ Rollno: rollno });
        const anotherresponse = await Attendance.find({Rollno: rollno,Present: true});
        if(response.length==0){
            return res.status(500).json({error: "No Attendence found"});
        }
        return res.status(200).json({Total: `${anotherresponse.length}/${response.length}`});


    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}



module.exports={
    markAttendance,
    getAttendance,
    countAttendance,
    getAll,
}