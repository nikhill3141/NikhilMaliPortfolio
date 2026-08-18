import { Router } from "express";
import blogRoutes from "./blog.routes.js";
import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import {getHealth} from "../controllers/health.controller.js";

const router = Router();

router.get("/health",  asyncHandler(getHealth));
router.use("/blogs", blogRoutes)

export default router;
