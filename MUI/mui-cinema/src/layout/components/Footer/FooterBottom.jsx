import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FooterBottom = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 6,
        pt: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color={theme.palette.text.secondary}>
        © Bản quyền 2023 bởi Ovatheme.com
      </Typography>
    </Box>
  );
};

export default FooterBottom;
