import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <div className="loadingWrapper">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        direction="column"
      >
        <CircularProgress size="150px" color="inherit" />
      </Box>
    </div>
  );
};
