import { cn } from "@/lib/utils";
import { Navigation } from "./components/navigation";
import { DM_Sans } from "next/font/google";
import { ReactNode } from "react";

const font = DM_Sans({ subsets: ["latin"] });

const AccountsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full min-h-screen h-auto bg-white dark:bg-gray-900",
        font.className
      )}
    >
      <Navigation />
      <div className="w-full bg-gray-50 dark:bg-black min-h-screen h-auto">
        {children}
      </div>
    </div>
  );
};

export default AccountsLayout;
