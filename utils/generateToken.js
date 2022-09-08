const jwt=require("jsonwebtoken")

const {SECRET_KEY}=require("../config")


module.exports=user=>{
    return jwt.sign(
        {id: user._id, username: user.username, email: user.email},
        SECRET_KEY,
        {expiresIn: '1h'}
      );
}