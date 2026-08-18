import prisma from "../config/prisma.js"
import { CreateBlogInput, UpdateBlogInput } from "../validations/blog.validation.js";

//get all blogs service
export const getAllBlogs = async (page:number, limit:number)=>{
  const skip = (page-1) * limit

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      skip,
      take:limit,
      orderBy:{
        createdAt:"desc"
      },
    }),
    prisma.blog.count()
  ])
  return {
    data:blogs,
    pagination:{
      page,
      limit,
      total,
      totalPages: Math.ceil(total/limit)
    }
  }
}

//get blog by slug service
export const findBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  return blog;
};

//create blog service
export const createBlogService = async (data: CreateBlogInput) => {
  const blog = await prisma.blog.create({
    data
  })
  return blog
}

//update blog service
export const updateBlogService = async (id:string, data: UpdateBlogInput) =>{
  const updatedBlog = await prisma.blog.update({
    where: {
      id,
    },
    data
  })
  return updatedBlog
}

//delete blog service
export const deleteBlogService = async (id:string) => {
  const blog = await prisma.blog.delete({
    where: {
      id,
    },
  });
}