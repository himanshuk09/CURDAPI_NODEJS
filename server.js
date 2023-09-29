require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const bcrypt =require("bcryptjs")
var bodyParser = require("body-parser");
const cors=require("cors");

const app=express();
app.use(cors());
//middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.get("/",(req,res)=>{
    res.send("Hello");
})

mongoose.connect(process.env.URLDB)
.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("Unable to connect database");
})

const userRoutes=require("./src/routers/routes");
app.use("/user",userRoutes)


const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}` )
})

