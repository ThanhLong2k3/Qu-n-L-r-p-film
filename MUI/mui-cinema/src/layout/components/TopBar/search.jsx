import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef(null);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsExpanded(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={searchRef}
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: isExpanded ? "300px" : "40px",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      {!isExpanded && (
        <InputAdornment position="start">
          <IconButton
            onClick={handleFocus}
            sx={{
              padding: 0, // Loại bỏ padding để icon gần hơn
              ":hover": {
                backgroundColor: "transparent", 
              },
            }}
          >
            <SearchIcon sx={{ color: (theme) => theme.palette.primary.main }} />
          </IconButton>
        </InputAdornment>
      )}

      <TextField
        placeholder={isExpanded ? "Tìm kiếm..." : ""}
        variant="outlined"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={handleFocus}
                sx={{
                  padding: 0, 
                  ":hover": {
                    backgroundColor: "transparent", 
                  },
                }}
              >
                <SearchIcon
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    ":hover": {
                      color: (theme) => theme.palette.primary.dark, 
                    },
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onFocus={handleFocus}
        sx={{
          flexGrow: 1,
          opacity: isExpanded ? 1 : 0,
          transition: "opacity 0.7s ease",
          "& .MuiInputBase-input": {
            padding: isExpanded ? "7px" : "0px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
              borderColor: (theme) => theme.palette.primary.main,  
            },
            "&:hover": {
              borderColor: (theme) => theme.palette.primary.light, 
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.primary.main, 
            },
          },
        }}
      />
    </Box>
  );
};

export default Search;
