// init variables
const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./Routers/UserRoute");


// connect server 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.listen(4000 , ()=> {
    console.log("server is running succefully");
});

app.get("/",(req , res) => {
    res.send('chamsou Berkane');
})
app.use("/user",UserRouter);

// connect Database
mongoose.connect("mongodb://localhost:27017/stepServiceServer",{useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})



