const mongoose = require('mongoose');

async function connectToDb() {
    mongoose.connect(process.env.MONGOURL)
    .then(console.log("Connected to Database !!"))
    .catch(err=>{console.log("Error Connecting to Database: ",err)});
}

module.exports = {
    connectToDb,
}