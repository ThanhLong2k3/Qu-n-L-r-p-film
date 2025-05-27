import PropTypes from 'prop-types';
import { Box, FormControl, TextField } from '@mui/material';
import  {useMoviesByDate} from '../../hooks/useShowtimes';

const TabMoviesByDate = ({ selectedDate, onDateChange }) => {
  const { data: moviesByDate, isLoading, error } = useMoviesByDate(null, selectedDate);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies by date</div>;
  }

  return (
    <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <FormControl sx={{ width: '200px' }}>
        <TextField
          id="date-filter"
          label="Ngày chiếu"
          type="date"
          value={selectedDate}
          onChange={onDateChange}
          sx={{ width: '200px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      {/* Hiển thị các bộ phim theo ngày */}
      <Box>
        {moviesByDate && moviesByDate.length > 0  (
          moviesByDate.map((showtime) => (
            <div key={showtime.id}>
              {showtime.movieTitle} - {new Date(showtime.time).toLocaleTimeString()}
            </div>
          ))
        )}
      </Box>
    </Box>
  );
};

TabMoviesByDate.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default TabMoviesByDate;
