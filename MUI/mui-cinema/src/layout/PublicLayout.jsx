import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import TopBar from "../layout/components/TopBar/index";
import Footer from "./components/Footer/index";

const PublicLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", 
        position: "relative", 
        overflow: "hidden", 
      }}
    >
      <TopBar />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <main>
          <Outlet />
        </main>
      </Box>
      <Footer/>
    </Box>
  );
};

export default PublicLayout;
