import { Box, LinearProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export const OverLayLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
};
