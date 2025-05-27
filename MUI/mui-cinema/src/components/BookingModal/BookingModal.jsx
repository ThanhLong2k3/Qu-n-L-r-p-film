import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useShowtimesByMovie } from '../../hooks/useShowtimes';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const BookingModal = ({ open, onClose, movie }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewOption, setViewOption] = useState('all'); // Mặc định là 'all'

  const navigate = useNavigate(); // Hook điều hướng

  // Sử dụng hook để lấy showtimes theo movieId
  const { data: showtimes, isLoading, error } = useShowtimesByMovie(movie?._id);

  const scheduleData = {
    locations: showtimes
      ? showtimes.map((showtime) => ({
          showtimeId: showtime._id,
          city: showtime.theater.name,
          date: dayjs(showtime.time).utc().format('YYYY-MM-DD'), // Chỉ lấy ngày UTC
          name: showtime.theater.name,
          times: [{ time: dayjs(showtime.time).utc().format('HH:mm'), id: showtime._id }], // Lấy giờ chiếu
        }))
      : [],
  };
  

  const cities = Array.from(new Set(scheduleData.locations.map((loc) => loc.city)));
  const theaters = Array.from(new Set(scheduleData.locations.map((loc) => loc.name)));

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = (event, newValue) => {
    setViewOption(newValue);
    setSelectedCity('');
  };

  const handleShowtimeClick = (showtimeId) => {
    navigate(`/seatbooking/${showtimeId}`);
  };
  

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{movie?.title}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            renderInput={(params) => (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Chọn ngày chiếu
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <params.InputComponent
                    {...params.inputProps}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '10px',
                      fontSize: '16px',
                      width: '100%',
                    }}
                  />
                </Box>
              </Box>
            )}
          />
        </LocalizationProvider>

        <Tabs value={viewOption} onChange={handleViewChange} centered sx={{ marginBottom: 2 }}>
          <Tab label="Tất cả" value="all" />
          <Tab label="Thành phố" value="city" />
          <Tab label="Rạp" value="theater" />
        </Tabs>

        {viewOption === 'city' && (
          <Tabs value={selectedCity} onChange={handleCityChange} centered sx={{ marginBottom: 2 }}>
            {cities.map((city, index) => (
              <Tab key={index} label={city} value={city} />
            ))}
          </Tabs>
        )}

        {viewOption === 'theater' && (
          <Tabs value={selectedCity} onChange={handleCityChange} centered sx={{ marginBottom: 2 }}>
            {theaters.map((theater, index) => (
              <Tab key={index} label={theater} value={theater} />
            ))}
          </Tabs>
        )}

        <Box>
          {scheduleData.locations
            .filter(
              (loc) =>
                (viewOption === 'all' ||
                  (viewOption === 'city' && loc.city === selectedCity) ||
                  (viewOption === 'theater' && loc.name === selectedCity)) &&
                loc.date === selectedDate.format('YYYY-MM-DD')
            )
            .map((location, index) => (
              <Box key={index} sx={{ marginBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {location.city} - {location.name}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                  {location.times.map((time) => (
                    <Button
                      key={time.id}
                      variant="outlined"
                      size="small"
                      onClick={() => handleShowtimeClick(time.id)} // Gọi hàm điều hướng
                      sx={{
                        textTransform: 'none',
                        borderColor: '#ddd',
                      }}
                    >
                      {time.time}
                    </Button>
                  ))}
                </Stack>
              </Box>
            ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

BookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default BookingModal;
