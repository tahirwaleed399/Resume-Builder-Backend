// It should always be on first 
process.on("uncaughtException", (err) => {
   console.log("Shutting down the server due to Uncaught Exception 🔥");
   console.log(err)
  
     process.exit(1);
 });
const app = require("./app");
const dotenv = require("dotenv");
const { connectMongoDb } = require("./database");
dotenv.config({ path: "./Config/config.env" });
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 5700;



connectMongoDb();
// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const server = app.listen(PORT, () => {
   console.log("Server Listening on " + PORT);
 });



 
process.on("unhandledRejection", (err) => {
   console.log("Shutting  down the server due to Unhandled Rejection 🔥");
   console.log(err)
 
   server.close(() => {
     process.exit(1);
   });
 });
