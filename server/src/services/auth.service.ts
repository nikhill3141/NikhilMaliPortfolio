import { number } from "zod";
import prisma from "../config/prisma.js"
import ApiError from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js"

//admin login
export const adminLoginService = async (email:string, password:string) => {
  const admin = await prisma.admin.findUnique({
    where:{
      email
    }
  })
  if(!admin) throw new Error("Invalid Email or Password");
  const isPasswordMatch = await comparePassword(admin.password,password)

  if(!isPasswordMatch) throw new Error("Invalid Email or Password");

  const accessToken = generateAccessToken(
    {
      sub:admin.id,
      role:admin.role,
    }
  )
  return {
    accessToken,
    admin:{
    id:admin.id,
    name:admin.name,
    email:admin.email,
    role:admin.role
  }
  }
}

//get me for admins
export const getCurrentAdmin = async (id:string) => {
  const admin = await prisma.admin.findUnique({
    where:{id},
    select:{
      id:true,
      name:true,
      email:true,
      role:true
    }
  })
  if(!admin) throw new ApiError(401, "Admin not found")
  return admin
} 