import { Router } from "express";
import { 
    getAllReports,
    getReportById,
    createReport,
    consultVet,
    vetReview,
    pharmacyResponse,
    closeReport,
    deleteReport,
} from "../controllers/report.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router({ mergeParams: true });

router.route("/")
    .get(getAllReports)
    .post(
        authorizeRoles("farmer"),
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
    .delete(authorizeRoles("admin", "farmer"), deleteReport);

router.route("/:rid/consult-vet")
    .patch(authorizeRoles("farmer"), consultVet);

router.route("/:rid/review")
    .patch(authorizeRoles("vet"), vetReview);

router.route("/:rid/respond")
    .patch(authorizeRoles("pharmacy"), pharmacyResponse);

router.route("/:rid/close")
    .patch(authorizeRoles("farmer", "admin"), closeReport);

export default router;