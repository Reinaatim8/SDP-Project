import apiClient from "./axiosInstance";

//function to create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post("/issues/api/categories/", categoryData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
 //function to get all categories
 export const getCategories = async () => {
  try {
    const response = await apiClient.get("/issues/api/categories/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}