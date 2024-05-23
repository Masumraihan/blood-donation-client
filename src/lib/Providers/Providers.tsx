"use client";
import { ThemeProvider } from "@emotion/react";
import dynamic from "next/dynamic";
import theme from "../theme/theme";

const HotToaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HotToaster />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
