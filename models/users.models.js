const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone_number: Number,
    password: String,
    token: String
});

const users = mongoose.model("users", userSchema)

module.exports = users;