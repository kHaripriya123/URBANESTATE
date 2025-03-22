const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value, { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                throw new Error("Password must be strong!");
            }
        }
    },
    role: {
         type: [String],
        // enum: ["owner", "agent", "buyer"],
        default: ["buyer"], // Default is buyer
        // required: true
    },
    
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    contact: {
        type: String, // Changed from Number to String
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
