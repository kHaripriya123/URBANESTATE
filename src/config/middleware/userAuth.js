const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("dotenv").config();


const userAuth = async(request, response, next)=> {
try{
   
    const {token} = request.cookies;
    
    if(!token){
        response.status(401).send("Please Login!")
    }

    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const {_id} = decodedMessage;
    if(!_id){
        throw new Error("Token doesn't contain a valid user id!")
    }

    const user = await User.findById(_id);
    if(!user){
        response.status(400).send("User doesn't exists!")
    }

    request.user = user;
    next();
}
catch(err){
    response.status(400).send("ERROR :" + err.message)
}
}

module.exports = userAuth;