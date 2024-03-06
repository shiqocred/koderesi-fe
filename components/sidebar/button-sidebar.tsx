"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarButtonProps {
  label: string;
  href: string;
  icon: ReactNode;
  expand?: boolean;
  active?: boolean;
}

export const ButtonSidebar = ({
  label,
  href,
  icon,
  expand,
  active,
}: SidebarButtonProps) => {
  // button width variant
  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  // button opacity variant
  const buttonOpacityVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };
  return (
    <Link href={href} className="relative flex justify-center w-full group">
      {active && (
        <span
          className={cn(
            "absolute bg-green-400 rounded-[3px] group-hover:w-[6px] transition-all",
            expand ? "top-3 h-4 w-[6px] -left-[3px]" : "-top-[3px] w-4 h-[6px]"
          )}
        />
      )}
      <motion.button
        type="button"
        className={cn(
          "flex items-center leading-none h-10 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700  transition-all text-sm font-medium rounded-md",
          active &&
            "bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
          expand
            ? "justify-start px-4 gap-4"
            : "justify-center group-hover:rounded-[20px]"
        )}
        initial="isShrink"
        animate={expand ? "isExpand" : "isShrink"}
        variants={buttonWidthVariant}
        transition={{ duration: 0.5 }}
      >
        <span className="w-5 h-5 stroke-gray-900 dark:stroke-white">
          {icon}
        </span>
        <motion.p
          initial="isShrink"
          animate={expand ? "isExpand" : "isShrink"}
          variants={buttonOpacityVariant}
          transition={
            expand ? { delay: 0.5, duration: 0.5 } : { delay: 0, duration: 0.5 }
          }
        >
          {label}
        </motion.p>
      </motion.button>
    </Link>
  );
};
