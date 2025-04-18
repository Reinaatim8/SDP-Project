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

   //to handle token generation
    const tokenResponse = await apiClient.post("issues/api/token/", {
      username: username,
      password: password,
    });
    const token = tokenResponse.data.token
    console.log("Token:", token);

    localStorage.setItem("access", token);
    //store token in local storage
    return {user: authResponse.data.user, token };
  } catch (error) {
    return error.response.data || { error: "Login failed" };
  }
};

//function to handle user logout
export const logout =() => {
  localStorage.removeItem("access");

  localStorage.removeItem("user");
};

