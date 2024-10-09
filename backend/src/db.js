require('dotenv').config();
const mongoose = require("mongoose");
const url =  process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(url)
    .then(() =>{ console.log("MongoDB connected")})
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


const schema2 = new mongoose.Schema({
    username: String,
    password: String,
    todos: {
        type: [{
            title: { type: String, default: "" },
            description: { type: String, default: "" }
        }],
        default: []
    }
});

const User = mongoose.model('User', schema2); 

module.exports = User;
