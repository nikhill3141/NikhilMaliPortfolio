import { Request, Response } from "express";
import { adminLoginService, getCurrentAdmin } from "../services/auth.service.js";
import { success } from "zod";

//admin login
export const loginAdmin = async (req:Request, res:Response) => {
  const {email, password} = req.body
  const result = await adminLoginService(email, password)
 

  res.cookie("access_token", 
    result.accessToken,
    {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    success:true,
    data:{admin: result.admin}
  })

}

//admin logout
export const logoutAdmin = (_req:Request, res:Response) => {
  res.clearCookie("access_token",{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:'lax',
  })
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}

//get admin route
export const getAdmin = async (req:Request, res:Response) => {
  const id = req.user!.id
  const admin = await getCurrentAdmin(String(id));
  res.status(200).json({
    success:true,
    data:{
      admin
    }
  }) 
}
