import { useState } from 'react';
import { Box, Pagination, Tabs, Tab } from '@mui/material';
import { useMovies } from '../../hooks/useMovies'; // Import the useMovies hook
import { useShowtimesByTheater } from '../../hooks/useShowtimes'; // Import the useShowtimesByTheater hook
import TabAllMovies from './TabAllMovies';
import TabMoviesByCinema from './TabMoviesByCinema';
import TabMoviesByDate from './TabMoviesByDate';
import MovieGrid from '../../components/MovieGrid/MovieGrid';

const ITEMS_PER_PAGE = 8;

const ListMovie = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');

  // Use the useMovies hook to fetch the movie data from the API
  const { data: movies, isLoading, error } = useMovies();

  // Fetch showtimes by selected cinema
  const { data: showtimesByCinema } = useShowtimesByTheater(selectedCinema);

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1);
  };

  // Handle filter status change
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  // Handle genre change
  const handleGenreChange = (event, values) => {
    setSelectedGenres(values);
    setCurrentPage(1);
  };

  // Handle date filter change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
  };

  // Handle cinema change
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
    setCurrentPage(1);
  };

  // Filter the movies based on selected criteria
  const filteredMovies = () => {
    let filtered = movies || [];

    // Filter by date if tabValue is 1 (By Date)
    if (tabValue === 1 && selectedDate) {
      filtered = filtered.filter(movie => {
        // Assuming releaseDate is the date of showing in 'YYYY-MM-DD' format
        const releaseDate = new Date(movie.releaseDate).toISOString().split('T')[0];
        return releaseDate === selectedDate; // Compare the selected date with movie releaseDate
      });
    }

    // Filter by cinema if tabValue is 2 (By Cinema)
    if (tabValue === 2 && selectedCinema && showtimesByCinema) {
      filtered = filtered.filter(movie => {
        // Only include movies that are shown in the selected cinema's showtimes
        return showtimesByCinema.some(showtime => showtime.theater.name === selectedCinema && showtime.movie._id === movie._id);
      });
    }

    // Filter by status if it's not 'Tất cả'
    if (filterStatus !== 'Tất cả') {
      filtered = filtered.filter(movie => movie.status === filterStatus);
    }

    // Filter by genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        selectedGenres.some(genre => 
          movie.genres && movie.genres.some(genreObj => genreObj.name === genre)
        )
      );
    }

    return filtered;
  };

  const moviesToShow = filteredMovies();
  const totalPages = Math.ceil(moviesToShow.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentMovies = moviesToShow.slice(startIndex, endIndex);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <Box sx={{ padding: '10px 160px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="movie filter tabs">
          <Tab label="Tất cả" />
          <Tab label="Theo ngày" />
          <Tab label="Theo rạp" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <TabAllMovies
          filterStatus={filterStatus}
          selectedGenres={selectedGenres}
          onStatusChange={handleStatusChange}
          onGenreChange={handleGenreChange}
        />
      )}

      {tabValue === 1 && (
        <TabMoviesByDate
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      )}

      {tabValue === 2 && (
        <TabMoviesByCinema
          selectedCinema={selectedCinema}
          onCinemaChange={handleCinemaChange}
        />
      )}

      {/* Hiển thị danh sách phim đã lọc sử dụng MovieGrid */}
      <MovieGrid movies={currentMovies} />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default ListMovie;
