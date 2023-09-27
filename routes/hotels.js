import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create start
router.post("/", verifyAdmin, createHotel);
// crete end

// update start
router.patch("/:id", verifyAdmin, updateHotel);
// update end

// delete start
router.delete("/:id", verifyAdmin, deleteHotel);
// delte end

// get hotel with specific id start
router.get("/find/:id", getHotel);
// get hotel with sepific id end

// get all hotel start
router.get("/", getAllHotels);
// get all hotel end

// count the numbe of hotels in the city start
router.get("/countByCity", countByCity);
// count the numbe of hotels in the city end

// count the number of hotels by type start
router.get("/countByType", countByType);
// count the number of hotels by type end

export default router;
