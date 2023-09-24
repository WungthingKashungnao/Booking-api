import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB database!");
  } catch (error) {
    throw error;
  }
};

export default connect;
