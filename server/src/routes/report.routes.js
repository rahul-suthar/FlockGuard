import { Router } from "express";
import { 
    createReport,
    getAllReports,
    getReportById,
    updateReport,
} from "../controllers/report.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router({ mergeParams: true });

router.route("/")
    .get(getAllReports)
    .post(
        upload.fields([
            {
                name: "symptomsImg",
                maxCount: 1,
            },
        ]),
        createReport
    );

router.route("/:rid")
    .get(getReportById)
    .patch(updateReport);

export default router;