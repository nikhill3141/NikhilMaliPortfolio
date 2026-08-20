import api from "../../lib/api"


export const getCategories = async () => {
 const response = await api.get("/category")
 return response.data
}