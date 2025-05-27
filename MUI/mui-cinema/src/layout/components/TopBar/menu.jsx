import * as React from "react";
import { styled } from "@mui/system";
import { Box, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

export default function HoverMenu() {
  const menuItems = [
    { label: "Home", path: "/", subItems: [] },
    {
      label: "Movies",
      subItems: [
        { label: "Tất cả phim", path: "/movie" },
        { label: "Phim đang chiếu", path: "/movies/now-showing" },
        { label: "Phim sắp ra mắt", path: "/movies/upcoming" },
        { label: "Phim nổi bật", path: "/movies/highlights" },
        { label: "Lọc phim", path: "/movies/filter" },
      ],
    },
    {
      label: "Events",
      subItems: [
        { label: "Concerts", path: "/events/concerts" },
        { label: "Workshops", path: "/events/workshops" },
        { label: "Meetups", path: "/events/meetups" },
      ],
    },
    { label: "Pages", subItems: [{ label: "About Us", path: "/about" }, { label: "FAQ", path: "/faq" }] },
    { label: "News", subItems: [{ label: "Latest", path: "/news/latest" }, { label: "Popular", path: "/news/popular" }] },
    { label: "Contact", path: "/contact", subItems: [] },
  ];

  const [openMenu, setOpenMenu] = React.useState(null);
  const theme = useTheme();

  const handleMouseEnter = (index) => {
    setOpenMenu(index);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <Box sx={{ display: "flex", gap: 7, position: "relative" }}>
      {menuItems.map((item, index) => (
        <Box
          key={item.label}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              ":hover": { color: theme.palette.primary.main },
              paddingRight: "2px",
              color: theme.palette.primary.main,
            }}
          >
            {item.path ? (
              <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Typography>
          {item.subItems.length > 0 && openMenu === index && (
            <DropdownMenu>
              {item.subItems.map((subItem) => (
                <MenuItem key={subItem.label}>
                  <Link to={subItem.path} style={{ textDecoration: "none", color: "inherit" }}>
                    {subItem.label}
                  </Link>
                </MenuItem>
              ))}
            </DropdownMenu>
          )}
          {item.subItems.length > 0 && (
            <ExpandMoreIcon
              sx={{ fontSize: "1.3rem", color: theme.palette.primary.main }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}

const DropdownMenu = styled("ul")(
  ({ theme }) => `
  position: absolute;
  top: calc(100%);
  left: 0;
  margin: 0;
  padding: 8px 0;
  border: 1px solid ${theme.palette.divider};
  border-radius: 8px;
  list-style: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
`
);

const MenuItem = styled("li")(
  ({ theme }) => `
  padding: 8px 16px;
  font-size: 0.875rem;
  color: ${theme.palette.primary.main};
  cursor: pointer;
  &:hover {
    background: #E0E0E0;
  }
`
);
