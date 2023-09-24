import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// local file import start
import connect from "./db/db.js";
// local file import end

const app = express();
dotenv.config(); //configuring dotenv so we can access variables from .env file

// this code run when we disconnect or connect again with the db after the initial connection
mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDb connected");
});

app.listen(3000, () => {
  connect();
  console.log("server has started on port 3000");
});
