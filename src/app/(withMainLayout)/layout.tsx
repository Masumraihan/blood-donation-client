import Footer from "@/components/shared/Footer/Footer";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const NoSSRNavbar = dynamic(() => import("@/components/shared/Navbar/Navbar"));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NoSSRNavbar>
        <Box sx={{ minHeight: "calc(100vh - 280px)" }}>{children}</Box>
      </NoSSRNavbar>
      <Footer />
    </>
  );
};

export default MainLayout;
