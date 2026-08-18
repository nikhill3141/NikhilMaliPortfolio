import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {getHealth} from "../controllers/health.controller.js";
import blogRoutes from "./blog.routes.js";
import authRoutes from "./auth.routes.js"

const router = Router();

router.get("/health",  asyncHandler(getHealth));
router.use("/blogs", blogRoutes)
router.use("/auth", authRoutes)
export default router;
