import { useState } from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BannerSlider = () => {
  const slides = [
    {
      image: "/assets/banner/banner-04.jpg",
      title1: "Adventure Movie",
      title2: "Love Nightmare",
      description: "Written and Directed by Aleesha Rose / Ireland 2023",
      release: "June 2023",
      trailers: [{ video: "/assets/trailer1.mp4" }],
    },
    {
      image: "/assets/banner/banner-02.jpg",
      title1: "Mystery Movie",
      title2: "The Silent Hill",
      description: "Written and Directed by John Doe / USA 2022",
      release: "December 2022",
      trailers: [{ video: "/assets/trailer3.mp4" }],
    },
    {
      image: "/assets/banner/banner3.jpg",
      title1: "Sci-Fi Movie",
      title2: "Galactic Wars",
      description: "Written and Directed by Jane Smith / UK 2024",
      release: "March 2024",
      trailers: [{ video: "/assets/trailer5.mp4" }],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // Trạng thái của slider chính
  const theme = useTheme();
  const strokeColor = theme.palette.primary.main;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index), // Cập nhật trạng thái index
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "flex-end",
                padding: "16% 12%",
                color: "#fff",
                position: "relative",
              }}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: -1,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box>
                  <Box sx={{ fontSize: "70px", fontWeight: "bold" }}>
                    {slide.title1}
                  </Box>
                  <Box sx={{ fontSize: "70px", fontWeight: "bold" }}>
                    {slide.title2}
                  </Box>
                  <Box sx={{ fontSize: "18px", lineHeight: "1.5" }}>
                    {slide.description}
                  </Box>
                  <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      More Info
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderWidth: "2px",
                        "&:hover": {
                          borderWidth: "2px",
                        },
                      }}
                    >
                      Get Ticket
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    textAlign: "right",
                    position: "absolute",
                    top: "1%",
                    right: "10%",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    In Theater
                  </Box>
                  <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    {slide.release}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      left: "10%",
                      width: "100%",
                      height: "8px",
                      background: `linear-gradient(to right, ${strokeColor}, rgba(255, 165, 0, 0.6))`,
                      borderRadius: "50%",
                      transform: "rotate(-3deg) scaleX(1.2)",
                      zIndex: -1,
                      clipPath: `
                    path('M0,4 
                          C30,10 70,2 100,4 
                          C130,6 160,20 200,10')`,
                    }}
                  ></Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>

        {/* Trailer */}
        <Box
          sx={{
            position: "absolute",
            right: "0",
            bottom: "0",
            width: "40%",
            height: "30%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: "35px",
            borderRadius: "10px 0 0 0",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "10px",
            }}
          >
            Trailers
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              overflowX: "auto",
            }}
          >
            {slides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  borderRadius: "8px",
                  overflow: "hidden",
                  border:
                    currentSlide === index
                      ? `3px solid ${strokeColor}`
                      : "none",
                  marginTop: "20px",
                }}
              >
                <video
                  src={slide.trailers[0].video}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "60px",
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          align="center"
          color="theme.palette.text.primary"
        >
          Bạn không thể quyết định xem phim nào tiếp theo?{" "}
          <Typography
            component="span"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            color="inherit"
          >
            Xem danh sách phim
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default BannerSlider;
