const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName:
    {
        type:String
    },
    lastName:
    {
        type:String
    },
    email:
    {
        type:String,
        required:true,
        // unique: true,
        // min:6,
        // max:255
    },
    username:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true,
        // min:8,
        // max:1024
    },
    isAdmin:
    {
        type:Boolean,
        default:false
    },
    dateAdded:
    {
        type:Date,
        default:Date.now
    }

});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;