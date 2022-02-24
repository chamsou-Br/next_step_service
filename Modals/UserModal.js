const mongoose = require('mongoose');
const {isEmail} = require("validator")
const bcrypt = require("bcrypt");
const res = require('express/lib/response');
const authController =  require("../Controllers/AuthController")

const UserScheama = mongoose.Schema({
    userName : {
        type : String ,
        required : [true,'Please enter an userName'], 
        unique : true,
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
        min : [8,'Minimum password length is 6 characters'],
    },
},{
    timestamps : true
})

UserScheama.statics.login = async(email , password , isWithGoogle,) => {
    try {
        if (!isWithGoogle) {
            const user = await UserModal.findOne({email});
            if (user) {
                const auth = await bcrypt.compare(password , user.password);
                if (auth) {
                    return {user}
                }
                throw Error('incorrect Password');
            }
            throw Error('incorrect Email');
        }else {
            const user = await UserModal.findOne({email});
            if (user) {
                return {user} 
            }
            throw Error('incorrect Email');
        }
    }catch (err) {
        const errour = authController.HandlError(err);
        return {err  : errour}
    }
}
UserScheama.statics.register = async(userName , email , password , isWithGoogle) => {
    try{
        if (!isWithGoogle) {
            const salt = await bcrypt.genSalt();
            let passwordHash = null;
            if (password.length > 8) {
                 passwordHash = await bcrypt.hash(password , salt);
           } else {
               console.log("errooooooooor");
               throw Error("password min length")
           } 
            const user = await UserModal.create({
                userName : userName,
                email : email ,
                password : passwordHash
            });
            return {user}
        }else {
            const user = await UserModal.create({
                userName : userName,
                email : email ,
            });
            return {user}
        }
    }catch(err) {
        const errour = authController.HandlError(err);
        return {err  : errour}
    }
}

const UserModal = mongoose.model('UserModal',UserScheama);
module.exports =  UserModal
