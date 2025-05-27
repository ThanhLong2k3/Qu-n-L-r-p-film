import axios from 'axios';

const API_URL = 'http://localhost:3000/api/showtimes';

// Lấy tất cả các suất chiếu của một bộ phim
export const fetchShowtimesByMovie = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${movieId}`);
    return response.data;  // Trả về danh sách showtimes
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getAllShowtimes = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lấy tất cả các suất chiếu ở một thành phố
export const getShowtimesByCity = async (cityId) => {
  try {
    const response = await axios.get(`${API_URL}/city/${cityId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lấy tất cả các suất chiếu của một rạp
export const getShowtimesByTheater = async (theaterId) => {
  try {
    const response = await axios.get(`${API_URL}/theater/${theaterId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getSeatsByShowtime = async (showtimeId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/seats/showtime/${showtimeId}`);
    return response.data; // Trả về dữ liệu ghế
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
