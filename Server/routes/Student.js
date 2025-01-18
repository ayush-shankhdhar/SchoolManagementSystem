const express = require('express');
const router = express.Router();
const {handleBioData,allStudents,StudentClassWise,handleDelete} = require('../controllers/Student');
const{handleNewStud}=require("../controllers/newAdmit");

router.post('/delete/:id',handleDelete);
router.post('/getall',allStudents);
router.post('/new',handleNewStud);
router.post('/class',StudentClassWise);
router.post('/:id',handleBioData);

module.exports = router;