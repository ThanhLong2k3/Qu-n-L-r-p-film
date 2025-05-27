import { create } from 'zustand';
import {  getSeatsByShowtime, } from '../services/seatService';

// Tạo store cho ghế
const useSeatStore = create((set) => ({
  seats: [], // Danh sách ghế
  availableSeats: [], // Ghế còn trống
  selectedSeat: null, // Ghế được chọn
  setSeats: (seats) => set({ seats }),
  setAvailableSeats: (availableSeats) => set({ availableSeats }),
  setSelectedSeat: (seat) => set({ selectedSeat: seat }),



  // Fetch ghế của một suất chiếu
  fetchSeatsByShowtime: async (showtimeId) => {
    try {
      const seats = await getSeatsByShowtime(showtimeId);
      set({ seats });
    } catch (error) {
      console.error('Error fetching seats by showtime:', error);
    }
  },

  
}));

export default useSeatStore;
