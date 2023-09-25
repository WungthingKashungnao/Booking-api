import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

// Create start
router.post("/", createHotel);
// crete end

// update start
router.patch("/:id", updateHotel);
// update end

// delete start
router.delete("/:id", deleteHotel);
// delte end

// get hotel with specific id start
router.get("/:id", getHotel);
// get hotel with sepific id end

// get all hotel start
router.get("/", getAllHotels);
// get all hotel end

export default router;
