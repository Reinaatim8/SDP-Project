import apiClient from "./axiosInstance";

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
        'Authorization': `Token ${access}`,
       
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
    
  }

    throw error;
  }
};