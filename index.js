const express=require("express");
const app=express();
const cors=require('cors');
const mongoose = require('mongoose');
const User=require('./Model/user_model');
const PORT = process.env.PORT || 4000;
MONGO_URL="mongodb+srv://prateek9771196112:NygzKXgtL3effsJO@cluster0.zxqncfm.mongodb.net/heliverse?retryWrites=true&w=majority"
app.use(cors());
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
 console.log(obj);
 const filterData=dat.filter((item) => (item.domain==obj.domain && item.available==obj.available && item.gender==obj.gender))
 res.json(filterData);

})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})