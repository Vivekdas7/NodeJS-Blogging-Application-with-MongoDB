const path=require("path");
const express=require("express");
const userRoute=require("./routes/user");
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const { checkForAuthenticationCookie } = require("./middleware/Auth");
const app=express();
const port=8000;
mongoose.connect('mongodb://localhost:27017/Blogger').then(e=>{
    console.log("mondb conect Sucessfully....")
});
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.get('/',(req,res)=>{
    res.render('home',{
        user:req.user
    });

})
app.use('/user',userRoute);
app.listen(port,()=>{
    console.log(`Server Started a port : ${port} `)

});