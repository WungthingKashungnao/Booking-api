import express from "express";
const router = express.Router();

// local files import start
import { login, register } from "../controllers/authController.js";
// local files import end

router.post("/register", register); //route to register a new user
router.post("/login", login); //route to log in a user

export default router;
