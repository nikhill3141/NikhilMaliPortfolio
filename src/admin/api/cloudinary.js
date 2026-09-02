import api from "../../lib/api";


export const uploadBlogCoverImg = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post("/uploads/blog-cover", formData);

  return response.data;
};

export const deleteBlogCoverImg = async (publicId) => {
  const response = await api.delete("/uploads/blog-cover", {
    data: {
      publicId,
    },
  });

  return response.data;
};
