import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

const Banner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "90vh",
        backgroundImage: "url('/assets/background-documentary-home1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
      }}
    >
      <Box sx={{ padding: "100px" }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          PHIM TÀI LIỆU
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            marginTop: "10px",
            fontSize: "50px",
            color: theme.palette.primary.main,
          }}
        >
          Cuộc sống dưới một chiếc ô
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "15px",
            fontSize: "16px",
            maxWidth: "400px",
            color: theme.palette.primary.main,
          }}
        >
          Phasellus non cursus ligula, sed mattis urna. Aenean ac tortor
          gravida, volutpat quam eget, consequat elit.
        </Typography>

        <Stack
          direction="row"
          spacing={5}
          alignItems="center"
          py={1}
          sx={{ marginTop: "20px" }}
        >
          <Box>
            <img
              src="/assets/awards-banner-01.png"
              alt="Best Film Award"
              style={{
                width: "108px",
                height: "94px",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
          </Box>
          <Box>
            <img
              src="/assets/awards-banner-02.png"
              alt="Best Director Award"
              style={{
                width: "108px",
                height: "94px",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
          </Box>
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          More Info
        </Button>
      </Box>

      {/* Watch Trailer */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          marginRight: "200px",
          marginBottom: "100px",
        }}
      >
        <Typography
          variant="caption"
          px={2}
          sx={{
            color: theme.palette.primary.main,
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          Watch the Trailer
        </Typography>
        <IconButton
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            padding: "15px",
            borderRadius: "50%",
            marginRight: "10px", // Khoảng cách giữa icon và text
          }}
        >
          <PlayCircleFilledWhiteIcon
            sx={{ fontSize: "40px", color: theme.palette.primary.main }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Banner;
