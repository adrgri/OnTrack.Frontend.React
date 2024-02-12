import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, CssBaseline } from "@mui/material";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          py: 2,
          px: {
            xs: 1, // smaller padding on extra-small screens
            sm: 3, // smaller padding on small screens
            lg: 10, // larger padding on small screens and above
          },
          overflow: "auto",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
