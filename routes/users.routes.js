import { Router } from "express";
import ROLES_LIST from "../config/rolesList.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../controllers/users.controllers.js";

const router = Router();

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
