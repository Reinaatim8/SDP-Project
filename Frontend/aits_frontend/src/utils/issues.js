import apiClient from "./axiosInstance";

//function to submit a new issue
//export const submitIssue = async (issueData) => {
  //try {
   // const response = await apiClient.post("issues/api/issues/", issueData);
   // return response.data;
 // } catch (error) {
//    return error.response.data;
 // }
//}
export const submitIssue = async (formData) => {
  console.log("=== SUBMIT ISSUE FUNCTION CALLED ===");
  try {
    //get token from local storage
    const access = localStorage.getItem('access');

    console.log("Headers being sent:", {
      'Authorization': `Token ${access}`,
      'Content-Type': 'multipart/form-data'
    });
    
    // Log form data entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    const response = await apiClient.post('issues/api/issues/', formData, {
      headers: {
        'Authorization': `Bearer ${access}`,
       // 'Content-Type': 'multipart/form-data',
      },
    });
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
   //handle specific error cases
   if (error.response?.status === 401) {
    console.log("Authentication error - token may be invalid or expired");
    // You could trigger a token refresh here or redirect to login
  }

    throw error;
  }
};