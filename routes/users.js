import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// update start
router.patch("/:id", updateUser);
// update end

// delete start
router.delete("/:id", deleteUser);
// delte end

// get hotel with specific id start
router.get("/:id", getUser);
// get hotel with sepific id end

// get all hotel start
router.get("/", getAllUsers);
// get all hotel end

export default router;
