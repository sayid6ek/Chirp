import express from "express";
import * as authControllers from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, authControllers.checkAuth);
router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);

export default router;
