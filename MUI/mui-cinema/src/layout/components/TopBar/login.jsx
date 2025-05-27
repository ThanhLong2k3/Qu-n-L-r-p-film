// src/components/Login.js
import { useState } from "react";
import { IconButton, Typography, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Lấy username từ localStorage
  const [username, setUsername] = useState(localStorage.getItem('username'));
  
  // State để mở/đóng menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Mở menu khi di chuột vào "Xin chào, {username}"
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Điều hướng khi chọn mục trong menu
  const handleLogout = () => {
    // Xóa token và username trong localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Cập nhật lại state username là null
    setUsername(null);

    navigate("/login"); // Điều hướng về trang login sau khi đăng xuất
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate("/account"); // Điều hướng đến trang thông tin cá nhân
    handleMenuClose();
  };

  return (
    <>
      {username ? (
        <>
          <Typography
            
            sx={{ color: "primary.main", cursor: "pointer", fontSize: "15px" }}
            onClick={handleMenuOpen} // Mở menu khi di chuột vào
          >
            Xin chào, {username}
          </Typography>

          {/* Menu Dropdown */}
          <Menu
            anchorEl={anchorEl} // Xác định vị trí mở menu
            open={Boolean(anchorEl)} // Mở menu nếu có anchorEl
            onClose={handleMenuClose} // Đóng menu khi click ngoài hoặc chọn mục
          >
            <MenuItem onClick={handleProfile}>Xem thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </>
      ) : (
        // Nếu chưa đăng nhập, hiển thị logo đăng nhập
        <IconButton onClick={() => navigate("/login")}>
          <PersonIcon sx={{ color: "primary.main" }} />
        </IconButton>
      )}
    </>
  );
};

export default Login;
