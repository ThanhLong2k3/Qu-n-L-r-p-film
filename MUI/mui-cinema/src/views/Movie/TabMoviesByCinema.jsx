import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAllShowtimes } from '../../hooks/useShowtimes'; // Import useAllShowtimes để lấy tất cả các showtimes

const TabMoviesByCinema = ({ selectedCinema, onCinemaChange }) => {
  const { data: allShowtimes, isLoading, error } = useAllShowtimes(); // Lấy tất cả các showtimes từ API
  const [cinemas, setCinemas] = useState([]); // State lưu trữ danh sách các rạp

  // Lấy danh sách các rạp khi allShowtimes thay đổi
  useEffect(() => {
    if (allShowtimes) {
      // Giả sử mỗi showtime có trường theater chứa tên rạp
      const uniqueCinemas = Array.from(new Set(allShowtimes.map(showtime => showtime.theater.name))).map(cinema => cinema);
      setCinemas(uniqueCinemas); // Cập nhật lại danh sách rạp
    }
  }, [allShowtimes]); // Thực thi lại khi allShowtimes thay đổi

  // Hiển thị loading và lỗi nếu có
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading showtimes</div>;
  }

  return (
    <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <FormControl sx={{ width: '200px' }}>
        <InputLabel id="cinema-filter-label">Chọn rạp</InputLabel>
        <Select
          labelId="cinema-filter-label"
          value={selectedCinema}
          onChange={onCinemaChange}
          label="Chọn rạp"
        >
          <MenuItem value="">Tất cả</MenuItem> {/* Mục Tất cả */}
          {cinemas.length > 0 ? (
            cinemas.map((cinema) => (
              <MenuItem key={cinema} value={cinema}>
                {cinema}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Không có rạp</MenuItem> // Hiển thị thông báo nếu không có rạp
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

TabMoviesByCinema.propTypes = {
  selectedCinema: PropTypes.string.isRequired,
  onCinemaChange: PropTypes.func.isRequired,
};

export default TabMoviesByCinema;
