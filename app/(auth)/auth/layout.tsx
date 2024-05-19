import React, { ReactNode } from "react";
import { TopNav } from "./_component/top-nav";
import { AuroraBackground } from "@/components/ui/aurora";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuroraBackground>
      <div className="w-full h-full flex justify-center items-center relative px-3 md:px-5">
        <TopNav />
        {children}
      </div>
    </AuroraBackground>
  );
};

export default AuthLayout;
