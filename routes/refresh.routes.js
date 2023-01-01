import { Router } from "express";
import refreshTokenController from "../controllers/refreshToken.controllers.js";

const router = Router();

router.get("/", refreshTokenController);

export default router;
