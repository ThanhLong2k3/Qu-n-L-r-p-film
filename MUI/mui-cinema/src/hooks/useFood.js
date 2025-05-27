// hooks/useFood.js

import { useEffect } from 'react';
import { getAllFood } from '../services/foodService'; // Import foodService
import useFoodStore from '../store/foodStore'; // Import foodStore

const useFood = () => {
  const { foods, setFoods } = useFoodStore(); // Lấy dữ liệu từ foodStore

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFood(); // Gọi API để lấy dữ liệu món ăn
        console.log('danh sách đồ ăn',data);
        setFoods(data); // Lưu dữ liệu vào store
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu món ăn:', error);
      }
    };

    fetchFoods();
  }, [setFoods]);

  return { foods }; // Trả về dữ liệu món ăn
};

export default useFood;
