import axios from 'axios';

const API_URL = 'http://localhost:3000/api/bookings';

const getToken = () => {
  return localStorage.getItem('token'); 
};

export const getBookingById  = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createBooking = async (data) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, data, {
      headers: {
        'Authorization': `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

