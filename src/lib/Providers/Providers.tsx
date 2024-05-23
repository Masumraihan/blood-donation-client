"use client";
import { ThemeProvider } from "@emotion/react";
import dynamic from "next/dynamic";
import theme from "../theme/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";

const HotToaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <HotToaster />
          {children}
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default Providers;
