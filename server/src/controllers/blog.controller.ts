import { Request, Response } from "express";
import { getAllBlogs, findBlogBySlug, createBlogService, updateBlogService, deleteBlogService } from "../services/blog.service.js";
import { success } from "zod";

//get blogs 
export const getBlogs = async (req: Request, res: Response) => {

  const page = Number(req.query.page ?? 1)
  const limit = Number(req.query.limit ?? 10)
  
  const blogs = await getAllBlogs(page, limit)
  if(!blogs) return 
  res.status(200).json({
    success: true,
    blogs,
  });
};

//get blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  const slug = String(req.params.slug)
  const blog = await findBlogBySlug(slug);

  res.status(200).json({
    success: true,
    data: blog,
  });
};

//create blog
export const createBlog = async (req:Request, res:Response) => {
  const blog = await createBlogService(req.body)
  res.status(201).json({
    success:true,
    data: blog
  })
}

//update blog
export const updateBlog = async (req:Request, res:Response) =>{
  const id = String(req.params.id)
  const updatedData = req.body
  const updatedBlog = await updateBlogService(id, updatedData)
  res.status(200).json({
    success:true,
    data:updatedBlog
  })
}

//delete blog
export const deleteBlog = async (req:Request, res:Response)=> {
  const id = String(req.params.id);
  const blog = await deleteBlogService(id)

  res.status(204).send()
}

