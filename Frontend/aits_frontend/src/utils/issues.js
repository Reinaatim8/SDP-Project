import apiClient from "./axiosInstance";

//function to submit a new issue
export const submitIssue = async (formData) => {
  try {
    const response = await apiClient.post("issues/api/issues/", formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}