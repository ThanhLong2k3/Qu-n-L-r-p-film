import {
  Box,
  Button,
  Typography,
  Link,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FooterContent = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 6, pb: 6, px: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo và mô tả */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Đặt vé xem phim dễ dàng với hệ thống MovieMate trên toàn quốc
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: "20px",
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
            >
              Đặt vé ngay
            </Button>
          </Grid>

          {/* Cột Movies */}
          <Grid item xs={6} md={2} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              Thể loại
            </Typography>
            {[
              "Hành động",
              "Phiêu lưu",
              "Hoạt hình",
              "Hài",
              "Tội phạm",
            ].map((item, index) => (
              <Link
                href="#"
                key={index}
                underline="none"
                sx={{
                  display: "block",
                  color: "white",
                  mb: 1,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Cột Links */}
          <Grid item xs={6} md={2} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              Liên kết
            </Typography>
            {[
              "Giới thiệu",
              "Tài khoản của tôi",
              "Tin tức",
              "Sự kiện mới nhất",
              "Liên hệ",
            ].map((item, index) => (
              <Link
                href="#"
                key={index}
                underline="none"
                sx={{
                  display: "block",
                  color: "white",
                  mb: 1,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Cột Newsletter */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              Bản tin
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Đăng ký nhận bản tin của chúng tôi ngay hôm nay.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                bgcolor: theme.palette.background.paper,
                borderRadius: "30px",
                overflow: "hidden",
                mb: 2,
              }}
            >
              <TextField
                variant="standard"
                placeholder="Địa chỉ Email"
                sx={{
                  px: 2,
                  py: 1,
                  flex: 1,
                  color: theme.palette.text.primary,
                  input: { color: theme.palette.text.primary },
                }}
                InputProps={{ disableUnderline: true }}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox sx={{ color: theme.palette.primary.main }} />}
              label={
                <Typography variant="body2" sx={{ color: "white" }}>
                  Tôi đồng ý với tất cả điều khoản và chính sách của công ty
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterContent;
