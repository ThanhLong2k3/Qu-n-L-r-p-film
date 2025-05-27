import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; 

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data); // Đảm bảo gọi đúng endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
