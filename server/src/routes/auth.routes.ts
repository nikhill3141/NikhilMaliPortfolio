import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getAdmin, loginAdmin, logoutAdmin } from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = Router()

router.post("/login", validate(loginSchema), asyncHandler(loginAdmin))
router.post("/logout", asyncHandler(logoutAdmin))
router.get("/me", authCheck, asyncHandler(getAdmin))


export default router