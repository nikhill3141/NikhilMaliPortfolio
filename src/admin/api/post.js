import api from "../../lib/api"


export const getPosts = async ({page=1, limit=10,search="", status=""}= {}) => {
   const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);
    if (search.trim()) {
      params.set("search", search.trim());
    }
    if (status) {
      params.set("status", status);
    }
  const response = await api.get(`/blogs/admin?${params.toString()}`)
  return response.data
}
export const getPublicPosts = async ({page=1, limit=10}= {}) => {
  const response = await api.get("/blogs", {params:{page, limit}})
  return response.data
}

export const getPostbyId = async (id) => {
  const response = await api.get(`/blogs/post/${id}`)
  return response.data
  
}
export const getPostbySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`)
  if(response.data.success === 'false') return false
  return response.data
}

export const createPost = async (data) => {
  const response = await api.post("/blogs", data)
  return response.data
}

export const updatePost = async ({id, data}) => {
  const response = await api.patch(`/blogs/${id}`,data)
  return response.data
}
export const publishedPost = async (id) => {
  const response = await api.patch(`/blogs/${id}/publish`);
  return response.data
}

export const deletePost = async (id) => {
  const response = await api.delete(`blogs/${id}`)
}
