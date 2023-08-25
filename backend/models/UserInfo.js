const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    token: {type:String, default:""}
},{timestamps: true})

module.exports = mongoose.model('UserInfo', UserInfo);