import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";

const MovieGrid = ({ movies }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenDialog = (movie) => {
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <Grid item key={index}>
            <Card
              sx={{
                width: "270px",
                height: "390px",
                position: "relative",
                color: "#fff",
                backgroundColor: "transparent",
                boxShadow: "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                alt={movie.title}
                image={`http://localhost:3000/${movie.images?.[0]}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                  padding: "12px",
                }}
              >
                {/* Lấy thể loại từ genres */}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", fontWeight: 400 }}
                >
                  {movie.genres.map((genre) => genre.name).join(", ")} /{" "}
                  {movie.duration} min
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {movie.title}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginTop: "8px",
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "12px",
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                  }}
                  onClick={() => handleOpenDialog(movie)}
                >
                  Nhận vé
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <BookingModal
        open={openDialog}
        onClose={handleCloseDialog}
        movie={selectedMovie}
      />
    </>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genres: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieGrid;
