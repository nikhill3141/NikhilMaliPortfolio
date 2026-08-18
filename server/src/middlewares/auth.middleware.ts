import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const authCheck = async (req:Request, res:Response, next:NextFunction)=> {
  const token = req.cookies?.access_token;
  if(!token) {
    return next(new ApiError(401, "Authentication required"));
  }
  
  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired access token"));
  }
}