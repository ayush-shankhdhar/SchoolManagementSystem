
const express = require('express');
const app = express();
require('dotenv').config();

const {connectToDb} = require('./middlewares/Database');
const cors = require('cors');

const port = process.env.PORT || 6666;
const AuthRouter = require('./routes/Auth');
const StudentRouter = require('./routes/Student');
const AttendanceRouter = require('./routes/Attendance');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectToDb();
app.use('/api/auth',AuthRouter);
app.use('/api/student',StudentRouter);
app.use('/api/attendence',AttendanceRouter);

app.listen(port,()=>{
    console.log(`Server is Running on PORT: ${port}`);
})