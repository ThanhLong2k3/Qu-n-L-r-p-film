import { Box, Typography } from "@mui/material";
import { GLOBAL_PADDING_X, GLOBAL_PADDING_Y } from "./config";
import MovieCardItem from "../../components/MovieCardItem/MovieCard"; 
import { useTheme } from "@mui/material/styles";
import { useMovies } from "../../hooks/useMovies"; // Import useMovies hook

const MovieCard = () => {
  const theme = useTheme();
  // Fetch movies using the useMovies hook
  const { data: movies, isLoading, isError, error } = useMovies();

  if (isLoading) {
    return <Typography variant="h6" align="center" sx={{ color: theme.palette.text.primary }}>Loading movies...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" align="center" sx={{ color: theme.palette.error.main }}>Error loading movies: {error.message}</Typography>;
  }

  // Filter movies to only include those with status "Nổi bật"
  const featuredMovies = movies?.filter(movie => movie.status === "Nổi bật");

  return (
    <Box sx={{ paddingY: GLOBAL_PADDING_Y, paddingX: GLOBAL_PADDING_X }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
        Phim Nổi Bật
      </Typography>

      {featuredMovies?.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary }}>
          Không có phim nổi bật.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          {featuredMovies?.map((movie, index) => (
            <Box key={index} sx={{ width: "32%" }}>
              <MovieCardItem
                title={movie.title}
                category={movie.category}
                duration={movie.duration}
                image={`http://localhost:3000/${movie.images?.[0]}`}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MovieCard;
