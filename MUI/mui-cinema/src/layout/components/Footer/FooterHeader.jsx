import { Box, Typography, IconButton } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { useTheme } from "@mui/material/styles";

const FooterHeader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Logo */}
      <Box px={17} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <LocalMoviesIcon sx={{ color: theme.palette.primary.main, fontSize: "2rem" }} />
        <Typography
          component="span"
          sx={{ fontSize: "1.5rem", fontWeight: "bold", color: theme.palette.primary.main }}
        >
          MovieMate
        </Typography>
      </Box>

      {/* Social Icons */}
      <Box px={16} sx={{ display: "flex", gap: 1 }}>
        <IconButton href="#" sx={{ color: theme.palette.primary.main }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: theme.palette.primary.main }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: theme.palette.primary.main }}>
          <PinterestIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: theme.palette.primary.main }}>
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FooterHeader;
