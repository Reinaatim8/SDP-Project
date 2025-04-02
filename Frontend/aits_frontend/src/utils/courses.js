import apiClient from "./axiosInstance";

//function to create a course
export const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post("/courses/", courseData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};