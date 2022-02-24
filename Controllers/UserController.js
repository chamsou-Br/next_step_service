const UserModal = require("../Modals/UserModal");
const authController =  require("../Controllers/AuthController")

const LoginContoller = async(req , res) => {
    console.log("login")
       const {user,err} = await UserModal.login(req.body.email,req.body.password,req.body.isWithGoogle);
       if (err) res.send(err) ;
       else {
           console.log("sucess")
        const token = await authController.getToken(user._id);
        res.cookie('step_service_save_your_time' , token,{
            httpOnly : true ,        
            maxAge : 12 * 30 * 24 * 3600 * 1000,
        });
        res.status(201).json({token : token});
       }

}

const RegisterConroller = async(req , res) => {
    const data = req.body;
          const {user , err} = await  UserModal.register(data.userName,data.email,data.password,data.isWithGoogle)
          if (err) {
              res.send(err);}
          else {
            const token = await authController.getToken(user._id);
            res.cookie('step_service_save_your_time' , token,{
                httpOnly : true ,        
                maxAge : 12 * 30 * 24 * 3600 * 1000,
            });
            res.status(201).json({token : token});
          }

        

}

module.exports = {LoginContoller , RegisterConroller}