import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters"),

  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens",
    ),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt cannot exceed 500 characters")
    .optional(),

  content: z.string().trim().min(20, "Content must be at least 20 characters"),

  coverImage: z.string().url("Cover image must be a valid URL").optional(),

  authorId: z.string().min(1, "Author ID is required"),

  categoryId: z.string().min(1, "Category ID is required"),
});

export const updateBlogSchema = createBlogSchema.partial();


export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
