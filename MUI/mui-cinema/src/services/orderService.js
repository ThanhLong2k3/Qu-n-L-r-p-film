import axios from 'axios';

const API_URL = 'http://localhost:3000/api/orders';

// Lấy token từ localStorage
const getToken = () => localStorage.getItem('token');

// Tạo đơn hàng mới
export const createOrder = async (bookingId, transactionId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      'http://localhost:3000/api/orders',
      { bookingId, transactionId },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Gửi token trong header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response.data);
    throw error.response?.data || error.message;
  }
};

// Lấy tất cả đơn hàng
export const getOrders = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (id) => {
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
