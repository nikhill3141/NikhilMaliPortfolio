import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { getBlogBySlug, getBlogs } from "../controllers/blog.controller.js";

const router = Router();

router.get("/", asyncHandler(getBlogs));
router.get("/:slug", asyncHandler(getBlogBySlug));

export default router;
