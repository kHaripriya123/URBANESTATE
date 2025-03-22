const validator = require("validator");
const validateSignupData = (request) => {

    console.log("Received Data:", request);
  const {firstName, lastName, emailId, password} = request.body;
  if(!firstName || !lastName){
      throw new Error(" Name Invalid!");
  }
  else if(!validator.isEmail(emailId)){
   throw new Error("Email id not valid!")
}
else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not valid!")
}
}

const validateEditRequest = (request) => {

    
    const allowedEditFields = ["title", "builtupArea", "price", "ageOfProperty", "bedrooms", "bathrooms", "amenities", "contactNumber"];
    return Object.keys(request.body).every((field) => allowedEditFields.includes(field));

  
};

const editProfileRequest = (updateData) => {
const allowedFields = ["firstName", "lastName", "emailId", "gender", "age", "contact"];

return Object.keys(updateData).every((field)=> allowedFields.includes(field));


}

const buildPropertySearchQuery = (filters) => {
    let query = {};

    if (filters.address) query.address = { $regex: filters.address, $options: "i" };
    if (filters.price) query.price = filters.price;
    if (filters.builtupArea) query.builtupArea = filters.builtupArea;
    if (filters.ageOfProperty) query.ageOfProperty = filters.ageOfProperty;
    if (filters.bedrooms) query.bedrooms = filters.bedrooms;

    return query;
};

const validateAgent = (req, res, next) => {
    const { role, registeredFirmName } = req.body;
  
    if (role === "agent" && !registeredFirmName) {
      return res.status(400).json({ error: "Registered Firm Name is required for agents." });
    }
    next();
  };
module.exports = {validateSignupData, validateEditRequest, editProfileRequest, buildPropertySearchQuery, validateAgent };