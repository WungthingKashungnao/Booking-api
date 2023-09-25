import userModel from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  try {
    // updating the database
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //{new: true} option is used so that it return the updated record
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted the user with id: ${req.params.id}`);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};
