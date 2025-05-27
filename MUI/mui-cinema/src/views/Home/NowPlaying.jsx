import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GLOBAL_PADDING_X, GLOBAL_PADDING_Y } from "./config";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import { useMovies } from "../../hooks/useMovies";  // Import hook useMovies

const NowPlaying = () => {
  const theme = useTheme();
  
  const { data: movies, isLoading, isError, error } = useMovies();

  if (isLoading) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.primary }}>Loading movies...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.error.main }}>Error loading movies: {error.message}</Typography>;
  }

  // Filter movies by status "Đang chiếu"
  const nowPlayingMovies = movies.filter(movie => movie.status === "Đang chiếu");

  if (nowPlayingMovies.length === 0) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.primary }}>No movies are currently playing.</Typography>;
  }

  return (
    <Box sx={{ paddingY: GLOBAL_PADDING_Y, paddingX: GLOBAL_PADDING_X }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 1, pl: 1 }}
      >
        Phim đang chiếu 
      </Typography>
      <MovieSlider movies={nowPlayingMovies} />
    </Box>
  );
};

export default NowPlaying;
