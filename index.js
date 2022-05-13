const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");

mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log(err);
    })

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet())
app.use(morgan("tiny"))

app.use("/api/courses/", require("./routes/course"));


app.listen(4000, ()=>{
    console.log("Backend Server Is Running");
})