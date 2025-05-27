// NowPlaying.js
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GLOBAL_PADDING_X, GLOBAL_PADDING_Y } from "./config";
import MovieSlider from "../../components/MovieSlider/MovieSlider";

const movies = [
  {
    title: "The Witcher Phần 2",
    genre: "Hành động, Kinh dị",
    duration: "180 phút",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "Ác mộng tình yêu",
    genre: "Phiêu lưu, Hài kịch",
    duration: "170 phút",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "Cặp song sinh đen trắng",
    genre: "Hoạt hình, Hài kịch",
    duration: "190 phút",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "Giấc mơ đáng sợ nhất",
    genre: "Giật gân",
    duration: "180 phút",
    image: "https://via.placeholder.com/300x400",
  },
];

const NowPlaying = () => {
  const theme = useTheme();

  return (
    <Box sx={{ paddingY: GLOBAL_PADDING_Y, paddingX: GLOBAL_PADDING_X }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 1, pl: 1 }}
      >
        Phim đang chiếu
      </Typography>
      <MovieSlider movies={movies} />
    </Box>
  );
};

export default NowPlaying;
