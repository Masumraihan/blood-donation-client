import React from "react";
import DashboardSidebar from "./components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardSidebar>{children}</DashboardSidebar>;
};

export default DashboardLayout;
