const express = require("express");
const {validateEditRequest} = require("../utils/validation");
const{buildPropertySearchQuery} =  require("../utils/validation");
const Property = require("../models/property");
const propertyRouter = express.Router();
const userAuth = require("../config/middleware/userAuth");
const {roleAuth} = require("../config/middleware/roleAuth");
const User = require("../models/user");

propertyRouter.post("/addProperty", userAuth, async (request, response) => {
  try {
      const loggedInUser = request.user;
      let { title, address, builtupArea, price, ageOfProperty,  bedrooms, bathrooms, amenities, contactNumber, role } = request.body;

      console.log("Role received:", role);
      console.log("Logged-in User:", request.user); 
      let userRole = request.body.role;
      if (Array.isArray(userRole)) {
          userRole = userRole[0]; // Convert array to a string
      }
      
      if (!["owner", "agent"].includes(userRole)) {
          return response.status(400).json({ error: "Invalid or missing role. Choose either 'owner' or 'agent'." });
      }
       


      const existingPropertyDetails = await Property.findOne({ address });
      if (existingPropertyDetails) {
          return response.status(409).json({ message: "Property already exists at this address!" });
      }

      const user = await User.findById(loggedInUser._id);

      if (!user) {
          return response.status(404).json({ error: "User not found" });
      }

      if (!user.role.includes("buyer")) {
          user.role.push("buyer");
      }

      if (!user.role.includes(userRole)) {
          user.role.push(userRole);
          await user.save();
      }

      const newPropertyDetails = new Property({
          ownerId: loggedInUser._id,
          title,
          listedBy: userRole,
          address,
          builtupArea,
          price,
          ageOfProperty,
          bedrooms,
          bathrooms,
          amenities,
          contactNumber,
          role // Save as a single string,
          
      });

      const properties = await newPropertyDetails.save();
      response.status(201).json({ message: "Property listed successfully!", role: user.role, property: properties });
  } catch (err) {
    console.error("Backend Error:", err);
      response.status(500).json({ error: "ERROR: " + err.message });
  }
});


propertyRouter.patch("/editProperty/:propertyId", userAuth, roleAuth(["owner", "agent"]), async (request, response) => {
    try {
        const loggedInUser = request.user;
        const propertyId = request.params.propertyId;
        const updateData = { ...request.body };

        // Validate allowed fields
        if (!validateEditRequest(request)) {
            throw new Error("Invalid Edit Request!");
        }

        // Find property by ID and ensure it belongs to the logged-in user
        const editMyProperty = await Property.findOne({ _id: propertyId, ownerId: loggedInUser._id });

        if (!editMyProperty) {
            return response.status(403).json({ message: "Access Denied!" });
        }

        // Update the property
        const updatedProperty = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });

        if (!updatedProperty) {
            return response.status(404).json({ message: "Property not found!" });
        }

        response.json(updatedProperty);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

propertyRouter.post("/searchProperties", userAuth, roleAuth(["owner", "agent", "buyer"]), async (request, response) => {
    try {
        const filters = request.body; // Extract filters from request body
        const query = buildPropertySearchQuery(filters); // Build query dynamically

        const searchProperties = await Property.find(query);
        console.log(searchProperties);

        response.send(searchProperties);
    } catch (err) {
        response.status(400).send("ERROR: " + err.message);
    }
});


propertyRouter.get(
    "/myProperties",
    userAuth,
    roleAuth(["owner", "agent"]),
    async (request, response) => {
      try {
        const properties = await Property.find({ ownerId: request.user._id });

        if (!properties.length) {
          return response.status(404).json({ message: "No properties found" });
        }

        response.json(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
    }
);

  
  module.exports = propertyRouter;
  
module.exports = propertyRouter; 