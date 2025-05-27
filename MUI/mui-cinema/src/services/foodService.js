import axios from 'axios';

const API_URL = 'http://localhost:3000/api/foods';

export const getAllFoods = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};
