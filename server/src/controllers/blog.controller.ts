import { Request, Response } from "express";
import { getAllBlogs, findBlogBySlug, createBlogService } from "../services/blog.service.js";

//get blogs 
export const getBlogs = async (_req: Request, res: Response) => {
  const blogs = await getAllBlogs()
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
