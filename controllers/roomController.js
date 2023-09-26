import hotelModel from "../models/hotelModel.js";
import roomModel from "../models/roomModel.js";

export const createRoom = async (req, res, next) => {
  const hotleId = req.params.hotleId; //getting hotel id from the url
  const newRoom = new roomModel(req.body); //writing the data into the schema
  try {
    const savedRoom = await newRoom.save(); //saving data into the data base of rooms colection
    try {
      //inserting the room into the model of hotel  of property rooms
      await hotelModel.findByIdAndUpdate(hotleId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    // updating the database
    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //{new: true} option is used so that it return the updated record
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotleId = req.params.hotleId;
  try {
    // deleting the room from the room model
    await roomModel.findByIdAndDelete(req.params.id);

    try {
      //deleting the room from the  hotel model  of property rooms
      await hotelModel.findByIdAndUpdate(hotleId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(`Deleted the room with id: ${req.params.id}`);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await roomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};
