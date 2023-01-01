import { Router } from "express";
import logoutController from "../controllers/logout.controllers.js";

const router = Router();

router.get("/", logoutController);

export default router;
