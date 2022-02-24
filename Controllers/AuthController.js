const jwt = require('jsonwebtoken');
const UserModal = require("../Modals/UserModal")

const checkuser =  (req , res , next) => {
    const token = req.cookies.jwt ;
    if (token) {
        jwt.verify(token,"step_service_save_your_time",async (err , encoded) => {
            if (err) {
                throw Error('error in JWT');
            }
            if (encoded) {
                const user = await UserModal.findById(encoded.id);
                res.send({existe : true , user : user }) ;
            }
        })
    }
    else res.send({existe : false})
}

const getToken = async(id) => {
    return  jwt.sign({id} , "step_service_save_your_time" , {
         expiresIn : 3 * 60 * 60 * 24,
     })
 };


const HandlError = (err) => {
    let errors = { email: null, password: null,userName : null  };
    if (err.code === 11000) {
        if (err.keyValue.email) {
            errors.email = 'that email is already registered';
        }
        else {
            errors.userName = 'that Username is already registered';
        }
        return errors;
    }
    if (err.message.includes('UserModal validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
    }
    if (err.message === 'incorrect Email') {
        errors.email = 'that Email is not registred !'
      }
      if (err.message === 'incorrect Password') {
        errors.password = 'that password is incorrect'
      }
    if (err.message === 'password min length') {

        errors.password = "Minimum password length is 6 characters"
    }
    return errors
}

module.exports = {getToken , HandlError , checkuser}