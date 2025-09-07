import { Router } from "express";
import reportRouter from "./report.routes.js";
import farmRouter from "./farm.routes.js"
import { getAllUsers } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";


const router = Router();

router.route("/").get(getAllUsers);
router.use("/farms", farmRouter);
router.use("/reports", reportRouter)

export default router;