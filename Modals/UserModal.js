const mongoose = require('mongoose');
const {isEmail} = require("validator")

const UserScheama = mongoose.Schema({
    userName : {
        type : String , 
        required : true ,
    },
    email : {
        type : String ,
        required : [true,'Please enter an Email'],
        validate : [isEmail ,'Please enter a valid email'],
        unique : true,
        lowercase : true
    },
    password : {
        type :String,
        required :[true,'Please enter an PassWord'],
        min : [6,'Minimum password length is 6 characters'],
    },
},{
    timestamps : true
})

const UserModal = mongoose.model('UserModal',UserScheama);
export default UserModal
