const express = require("express");
const userAuth = require("../config/middleware/userAuth");
const {roleAuth} = require("../config/middleware/roleAuth");
const {editProfileRequest} = require("../utils/validation");
const userRouter = express.Router();
const Property = require("../models/property");
const User = require("../models/user");

userRouter.get(
    "/getProfile",
    userAuth,
    roleAuth(["owner", "buyer", "agent"]),
    async (request, response) => {
      try {
        const user = request.user;
        response.json(user); 
      } catch (err) {
        response.status(400).json({ error: err.message });
      }
    }
  );
  
    
    userRouter.patch("/editProfile", userAuth, roleAuth(["owner", "buyer", "agent"]), async (request, response) => {
        try {
            const _id = request.user._id; // Extract ID from auth middleware
            const updateData = { ...request.body };
             
            console.log("Update Data:", updateData);
    console.log("Validation Result:", editProfileRequest(updateData));
    
            if (!editProfileRequest(updateData)) {
                throw new Error("Invalid Edit Profile Request!");
            }
    
            const updatedProfile = await User.findByIdAndUpdate(_id, updateData, { new: true });
    
            if (!updatedProfile) {
                throw new Error("User not found!");
            }
    
            response.send(updatedProfile);
    
        } catch (err) {
            response.status(400).send("ERROR: " + err.message);
        }
    });

 
      
    userRouter.get("/feed", userAuth, roleAuth(["owner", "agent", "buyer"]), async(request,response)=> {
        try{ 
        const loggedInUser = request.user;
         const feed = await Property.find({});
         console.log(feed);
         response.send(feed);
        }catch(err){
            response.status(400).send("ERROR:" + err.message)
        }
    })

    module.exports = userRouter; 