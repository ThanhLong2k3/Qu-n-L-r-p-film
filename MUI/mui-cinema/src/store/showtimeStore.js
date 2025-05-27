import { create } from 'zustand';
import { fetchShowtimesByMovie, getAllShowtimes, getShowtimesByCity, getShowtimesByTheater } from '../services/showtimeService'; // Đừng quên import service

// Tạo store cho showtimes
const useShowtimeStore = create((set) => ({
  showtimes: [],
  selectedShowtime: null,
  setShowtimes: (showtimes) => set({ showtimes }),
  setSelectedShowtime: (showtime) => set({ selectedShowtime: showtime }),

  // Fetch tất cả showtimes của một bộ phim
  fetchShowtimesByMovie: async (movieId) => {
    try {
      const showtimes = await fetchShowtimesByMovie(movieId); // Gọi API để lấy tất cả showtimes
      set({ showtimes }); // Lưu showtimes vào store
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  },

  // Fetch tất cả suất chiếu
  fetchAllShowtimes: async () => {
    try {
      const showtimes = await getAllShowtimes();
      set({ showtimes });
    } catch (error) {
      console.error('Error fetching all showtimes:', error);
    }
  },

  // Fetch suất chiếu theo thành phố
  fetchShowtimesByCity: async (cityId) => {
    try {
      const showtimes = await getShowtimesByCity(cityId);
      set({ showtimes });
    } catch (error) {
      console.error('Error fetching showtimes by city:', error);
    }
  },

  // Fetch suất chiếu theo rạp
  fetchShowtimesByTheater: async (theaterId) => {
    try {
      const showtimes = await getShowtimesByTheater(theaterId);
      set({ showtimes });
    } catch (error) {
      console.error('Error fetching showtimes by theater:', error);
    }
  },
}));

export default useShowtimeStore;
