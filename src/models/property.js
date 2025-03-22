const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
    title: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listedBy: { type: String, enum: ["owner", "agent"], required: true },
    address: { type: String, required: true, unique: true },
    role: { 
        type: [String], // Change to an array of strings
        enum: ["buyer", "owner", "agent"], 
        required: true
    },
    
    
    builtupArea: { type: Number, required: true },
    price: { type: Number, required: true },
    ageOfProperty: { type: Number, required: true },
    images: { type: [String], default: "https://th.bing.com/th/id/OIP.qQaYM8SzEL3FCABDnxWtZgHaEh?rs=1&pid=ImgDetMain" },
    status: { type: String, enum: ["available", "sold"], default: "available" },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    contactNumber: { type: Number, required: true },
    


},

{ timestamps: true },
)


module.exports = mongoose.model("Property", propertySchema);
