import { Router } from "express";

import {
    getAllFarms,
    getMyFarms,
    addFarm,
    deleteFarm,
    getFarmById,
    updateFarm,
} from "../controllers/farm.controller.js";

const router = Router();

router.route("/").get(getAllFarms);

router.route("/me")
    .get(getMyFarms)
    .post(addFarm)
;

router.route("/:id")
    .get(getFarmById)
    .put(updateFarm)
    .delete(deleteFarm)
;

export default router;
