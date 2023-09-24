import express from "express";
import hotelModel from "../models/hotelModel.js";

const router = express.Router();

// Create start
router.post("/", async (req, res) => {
  const newHotel = new hotelModel(req.body); //inserting the data from body into the schema
  try {
    const savedHotel = await newHotel.save(); //saving the data into the database
    res.status(200).json(savedHotel); //sending json response
  } catch (err) {
    res.status(500).json(err);
  }
});
// crete end

// update start
router.patch("/:id", async (req, res) => {
  try {
    // updating the database
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //{new: true} option is used so that it return the updated record
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    throw err;
  }
});
// update end

// delete start
router.delete("/:id", async (req, res) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted the hotel with id: ${req.params.id}`);
  } catch (err) {
    throw err;
  }
});
// delte end

// get hotel with specific id start
router.get("/:id", async (req, res) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    throw err;
  }
});
// get hotel with sepific id end

// get all hotel start
router.get("/", async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    throw err;
  }
});
// get all hotel end

export default router;
