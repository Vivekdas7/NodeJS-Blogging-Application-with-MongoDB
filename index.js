const path=require("path");
const express=require("express");
const userRoute=require("./routes/user");
const mongoose=require('mongoose');
const app=express();
const port=8000;
mongoose.connect('mongodb://localhost:27017/Blogger').then(e=>{
    console.log("mondb conect Sucessfully....")
});
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.get('/',(req,res)=>{
    res.render('home');

})
app.use('/user',userRoute);
app.listen(port,()=>{
    console.log(`Server Started a port : ${port} `)

});