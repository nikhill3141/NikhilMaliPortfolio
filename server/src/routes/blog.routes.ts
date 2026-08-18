import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { createBlog, getBlogBySlug, getBlogs } from "../controllers/blog.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createBlogSchema } from "../validations/blog.validation.js";

const router = Router();

router.get("/", asyncHandler(getBlogs));
router.get("/:slug", asyncHandler(getBlogBySlug));
router.post("/", validate(createBlogSchema), asyncHandler(createBlog))
export default router;
