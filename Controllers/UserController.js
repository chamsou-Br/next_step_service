const UserModal = require("../Modals/UserModal");

const LoginContoller = async(req , res) => {
       const {user,err} = await UserModal.login(req.body.email,req.body.password,req.body.isWithGoogle);
       if (err) res.send("err in Modal 2") ;
       else {
        const token = "H" //await getToken(user._id);
        res.cookie('user_projet_2cp' , token,{
            httpOnly : true ,        
            maxAge : 12 * 30 * 24 * 3600 * 1000,
        });
        res.status(201).json({token : token});
       }

}

const RegisterConroller = async(req , res) => {
    const data = req.body;
          const {user , err} = await  UserModal.register(data.userName,data.email,data.password,data.isWithGoogle)
          if (err) res.send("err Modal");
          else {
            const token = "H" //await getToken(user._id);
            res.cookie('user_projet_2cp' , token,{
                httpOnly : true ,        
                maxAge : 12 * 30 * 24 * 3600 * 1000,
            });
            res.status(201).json({token : token});
          }

        

}

module.exports = {LoginContoller , RegisterConroller}