import { create } from 'zustand';
import { createOrder, getOrders, getOrderById } from '../services/orderService';

const useOrderStore = create((set) => ({
  orders: [], // Lưu danh sách đơn hàng
  selectedOrder: null, // Lưu đơn hàng đã chọn

  // Cập nhật danh sách đơn hàng
  setOrders: (orders) => set({ orders }),

  // Cập nhật đơn hàng đã chọn
  setSelectedOrder: (order) => set({ selectedOrder: order }),

  // Lấy tất cả đơn hàng từ API
  fetchOrders: async () => {
    try {
      const orders = await getOrders();
      set({ orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },

  // Lấy thông tin chi tiết của một đơn hàng
  fetchOrderById: async (id) => {
    try {
      const order = await getOrderById(id);
      set({ selectedOrder: order });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
    }
  },

  // Tạo mới một đơn hàng
  createOrder: async (bookingId, transactionId) => {
    try {
      const newOrder = await createOrder(bookingId, transactionId);
      set((state) => ({ orders: [...state.orders, newOrder] }));
    } catch (error) {
      console.error('Error creating order:', error);
    }
  },
}));

export default useOrderStore;
