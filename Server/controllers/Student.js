const jwt = require('jsonwebtoken');
const student = require('../models/student');
const admin = require('../models/admins');


async function handleBioData(req,res) {
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
        const id = req.params.id;
        if(!id){
            return res.status(200).json({error:"Student not found !!"});
        }
        const response = await student.find({ _id: id });
        if(response.length==0){
            return res.status(400).json({error: "Invalid Studentd ID !!"});
        }
        return res.status(200).json(response[0]);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

async function allStudents(req,res) {
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
        const response = await student.find({});
        if(response.length==0){
            return res.status(500).json({error: "No Student Found"});
        }
        return res.status(200).json(response);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

async function StudentClassWise(req,res) {
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
        var response;
        if(req.body.section){
            response = await student.find({Class:req.body.Class,section: req.body.section});
        }
        else{
            response = await student.find({Class:req.body.Class});
        }

        if(response.length==0){
            return res.status(500).json({error: "No Student Found"});
        }
        return res.status(200).json(response);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}

async function handleDelete(req,res) {
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
        const id = req.params.id;
        const result = await student.findByIdAndDelete(id);
        return res.status(200).json({msg: "Deleted Record Successfully !!"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports={
    handleBioData,
    allStudents,
    StudentClassWise,
    handleDelete,
}