import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// local file import start
import connect from "./db/db.js";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
// local file import end

const app = express();
dotenv.config(); //configuring dotenv so we can access variables from .env file
app.use(express.json()); //middleware to send json object to express server

//routes start
app.get("/", (req, res) => {
  res.send("This is home!");
});
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
// routes end

// middleware for error handling start
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong with api!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, //this will give more information about the error
  });
});
// middlewrae for error handling end

app.listen(3000, () => {
  connect();
  console.log("server has started on port 3000");
});
