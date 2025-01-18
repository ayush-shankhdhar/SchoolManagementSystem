const express=require("express");
const router = express.Router();

const{markAttendance,getAttendance,countAttendance,getAll}=require("../controllers/Attendance");

router.post("/mark",markAttendance);
router.post("/student",getAttendance);
router.post("/all",getAll);
router.post("/count",countAttendance);

module.exports=router;
