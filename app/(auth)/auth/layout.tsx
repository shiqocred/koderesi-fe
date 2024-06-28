import React, { ReactNode } from "react";
import { TopNav } from "./_component/top-nav";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center items-center relative px-3 md:px-5">
      {children}
    </div>
  );
};

export default AuthLayout;
