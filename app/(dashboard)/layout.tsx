import { Sidebar } from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full bg-white flex h-full">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
};

export default DashboardLayout;
