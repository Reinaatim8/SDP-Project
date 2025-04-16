import apiClient from "./axiosInstance";

//function to handle login
export const login = async (username, password) => {
  try {
    const authResponse = await apiClient.post("auth/login", {
      username: username,
      password: password,
    });
    console.log("Login response:", authResponse.data);
    localStorage.setItem("user",JSON.stringify( authResponse.data.user));

    const tokenResponse = await apiClient.post("issues/api/token/", {
      username: username,
      password: password,
    });
    console.log("Token response:", tokenResponse.data);

    localStorage.setItem("access", tokenResponse.data.access);
    //store token in local storage
    return {user: authResponse.data.user, tokens: tokenResponse.data };
  } catch (error) {
    return error.response.data || { error: "Login failed" };
  }
};

//function to handle user logout
export const logout =() => {
  localStorage.removeItem("access");

  localStorage.removeItem("user");
};

