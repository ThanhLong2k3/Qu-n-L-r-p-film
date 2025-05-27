import { useQuery } from '@tanstack/react-query';
import { fetchShowtimesByMovie, getShowtimesByTheater, getShowtimesByCity, getAllShowtimes } from '../services/showtimeService';

// Hook lấy tất cả các suất chiếu của một bộ phim
export const useShowtimesByMovie = (movieId) => {
  return useQuery({
    queryKey: ['showtimes', movieId],  // Sử dụng movieId trong queryKey để truy vấn cụ thể
    queryFn: () => fetchShowtimesByMovie(movieId), // Lấy dữ liệu showtimes theo movieId
    enabled: !!movieId, // Kiểm tra movieId đã có chưa, nếu chưa thì không thực hiện query
  });
};

export const useMoviesByDate = (movieId, selectedDate) => {
  return useQuery({
    queryKey: ['moviesByDate', movieId, selectedDate],
    queryFn: async () => {
      const showtimes = await fetchShowtimesByMovie(movieId);
      
      // Lọc các showtime theo ngày chiếu
      return showtimes.filter(showtime => {
        const showtimeDate = new Date(showtime.time).toISOString().split('T')[0];
        return showtimeDate === selectedDate;
      });
    },
    enabled: !!movieId && !!selectedDate, // Kiểm tra movieId và selectedDate trước khi query
  });
};
// Hook lấy tất cả các suất chiếu
export const useAllShowtimes = () => {
  return useQuery({
    queryKey: ['allShowtimes'],
    queryFn: getAllShowtimes,
  });
};

// Hook lấy suất chiếu theo thành phố
export const useShowtimesByCity = (cityId) => {
  return useQuery({
    queryKey: ['showtimesByCity', cityId],
    queryFn: () => getShowtimesByCity(cityId),
    enabled: !!cityId, // Chỉ gọi query nếu city tồn tại
  });
};

// Hook lấy suất chiếu theo rạp
export const useShowtimesByTheater = (theaterId) => {
  return useQuery({
    queryKey: ['showtimesByTheater', theaterId],
    queryFn: () => getShowtimesByTheater(theaterId),
    enabled: !!theaterId, // Chỉ gọi query nếu theaterId tồn tại
  });
};