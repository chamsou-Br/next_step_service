// init variables
const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")


// connect server 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.listen(4000 , ()=> {
    console.log("server is running succefully");
});

// connect Database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("");
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})



