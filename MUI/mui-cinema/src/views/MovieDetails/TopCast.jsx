import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';  // Để lấy ID phim từ URL
import { useMovieById } from '../../hooks/useMovies';  // Hook lấy dữ liệu phim từ API

const TopCast = () => {
  const { id } = useParams();  // Lấy ID phim từ URL
  const { data: movie, isLoading, isError, error } = useMovieById(id);  // Hook lấy dữ liệu phim theo ID từ API

  // Kiểm tra trạng thái loading và error
  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</Typography>;
  }

  // Lấy danh sách cast từ movie (giả sử movie có thuộc tính cast)
  const castData = movie?.cast?.map(cast => cast.trim()) || []; // Loại bỏ ký tự tab và khoảng trắng thừa

  return (
    <Box px={20} py={4}>
      <Typography variant="h5" fontWeight="bold" marginBottom="16px">
        Top Cast
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
        }}
      >
        {castData.map((cast, index) => (
          <Box key={index} textAlign="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {cast}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopCast;
