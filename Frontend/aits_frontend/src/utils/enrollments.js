import apiClient from "./axiosInstance";

//function to create a new enrollment
export const createEnrollment = async (enrollmentData) => {
  try {
    const response = await apiClient.post("issues/api/enrollments/", enrollmentData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}