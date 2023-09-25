import bcrypt from "bcryptjs"; //package to hash password

import userModel from "../models/userModel.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    // hashing password start
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt); //hashing our password
    // hashing password end
    // writing the info recieved into the shcehma
    const newUser = await userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save(); //saving the data into the database
    res.status(200).json({
      message: "new user successfully created!",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username }); // checkiing if ername exists
    if (!user) {
      return next(createError(404, "user not found!"));
    }

    // checking if password is correct usring bcrypt compare
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const { password, isAdmin, ...otherDetails } = user._doc; //destrcuting only the needeed infromation to prevent sending password and isAdmin
    res.status(200).json({
      message: "sucessfully logged in!",
      ...otherDetails,
    });
  } catch (error) {}
};
