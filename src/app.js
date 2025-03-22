const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
// const http = require("http");
// const {Server} = require("socket.io");



const app = express();
// const server = http.createServer(app);

const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
// dotenv.config();
// app.use("/api/chats", require("./routes/chat"));
app.use(cors({
    origin :  "http://localhost:5173",
    credentials : true
}))

// const io = new Server(server, {
//     cors: { origin: "*" },
//   });
  
  // mongoose.connect(process.env.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

const authRouter = require("./routes/auth"); 
const propertyRouter = require("./routes/property"); 
const userRouter = require("./routes/user");




app.use("/", authRouter); 

app.use("/", propertyRouter); 

app.use("/", userRouter);

// io.on("connection", (socket) => {
//     console.log("A user connected");
  
//     socket.on("sendMessage", (data) => {
//       io.emit("receiveMessage", data);
//     });
  
//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
  // });


connectDB()
.then(()=> {
    console.log("Database connection successfully established!")
    app.listen(3000, ()=> {
        console.log("Server is listening successfully!" )
        
    })
    
})
.catch((err)=> {
console.error("DB cannot be connected!");

})