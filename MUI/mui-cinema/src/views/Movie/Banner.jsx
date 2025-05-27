import Box from "@mui/material/Box";

const Banner = () => {
  const slides = [
    {
      image: "/assets/background-header-2.jpg",
    },
  ];
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              height: "550px",
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
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem", // Adjust the font size as needed
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              Danh Sách Phim
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Banner;
