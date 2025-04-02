import apiClient from "./axiosInstance";

//function to submit a new issue
export const submitIssue = async (issueData) => {
  try {
    const response = await apiClient.post("issues/api/issues/", issueData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}