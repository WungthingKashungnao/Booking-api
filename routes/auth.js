import express from "express";
const router = express.Router();

// local files import start
import { login, logout, register } from "../controllers/authController.js";
// local files import end

router.post("/register", register); //route to register a new user
router.post("/login", login); //route to log in a user
router.get("/logout", logout); //route to logout a user

export default router;
