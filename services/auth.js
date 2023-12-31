const JWT=require('jsonwebtoken');
const secret="$superman@123";
function createTokenForUser(user){
    const paylod={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl

    };
    const token =JWT.sign(paylod,secret);
    return token;

}
function ValidateToken(token){
    const paylod=JWT.verify(token,secret);
    return paylod;
}
module.exports={
    createTokenForUser,
    ValidateToken,

}