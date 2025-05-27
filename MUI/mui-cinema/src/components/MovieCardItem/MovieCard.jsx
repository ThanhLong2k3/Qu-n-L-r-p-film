import PropTypes from "prop-types";
import { Box, Typography, Button, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const MovieCardItem = ({ title, category, duration, image }) => {
  return (
    <Card sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      {/* Ảnh trailer */}
      <Box sx={{ position: "relative", width: "200px", height: "200px", flexShrink: 0 }}>
        <CardMedia
          component="img"
          alt={title}
          image={image}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <PlayCircleIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>

      {/* Nội dung */}
      <CardContent sx={{ flex: 1, padding: "16px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📌 {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ⏰ {duration}
        </Typography>
        <Button variant="outlined" size="small" sx={{ marginTop: "8px" }}>
          Nhận vé
        </Button>
      </CardContent>
    </Card>
  );
};

MovieCardItem.propTypes = {
  title: PropTypes.string.isRequired,  
  category: PropTypes.string.isRequired, 
  duration: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired,  
};

export default MovieCardItem;
