import PropTypes from "prop-types"; 
import Slider from "react-slick";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const MovieSlider = ({ movies }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings} >
      {movies.map((movie, index) => (
        <Box key={index} sx={{ padding: "0 8px" }}>
          <Card sx={{ position: "relative", overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={`http://localhost:3000/${movie.images?.[0]}`}
              alt={movie.title}
            />
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                color: "white",
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                padding: 2,
              }}
              onClick={() => navigate(`/moviedetails/${movie._id}`)}
            >
              {/* Hiển thị thể loại và thời gian */}
              <Typography variant="body2">{`${movie.genres?.[0]?.name || 'Không có thể loại'} / ${movie.duration} phút`}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
                {movie.title}
              </Typography>

              {/* Các nút Đặt vé và Xem trailer */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Đặt vé
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      borderColor: theme.palette.primary.dark,
                      color: theme.palette.primary.dark,
                    },
                  }}
                >
                  Xem trailer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

// Định nghĩa kiểu dữ liệu của props
MovieSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genres: PropTypes.array,
      duration: PropTypes.number.isRequired, // Đổi thành number thay vì string
      images: PropTypes.array.isRequired,
    })
  ).isRequired,
};


export default MovieSlider;
