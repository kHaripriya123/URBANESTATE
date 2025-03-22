console.log("Script started...");

const crypto = require("crypto");

console.log("Generating secret key...");
const secretKey = crypto.randomBytes(32).toString("hex");

console.log("JWT Secret Key:", secretKey);
console.log("Script ended.");
