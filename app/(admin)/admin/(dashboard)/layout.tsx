import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { DM_Sans } from "next/font/google";
import React, { ReactNode } from "react";

const font = DM_Sans({ subsets: ["latin"] });

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={cn(
        "w-full bg-white h-full flex lg:flex-row flex-col text-gray-900 dark:text-white ",
        font.className
      )}
    >
      <Sidebar isAdmin />
      <Navigation isFloating isAdmin />
      <div className="w-full lg:overflow-x-hidden lg:overflow-y-scroll bg-gray-50 dark:bg-gray-950 h-full">
        <Navigation isNavbar isAdmin />
        {children}
      </div>
    </main>
  );
};

export default AdminDashboardLayout;
