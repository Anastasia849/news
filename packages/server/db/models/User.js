const mongoose = require('mongoose');
// const Role = require('../../constants/roles');

// const userSchema = new mongoose.Schema({
//     login: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     fullName: { type: String, required: true },
//     // avatarSrc: { type: String },
//     role: { type: String, required: true, default: Role.USER },
// }, {versionKey: false});

const userSchema = new mongoose.Schema({
    login: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
    role: {type: String, required: true, default: "User"}}, 
    {versionKey: false});

const User = mongoose.model("user", userSchema);

module.exports = User;