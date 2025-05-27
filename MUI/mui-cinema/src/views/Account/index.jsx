import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const Account = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [username, setUsername] = useState(null);

  // Lấy username từ localStorage khi component render
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const sections = {
    dashboard:
      "Từ bảng điều khiển tài khoản, bạn có thể xem các đơn hàng gần đây, quản lý thanh toán cũng như chỉnh sửa mật khẩu và thông tin tài khoản.",
    orders: [
      {
        id: "#16260",
        date: "Ngày 13 tháng 12 năm 2024",
        status: "Đang giữ",
        total: "$22,00 cho 1 sản phẩm",
        action: "Xem",
        details: {
          date: "05-03-2026 7:30 sáng",
          room: "XEM PHIM",
          seat: "M14 - Người lớn",
          extra: "Coca x 2, Bỏng ngô x 1",
          address: "San Francisco, California",
        },
      },
      // Bạn có thể thêm các đơn hàng khác vào đây
    ],
    accountDetails: null, // Phần này sẽ chứa form
    logout: "Bạn đã chọn Đăng xuất.",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý lưu thay đổi ở đây
    alert("Đã lưu thay đổi!");
  };

  return (
    <Box sx={{ p: 24 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <List component="nav" sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}>
            {Object.keys(sections).map((key) => (
              <ListItem key={key} disablePadding>
                <ListItemButton onClick={() => setSelectedSection(key)}>
                  <ListItemText
                    primary={
                      key === "dashboard"
                        ? "Bảng điều khiển"
                        : key === "orders"
                        ? "Đơn hàng"
                        : key === "accountDetails"
                        ? "Chi tiết tài khoản"
                        : "Đăng xuất"
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={9}>
          <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {selectedSection === "dashboard"
                ? `Xin chào, ${username || "Người dùng"}`
                : selectedSection === "orders"
                ? "Đơn hàng"
                : selectedSection === "accountDetails"
                ? "Chi tiết tài khoản"
                : "Đăng xuất"}
            </Typography>
            {selectedSection === "accountDetails" ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Tên"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Họ"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên hiển thị"
                      required
                      variant="outlined"
                      size="small"
                      helperText="Đây sẽ là cách tên của bạn được hiển thị trong tài khoản và phần đánh giá"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa chỉ email"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Thay đổi mật khẩu</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu hiện tại (để trống nếu không thay đổi)"
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu mới (để trống nếu không thay đổi)"
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Xác nhận mật khẩu mới"
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Lưu thay đổi
                    </Button>
                  </Grid>
                </Grid>
              </form>
            ) : selectedSection === "orders" ? (
              <List>
                {sections.orders.map((order) => (
                  <ListItem key={order.id}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2">{order.id}</Typography>
                        <Typography variant="body2">{order.date}</Typography>
                        <Typography variant="body2">{order.status}</Typography>
                        <Typography variant="body2">{order.total}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          onClick={() => alert("Xem chi tiết")}
                        >
                          {order.action}
                        </Button>
                        {/* Hiển thị thông tin chi tiết nếu cần */}
                        {order.details && (
                          <Box mt={2}>
                            <Typography variant="body2">
                              Ngày: {order.details.date}
                            </Typography>
                            <Typography variant="body2">
                              Phòng: {order.details.room}
                            </Typography>
                            <Typography variant="body2">
                              Ghế: {order.details.seat}
                            </Typography>
                            <Typography variant="body2">
                              Thêm: {order.details.extra}
                            </Typography>
                            <Typography variant="body2">
                              Địa chỉ: {order.details.address}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>{sections[selectedSection]}</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
