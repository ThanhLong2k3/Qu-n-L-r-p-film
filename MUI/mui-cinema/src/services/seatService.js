import axios from 'axios';

const API_URL = 'http://localhost:3000/api/seats';



// Lấy ghế theo ID
export const getSeatById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lấy ghế của một suất chiếu
export const getSeatsByShowtime = async (showtimeId) => {
  try {
    const response = await axios.get(`${API_URL}/showtime/${showtimeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

