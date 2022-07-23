const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/note-book?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1"
const connectTomongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connect to Mongo sucessfully');
    })
}
module.exports = connectTomongo;