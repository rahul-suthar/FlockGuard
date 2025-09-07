import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { verifyJWT } from "./middlewares/auth.middleware.js";
import { authorizeRoles } from "./middlewares/role.middleware.js";
import authRouter from "./routes/auth.routes.js";
import farmRouter from "./routes/farm.routes.js";
import reportRouter from "./routes/report.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/farms", verifyJWT, authorizeRoles("farmer"), farmRouter);
app.use("/api/v1/reports", verifyJWT, authorizeRoles("vet", "pharmacy"), reportRouter);
app.use("/api/v1/admin", verifyJWT, authorizeRoles("admin"), adminRouter);


export { app };