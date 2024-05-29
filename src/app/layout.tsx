import Providers from "@/lib/Providers/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const HotToast = dynamic(() => import("react-hot-toast"), {
    ssr: false,
  }) as React.ComponentType<any>;

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <HotToast />
          <AppRouterCacheProvider>{children} </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
