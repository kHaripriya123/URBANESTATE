const express = require("express");
const{validateAgent} = require("../utils/validation");
const {validateSignupData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("dotenv").config();
const authRouter = express.Router();

authRouter.post("/signup",  validateAgent, async(request,response)=> {
    try{
       
    validateSignupData(request);
  
        const {firstName, lastName, emailId, password, contact, registeredFirmName} = request.body;
        
        const passwordHash =  await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
            contact,
            
            registeredFirmName
            
        })

        await user.save();
        response.status(201).json({ message: "Signup successful! Please log in." });
    } catch (err) {
        response.status(400).send("ERROR: " + err.message);
    }
});


authRouter.post("/login", async(request, response)=> {
    try{
        const {emailId, password} = request.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid Password");
        }
        
        
        const token = await jwt.sign({_id : user._id, role : user.role}, process.env.JWT_SECRET,{expiresIn : "7d"});
        response.cookie("token", token, {expires : new Date(Date.now() + (8 * 3600000))})
        response.json({
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                contact: user.contact,
                role: user.role
            }
        });
        
        

    }catch(err){
        response.status(400).send("ERROR:" + err.message)
    }
})

authRouter.post("/logout", async(request, response)=> {
    response.cookie("token", null, {expires : new Date(Date.now())})
    response.send("Logout successful!")
})

module.exports = authRouter; 