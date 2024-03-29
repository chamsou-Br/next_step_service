const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controllers/UserController")

UserRouter.use(express.json());
UserRouter.use(express.urlencoded({extended : true}));

UserRouter.get("/test",(req , res) => {
    res.send("User test sucessfully");
})
UserRouter.post("/login",UserController.LoginContoller);
UserRouter.post('/register' , UserController.RegisterConroller);

module.exports = UserRouter