import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Subscribe = () => {
  const theme = useTheme(); // Lấy theme hiện tại
  const [email, setEmail] = useState("");

  // Xử lý gửi email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Vui lòng nhập email!");
    } else {
      alert(`Cảm ơn! Chúng tôi sẽ gửi thông báo phim mới nhất đến: ${email}`);
      setEmail(""); // Reset form
    }
  };

  return (
    <Container
      sx={{
        mt: 6,
        py: 4,
        px: 3,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
      component={Paper}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Đăng ký để nhận thông báo về các bộ phim mới nhất!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: theme.palette.text.secondary,
        }}
      >
        Hãy để lại email để không bỏ lỡ bất kỳ bộ phim hấp dẫn nào.
      </Typography>
      <form onSubmit={handleEmailSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <TextField
            type="email"
            variant="outlined"
            size="small"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                bgcolor: theme.palette.background.default,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Đăng ký
          </Button>
        </Box>
      </form>
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, mt: 1 }}
      >
        Chúng tôi tôn trọng quyền riêng tư của bạn. Email sẽ được bảo mật!
      </Typography>
    </Container>
  );
};

export default Subscribe;
