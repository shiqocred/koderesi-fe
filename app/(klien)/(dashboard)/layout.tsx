import { FloatNavbar } from "@/components/navbar/float-navbar";
import { Navbar } from "@/components/navbar/navbar";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { DM_Sans } from "next/font/google";
import React, { ReactNode } from "react";

const font = DM_Sans({ subsets: ["latin"] });

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={cn(
        "w-full bg-white h-full flex md:flex-row flex-col text-gray-900 dark:text-white ",
        font.className
      )}
    >
      <Sidebar />
      <Navigation isFloating />
      <div className="w-full md:overflow-x-hidden md:overflow-y-scroll h-full bg-gray-50 dark:bg-gray-950">
        <Navigation isNavbar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
