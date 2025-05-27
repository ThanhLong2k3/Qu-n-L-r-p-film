import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const News = () => {
  const theme = useTheme(); // Lấy theme hiện tại

  // Dữ liệu tin tức
  const newsData = [
    {
      title: "Ngày thứ năm",
      genre: "Hài kịch",
      duration: 180,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Con Đường Của Nước",
      genre: "Phiêu lưu, Tội phạm",
      duration: 190,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "The Witcher Phần 2",
      genre: "Hành động, Kinh dị",
      duration: 180,
      image: "https://via.placeholder.com/300",
    },
  ];

  // Xử lý khi bấm vào nút
  const handleTrailerClick = (title) => {
    alert(`Xem trailer cho ${title}`);
  };

  const handleTicketClick = (title) => {
    alert(`Nhận vé cho ${title}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Tiêu đề Tin Tức */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: theme.palette.primary.main, 
        }}
      >
        Tin tức
      </Typography>

      <Grid container spacing={3}>
        {newsData.map((news, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper, // Áp dụng màu nền từ theme
              }}
            >
              <CardMedia
                component="img"
                image={news.image}
                alt={news.title}
                sx={{
                  width: "380px",
                  height: "250px",
                  objectFit: "cover",
                  mx: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {news.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                  <Chip label={news.genre} color="primary" size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ⏳ {news.duration} phút
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleTrailerClick(news.title)}
                  >
                    Xem Trailer
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleTicketClick(news.title)}
                  >
                    Nhận vé
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
