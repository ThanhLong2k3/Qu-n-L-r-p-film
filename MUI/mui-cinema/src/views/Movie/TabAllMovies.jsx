import PropTypes from 'prop-types'; // Import PropTypes
import { Box, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material';

const genres = [
  'Hành động',
  'Kinh dị',
  'Phiêu lưu',
  'Hài kịch',
  'Hoạt hình',
  'Giật gân',
];

const TabAllMovies = ({ filterStatus, selectedGenres, onStatusChange, onGenreChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <FormControl sx={{ width: '200px' }}>
        <InputLabel id="status-filter-label">Trạng thái</InputLabel>
        <Select
          labelId="status-filter-label"
          value={filterStatus}
          onChange={onStatusChange}
          label="Trạng thái"
        >
          <MenuItem value="Tất cả">Tất cả</MenuItem>
          <MenuItem value="Đang chiếu">Đang chiếu</MenuItem>
          <MenuItem value="Nổi bật">Nổi bật</MenuItem>
          <MenuItem value="Sắp ra mắt">Sắp ra mắt</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        multiple
        id="genre-filter"
        options={genres}
        getOptionLabel={(option) => option}
        value={selectedGenres}
        onChange={onGenreChange}
        sx={{ width: '200px' }}
        renderInput={(params) => (
          <TextField {...params} label="Thể loại" placeholder="Chọn thể loại" />
        )}
      />
    </Box>
  );
};

TabAllMovies.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  selectedGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
};

export default TabAllMovies;
