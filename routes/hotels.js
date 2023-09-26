import express from "express";
import {
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
router.get("/:id", getHotel);
// get hotel with sepific id end

// get all hotel start
router.get("/", getAllHotels);
// get all hotel end

export default router;
