const mongoose = require("mongoose");

const connectDB = async()=> {
    await mongoose.connect("mongodb+srv://kotagiriharipriya888:qHbNsBtodNq2n5d4@namastenode.qwxdx.mongodb.net/urbanEstate")
}

module.exports = connectDB;