import axios from 'axios';

const API_URL = 'http://localhost:3000/api/discounts'; 


export const getDiscountByCode = async (discountCode) => {
  try {
    const response = await axios.get(`${API_URL}/code/${discountCode}`);
    return response.data; 
  } catch (error) {
    throw new Error('Mã giảm giá không hợp lệ hoặc đã hết hạn:', error);
  }
};
