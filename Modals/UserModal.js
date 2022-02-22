const mongoose = require('mongoose');
const {isEmail} = require("validator")
const bcrypt = require("bcrypt");
const res = require('express/lib/response');

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

UserScheama.statics.login = async(email , password , isWithGoogle,) => {
    try {
        if (!isWithGoogle) {
            const user = await UserModal.findOne({email,password});
            if (user) {
                const auth = await bcrypt.compare(user);
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
        return {err}
    }
}
UserScheama.statics.register = async(userName , email , password , isWithGoogle) => {
    try{
        if (!isWithGoogle) {
            const salt = await bcrypt.genSalt();
            let passwordHash = null;
            if (password ) {
                 passwordHash = await bcrypt.hash(password , salt);
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
        return {err}
    }
}

const UserModal = mongoose.model('UserModal',UserScheama);
module.exports =  UserModal
