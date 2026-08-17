import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

const errorMiddelware = (
  err:Error,
  _req:Request,
  res:Response,
  _next:NextFunction
) => {
  console.log(err)

  if(err instanceof ApiError){
    return res.status(err.statusCode).json({
      success:false,
      message:err.message
    })
  }
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })

}

export default errorMiddelware;