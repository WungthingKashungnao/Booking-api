import hotelModel from "../models/hotelModel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body); //inserting the data from body into the schema
  try {
    const savedHotel = await newHotel.save(); //saving the data into the database
    res.status(200).json(savedHotel); //sending json response
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    // updating the database
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //{new: true} option is used so that it return the updated record
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted the hotel with id: ${req.params.id}`);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};
