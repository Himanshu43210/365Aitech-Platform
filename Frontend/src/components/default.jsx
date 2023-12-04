import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const DefaultPage = ({ currentPage }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" component="h2">
        {currentPage}
      </Typography>
    </Box>
  );
};

export default DefaultPage;
