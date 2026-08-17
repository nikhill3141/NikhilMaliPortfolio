import prisma from "../config/prisma.js"

//get all blogs
export const getAllBlogs = async ()=>{
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return blogs
}

//get blog by slug
export const findBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  return blog;
};