import { Box } from "@mui/material";
import FooterHeader from "./FooterHeader";
import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#000", color: "white" }}>
      <FooterHeader />
      <FooterContent />
      <FooterBottom />
    </Box>
  );
};

export default Footer;
