import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <Box onClick={() => navigate("/")} sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
      <LocalMoviesIcon sx={{ color: "primary.main", fontSize: "2rem" }} />
      <Typography
        component="span"
        sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "primary.main" }}
      >
        MovieMate
      </Typography>
    </Box>
  );
}

export default Logo;
