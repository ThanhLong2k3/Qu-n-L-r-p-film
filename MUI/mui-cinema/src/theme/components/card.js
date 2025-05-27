const MuiProductCardOverrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: `0 4px 8px ${theme.palette.primary.main}`, 
        borderColor: theme.palette.primary.main, 
      },
    }),
  },
};

export default MuiProductCardOverrides;
