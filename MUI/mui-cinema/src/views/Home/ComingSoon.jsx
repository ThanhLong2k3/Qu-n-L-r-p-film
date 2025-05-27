import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GLOBAL_PADDING_X, GLOBAL_PADDING_Y } from "./config";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import { useMovies } from "../../hooks/useMovies"; // Import the useMovies hook

const NowPlaying = () => {
  const theme = useTheme();
  
  // Fetch movies using the useMovies hook
  const { data: movies, isLoading, isError, error } = useMovies();

  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.primary }}>Loading movies...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.error.main }}>Error loading movies: {error.message}</Typography>;
  }

  // Filter movies to only include those with status "Sắp chiếu"
  const upcomingMovies = movies?.filter(movie => movie.status === "Sắp chiếu");

  return (
    <Box sx={{ paddingY: GLOBAL_PADDING_Y, paddingX: GLOBAL_PADDING_X }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 1, pl: 1 }}
      >
        Phim sắp chiếu
      </Typography>

      {upcomingMovies?.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary }}>
          Không có phim sắp chiếu.
        </Typography>
      ) : (
        <MovieSlider movies={upcomingMovies} />
      )}
    </Box>
  );
};

export default NowPlaying;
