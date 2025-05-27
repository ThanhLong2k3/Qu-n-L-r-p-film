import { create } from 'zustand';

const useFoodStore = create((set) => ({
  foods: [], // Mảng lưu trữ danh sách món ăn
  setFoods: (foods) => set({ foods }), // Hàm để cập nhật danh sách món ăn
  addFood: (food) => set((state) => ({ foods: [...state.foods, food] })), // Hàm để thêm món ăn mới
}));

export default useFoodStore;
