import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'; // Để lấy ID phim từ URL
import { useMovieById } from '../../hooks/useMovies'; // Import hook lấy dữ liệu phim

const InforMovie = () => {
  const { id } = useParams(); // Lấy ID phim từ URL
  const { data: movie, isLoading, isError, error } = useMovieById(id); // Hook lấy dữ liệu phim từ API

  // Kiểm tra trạng thái loading và error
  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</Typography>;
  }

  return (
    <Box
      px={20}
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginTop: '16px',
      }}
    >
      {/* Director */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Director:
        </Typography>
        <Typography variant="body1">{movie.director || 'Unknown'}</Typography>
      </Box>

      {/* Time */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Time:
        </Typography>
        <Typography variant="body1">{movie.duration ? `${movie.duration} Mins` : 'Unknown'}</Typography>

      </Box>

      {/* Premier */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Premier:
        </Typography>
        <Typography variant="body1">{new Date(movie.releaseDate).toLocaleDateString() || 'Unknown'}</Typography>
      </Box>

      {/* Writer */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Writer:
        </Typography>
        <Typography variant="body1">{movie.writers?.join(', ') || 'Unknown'}</Typography>
      </Box>

      {/* Cast */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Cast:
        </Typography>
        <Typography variant="body1">{movie.cast?.join(', ') || 'Unknown'}</Typography>
      </Box>
    </Box>
  );
};

export default InforMovie;
