import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from "../controllers/blog.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createBlogSchema, updateBlogSchema } from "../validations/blog.validation.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", asyncHandler(getBlogs));
router.get("/:slug", asyncHandler(getBlogBySlug));
router.post("/",authCheck,requireRole("ADMIN"), validate(createBlogSchema), asyncHandler(createBlog))
router.patch("/:id",authCheck,requireRole("ADMIN"), validate(updateBlogSchema), asyncHandler(updateBlog) )
router.delete("/:id",authCheck,requireRole("ADMIN"), asyncHandler(deleteBlog))

export default router;
