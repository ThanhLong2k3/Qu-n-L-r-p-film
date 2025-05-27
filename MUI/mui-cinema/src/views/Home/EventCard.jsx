import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GLOBAL_PADDING_X, GLOBAL_PADDING_Y } from "./config";

const events = [
  {
    date: "26 Tháng Ba",
    time: "2:00 chiều - 6:00 chiều",
    location: "New York",
    title: "Những bộ phim ma thuật hay nhất từng được thực hiện",
  },
  {
    date: "26 Tháng Tư",
    time: "4:00 chiều - 10:00 tối",
    location: "New York",
    title: "Liên hoan phim The Strange Love 2023",
    image: "https://via.placeholder.com/150", // Thay bằng link ảnh thực tế
  },
  {
    date: "26 Tháng Bảy",
    time: "8:00 tối - 11:00 tối",
    location: "New York",
    title: "Những bộ phim lịch sử hay nhất năm 2023",
  },
];

const EventCard = () => {
  const theme = useTheme(); // Lấy theme hiện tại
  return (
    <Box sx={{backgroundColor: theme.palette.primary.main, paddingY: GLOBAL_PADDING_Y, paddingX: GLOBAL_PADDING_X}}>
      <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "8px", 
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.text, 
          marginBottom: "50px"
        }}
      >
        Đăng ký ngay cho sự kiện
      </Typography>

      <Grid container direction="column" spacing={2}>
        {events.map((event, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingY: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#999999", 
                  color: "white",
                  textAlign: "center",
                  marginRight: "16px",
                  flexShrink: 0,
                }}
              >
                <Typography variant="body2">{event.date.split(" ")[0]}</Typography>
                <Typography variant="body2">{event.date.split(" ")[1]}</Typography>
                <Typography variant="body2">{event.date.split(" ")[2]}</Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ marginRight: "8px", color: "orange" }}>⏰</span>
                  {event.time} / {event.location}
                </Typography>
              </Box>

              {/* Hình ảnh (nếu có) */}
              {event.image && (
                <Box sx={{ marginLeft: "16px", flexShrink: 0 }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              <Button
                variant="outlined"
                color="#000000"
                size="small"
                sx={{ marginLeft: "16px", flexShrink: 0 }}
              >
                Đăng Ký
              </Button>
            </Box>

            {/* Đường kẻ ngang */}
            {index < events.length - 1 && (
              <Divider
                sx={{
                  marginY: "8px",
                  borderColor: theme.palette.grey[300], // Màu của đường kẻ
                }}
              />
            )}
          </Box>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default EventCard;
