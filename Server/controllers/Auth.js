const jwt = require('jsonwebtoken');
const admin = require('../models/admins');
const bcrypt = require('bcryptjs');

async function handleLogin(req,res) {
    var token;
    try{
        const {username,password} = req.body;
        const response = await admin.find({username: username});
        if(response.length==0){
            return res.status(200).json({error: "Invalid Username"});
        }
        if(response[0].password != password){
            return res.status(200).json({error: "Invalid Password"});
        }
        token = jwt.sign(username,process.env.JWT_SECRET);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    return res.status(200).json({msg:"Success",token: token});
}

async function handlePasswordReset(req,res){
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
        const {password, newPassword} = req.body;

        const isMatch = await bcrypt.compare(password,adminresponse[0].password); 

        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect old password" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10); 
        await admin.findByIdAndUpdate(
            adminresponse[0]._id,
            { password: hashedNewPassword }
        );
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports={
    handleLogin,
    handlePasswordReset,
}