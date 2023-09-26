import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//token verification start
// router.get("/checkauthentication", verifyToken, (req, res) => {
//   res.send("user token authenticated!");
// });
// veriffication end

// verify user start
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("user is verified now logged in, and can update the account ");
// });
// verify user end

// verify user isAdmin status start
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("user is an admin account ");
// });
// verify user isAdmin status end

// update start
router.patch("/:id", verifyUser, updateUser);
// update end

// delete start
router.delete("/:id", verifyUser, deleteUser);
// delte end

// get hotel with specific id start
router.get("/:id", verifyUser, getUser);
// get hotel with sepific id end

// get all hotel start
router.get("/", verifyAdmin, getAllUsers);
// get all hotel end

export default router;
