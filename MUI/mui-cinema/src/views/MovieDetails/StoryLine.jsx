import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';  // Để lấy ID phim từ URL
import { useMovieById } from '../../hooks/useMovies';  // Hook lấy dữ liệu phim từ API

const StoryLine = () => {
  const { id } = useParams();  // Lấy ID phim từ URL
  const { data: movie, isLoading, isError, error } = useMovieById(id);  // Hook lấy dữ liệu phim theo ID từ API

  // Kiểm tra trạng thái loading và error
  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</Typography>;
  }

  // Lấy mô tả của bộ phim từ API
  const storyLine = movie?.description || 'No description available';

  return (
    <Box px={20} py={4}>
      <Typography variant="h5" fontWeight="bold" marginBottom="16px">
        Story Line
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {storyLine}
      </Typography>
    </Box>
  );
};

export default StoryLine;
