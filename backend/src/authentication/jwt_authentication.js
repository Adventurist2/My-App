require('dotenv').config();
const jwt  = require("jsonwebtoken");
const jwt_secret = process.env.REACT_JWT_KEY;

 function user_middleware(req,res,next){
    const token  = req.headers.authorization;
    const word = token.split(" ");
    const jwt_token = word[1];
    try{
    const decoded = jwt.verify(jwt_token,jwt_secret);
    if(decoded.username){
        next();
    }
    else{

        res.status(403).send("User not registered");
    }
    }catch(err){
        res.json({
                msg:"Invalid input"
        })
    }

}
module.exports = user_middleware;