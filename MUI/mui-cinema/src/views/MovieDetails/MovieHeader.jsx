import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useMovieById } from '../../hooks/useMovies'; // Import hook để lấy phim theo ID
import BookingModal from '../../components/BookingModal/BookingModal'; // Import component BookingModal
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL

const MovieHeader = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams(); // Lấy ID từ URL
  const { data: movie, isLoading, isError, error } = useMovieById(id); // Dùng hook để lấy dữ liệu phim

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Kiểm tra nếu đang load hoặc có lỗi
  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: 'red' }}>Error: {error.message}</Typography>;
  }

  return (
    <Box
      px={20}
      py={4}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Phần thông tin phim */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: '8px' }}
        >
          {movie.genres?.map(genre => genre.name).join(', ')} / {movie.duration} phút
        </Typography>
      </Box>

      {/* Nút Get Ticket */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#E6731A',
          color: '#fff',
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#d25c00',
          },
        }}
        onClick={handleOpen} // Mở dialog khi bấm nút
      >
        Get Ticket
      </Button>

      {/* Booking Modal */}
      <BookingModal open={open} onClose={handleClose} movie={movie} />
    </Box>
  );
};

export default MovieHeader;
