import { Router } from "express";

import {
    getAllFarms,
    addFarm,
    getFarmById,
    updateFarm,
    deleteFarm,
} from "../controllers/farm.controller.js";

import reportRouter from "./report.routes.js";

const router = Router();

router.route("/").get(getAllFarms).post(addFarm);

router.route("/:id").get(getFarmById).put(updateFarm).delete(deleteFarm);

router.use("/:id/reports", reportRouter);

export default router;
