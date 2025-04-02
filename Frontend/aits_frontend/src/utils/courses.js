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

//function to get all courses
export const getCourses = async () => {
  try {
    const response = await apiClient.get("/courses/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};