const MuiOutlinedInputOverrides = {
  root: ({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
    borderRadius: '20px', 
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light, 
    },
    // Viền khi focus
    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.dark,
      borderWidth: '1px',
    },
  }),
};

export default MuiOutlinedInputOverrides;
