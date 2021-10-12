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
        type:String
    },
    username:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    isAdmin:
    {
        type:Boolean,
        default:false
    }

});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;