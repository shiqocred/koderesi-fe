"use client";

import { Dispatch, SetStateAction } from "react";
import { IsiNavbar } from "./isi-navbar";

export const Navbar = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="border-b w-full bg-white dark:bg-gray-900 h-14 px-8 flex md:hidden justify-between items-center">
      <IsiNavbar open={open} onOpenChange={onOpenChange} />
    </div>
  );
};
