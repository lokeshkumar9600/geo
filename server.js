const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const uri = process.env.db;
var ejs = require("ejs");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine","ejs")

const location = require('./database/Location');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public"))
const PORT = process.env.PORT ||5000;

app.get("/",(req, res) => {
    res.send(__dirname+"/public/index.html")
})

app.post("/",(req, res) => {
    location.create({
        latitude:req.body.latitude,
        longitude:req.body.longitude
    },(err,save)=>{
        if(err){
            // console.log(err);
        }else{
            // console.log(save);
            res.redirect("/map");
        }
    });
});

app.get("/map",(req, res) => {
    location.find({},(err,locations)=>{
        if(err){
            // console.log(err);
        }else{
            // console.log(locations);
            res.render("Map",{users:locations})
        }
    })
   
});


app.listen(PORT,(req,res)=>{
    console.log(`the server is running on ${PORT}`)
})