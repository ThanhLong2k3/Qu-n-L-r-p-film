import { create } from 'zustand';
import { fetchBookings, fetchBookingById, createBooking, deleteBooking } from '../services/bookingService';

const useBookingStore = create((set) => ({
  bookings: [],
  selectedBooking: null,
  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),

  // Lấy tất cả các booking
  fetchBookings: async () => {
    try {
      const bookings = await fetchBookings();
      set({ bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },

  // Lấy thông tin chi tiết của một booking
  fetchBookingById: async (id) => {
    try {
      const booking = await fetchBookingById(id);
      set({ selectedBooking: booking });
    } catch (error) {
      console.error('Error fetching booking by ID:', error);
    }
  },

  // Tạo mới một booking
  createBooking: async (data) => {
    try {
      const newBooking = await createBooking(data);
      set((state) => ({ bookings: [...state.bookings, newBooking] }));
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  },

  // Xóa một booking
  deleteBooking: async (id) => {
    try {
      await deleteBooking(id);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },
}));

export default useBookingStore;
