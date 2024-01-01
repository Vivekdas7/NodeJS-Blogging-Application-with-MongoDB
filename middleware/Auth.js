const {ValidateToken}=require("../services/auth");
function checkForAuthenticationCookie(cookieName){
    return(req,res,next)=>{
    const tokenCookieValue=req.cookies[cookieName];
    if(!tokenCookieValue){
        next();
    }
    try{
    const userPaylod=ValidateToken(tokenCookieValue);
    req.user=userPaylod;
    }catch(error){
        

    }
    next();

};
}
module.exports={
    checkForAuthenticationCookie,
};