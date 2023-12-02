const express=require("express");

const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors=require('cors');
const mongoose = require('mongoose');
const User=require('./Model/user_model');
const Team=require('./Model/team_model');
const PORT = process.env.PORT || 4000;
const dotenv=require("dotenv").config()
const env=process.env
app.use(cors());

MONGO_URL=`mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_CLUSTER}.mongodb.net/heliverse?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("DB connected");
})
.catch(err=> console.log(err.message));
var dat;
app.get('/get',async (req,res)=>{
    dat=await User.find();
    res.json(dat);
})

app.get('/getAllDomain',(req,res)=>{
    const uniqueDomain=[...new Set(dat.map(item=>item.domain))];
    res.json(uniqueDomain);
})

app.get('/getAllgenders',(req,res)=>{
   const uniqueGender=[...new Set(dat.map(item=>item.gender))];
   res.json(uniqueGender);
})


//implement filter logic
app.get('/filter',(req,res)=>{
 let obj={
    domain:(req.query.domain=="Select Domain"?null:req.query.domain),
    available:(req.query.available=="Select Available"?null:(req.query.available=='true'?true:false)),
    gender:(req.query.gender=="Select Gender"?null:req.query.gender)
 }
 //sequential filter logic
 var filterData=dat;
 if(obj.domain) filterData=filterData.filter(item=>item.domain==obj.domain)
 if(obj.available) filterData=filterData.filter(item=>item.available===obj.available)
 if(obj.gender) filterData=filterData.filter(item=>item.gender==obj.gender)
 console.log(filterData.length)
 res.json(filterData);

})

app.post('/addTeam',async (req,res)=>{
 const x=req.body;
 console.log(x);
 const xy=await Team.create({
    users:x
 });
 res.sendStatus(200);
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})