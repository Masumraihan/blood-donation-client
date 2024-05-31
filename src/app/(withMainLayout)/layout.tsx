import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Box } from "@mui/material";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar>
        <Box sx={{ minHeight: "calc(100vh - 280px)" }}>{children}</Box>
      </Navbar>
      <Footer />
    </>
  );
};

export default MainLayout;
