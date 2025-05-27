import { create } from 'zustand';
import { fetchMovieById } from '../services/movieService';
// Tạo store cho phim
const useMovieStore = create((set) => ({
  movies: [],
  selectedMovie: null,
  setMovies: (movies) => set({ movies }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  fetchSelectedMovie: async (id) => {
    try {
      const movie = await fetchMovieById(id); 
      set({ selectedMovie: movie }); 
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  },
}));

export default useMovieStore;
