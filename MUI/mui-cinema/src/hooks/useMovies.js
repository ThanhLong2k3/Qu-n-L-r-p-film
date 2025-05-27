import { useQuery } from '@tanstack/react-query';
import { fetchMovies,fetchMovieById } from '../services/movieService';

// Hook lấy tất cả các bộ phim
export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],  // Thay 'movies' bằng queryKey
    queryFn: fetchMovies,   // Thay 'fetchMovies' vào queryFn
  });
};
export const useMovieById = (id) => {
  return useQuery({
    queryKey: ['movie', id],  
    queryFn: () => fetchMovieById(id),  
  });
};
