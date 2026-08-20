import api from "../../lib/api"

export const loginAdmin = async (Credentials) => {
  const response = await api.post("/auth/login", Credentials)
  return response.data
}
export const getCurrentAdmin = async () => {
  const response = await api.get("/auth/me")
  return response.data
} 

export const logOutAdmin = async () => {
  const response = await api.post("/auth/logout")
  return response.data
}
