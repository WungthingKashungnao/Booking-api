import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/roomController.js";
const router = express.Router();

// Create start
router.post("/:hotleId", verifyAdmin, createRoom);
// crete end

// update start
router.patch("/:id", verifyAdmin, updateRoom);
// update end

// delete start
router.delete("/:id/:hotleId", verifyAdmin, deleteRoom);
// delte end

// get room with specific id start
router.get("/:id", getRoom);
// get room with sepific id end

// get all room start
router.get("/", getAllRooms);
// get all room end

export default router;
