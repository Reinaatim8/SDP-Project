import apiClient from "./axiosInstance";

//function to handle login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post("api/token/", {
      username: username,
      password: password,
    });
    localStorage.setItem("access", response.data.access);//store token in local storage
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//function to handle user logout
export const logout =() => {
  localStorage.removeItem("access");
};

