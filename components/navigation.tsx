"use client";

import { useState } from "react";
import { FloatNavbar } from "./navbar/float-navbar";
import { Navbar } from "./navbar/navbar";

export const Navigation = ({
  isFloating,
  isNavbar,
  isAdmin,
}: {
  isFloating?: boolean;
  isNavbar?: boolean;
  isAdmin?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (isFloating) {
    return <FloatNavbar open={isOpen} onOpenChange={setIsOpen} />;
  }
  if (isNavbar) {
    return <Navbar open={isOpen} onOpenChange={setIsOpen} />;
  }
  return null;
};
