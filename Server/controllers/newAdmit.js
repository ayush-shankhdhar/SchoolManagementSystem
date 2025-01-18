const jwt=require("jsonwebtoken");
const admin=require("../models/admins");
const student=require("../models/student");


async function handleNewStud(req,res) {
    try {
        const token=req.body.token;
        if(!token){
            return res.status(200).json({error:"Unauthorized access"});
        }
        const username=jwt.decode(token,process.env.JWT_SECRET);
        const adminresponse=await admin.find({username:username});
        if(adminresponse.length == 0){
            return res.status(200).json({error:"Unauthorised access"});
        }
        const{Name,Fathername,Mothername,Gender,cgpa,Class,mobno,address}=req.body;
        var section = 'A';
        const secA = await student.find({Class,section:'A'});
        const secB = await student.find({Class,section:'B'});
        if (secA.length > secB.length){
            section = 'B';
        }
        const students =  await student.find({Class,section});
        students.sort((a, b) => b.Rollno - a.Rollno);
        const Rollno = students[0].Rollno + 1;
        await student.create({
            Rollno,
            Name,
            Fathername,
            Mothername,
            Gender,
            cgpa,
            Class,
            section,
            mobno,
            address,
        })
        .then(()=>{
            return res.status(200).json({msg: "New student Admited Successfully "})
        })
        .catch(err=>{
            return res.status(500).json({error: err});
        })
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
    
}

module.exports={
    handleNewStud,
}