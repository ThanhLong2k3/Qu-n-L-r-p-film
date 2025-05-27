import axios from 'axios';

const API_URL = 'http://localhost:3000/api/movies';  

// Lấy tất cả các bộ phim
export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URL); 
    return response.data; // 
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};
