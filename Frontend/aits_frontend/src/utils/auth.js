import apiClient from "./axiosInstance";

//function to handle login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login/", {
      username: username,
      password: password,
    });
    localStorage.setItem("authtoken", response.data.token);//store token in local storage
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//function to handle user logout
export const logout =() => {
  localStorage.removeItem("authtoken");
};

