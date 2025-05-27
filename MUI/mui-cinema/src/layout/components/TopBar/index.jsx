import Box from "@mui/material/Box";
import Logo from "./logo";
import Search from "./search";
import Login from "./login";
import Menu from "./menu";
import { TOP_BAR_HEIGHT } from "../../config";
import ModeSelect from "../../../components/ModeSelect/ModeSelect";

const TopBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 5,
        height: TOP_BAR_HEIGHT,
        color: "#fff", // Màu chữ
        position: "absolute", 
        top: 0,
        left: 0,
        zIndex: 10, 
      }}
    >
      <Logo />
      <Menu />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Search />
        <Login />
        <ModeSelect />
      </Box>
    </Box>
  );
};

export default TopBar;
