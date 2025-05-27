import { Box, Typography } from '@mui/material';
import MovieGrid from '../../components/MovieGrid/MovieGrid'; // Import MovieGrid để tái sử dụng
import { useMovies } from '../../hooks/useMovies';  // Hook lấy dữ liệu phim từ API

const MoreMovies = () => {
  const { data: movies, isLoading, isError, error } = useMovies();  // Sử dụng hook để lấy danh sách phim từ API

  // Kiểm tra trạng thái loading và error
  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</Typography>;
  }

  return (
    <Box px={20} py={4}>
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        More Movies Like This
      </Typography>
      {/* Truyền dữ liệu phim từ API vào MovieGrid */}
      <MovieGrid movies={movies} />
    </Box>
  );
};

export default MoreMovies;
