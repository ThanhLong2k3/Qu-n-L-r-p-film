import { Box, Typography, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useMovieById } from '../../hooks/useMovies'; // Import hook lấy dữ liệu phim
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL

const MovieMedia = () => {
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Box
        component="img"
        src={`http://localhost:3000/${movie.images?.[0]}`} // Lấy ảnh đầu tiên trong mảng images
        alt="Character"
        sx={{
          width: '370px',
          height: '520px',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />

      {/* Hình ảnh video trailer */}
      <Box
        sx={{
          position: 'relative',
          width: '775px',
          height: '520px',
        }}
      >
        <Box
          component="img"
          src={`http://localhost:3000/${movie.images?.[0]}`} // Lấy ảnh trailer từ mảng images (có thể thay đổi tùy thuộc vào dữ liệu)
          alt="Trailer"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />

        {/* Nút "Play Trailer" */}
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#E6731A',
            color: '#fff',
            fontSize: '32px',
            '&:hover': {
              backgroundColor: '#d25c00',
            },
          }}
          onClick={() => window.open(`http://localhost:3000/${movie.trailer}`, '_blank')} // Mở trailer khi bấm nút
        >
          <PlayCircleOutlineIcon sx={{ fontSize: '48px' }} />
        </IconButton>

        {/* Text "Watch the Trailer" */}
        <Typography
          variant="subtitle1"
          color="white"
          sx={{
            position: 'absolute',
            bottom: '8px',
            left: '16px',
            fontWeight: 'bold',
          }}
        >
          Watch the Trailer →
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieMedia;
