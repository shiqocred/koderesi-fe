"use client";

import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { MenuAkun, MenuAtas, MenuBawah, MenuTengah } from "./menu";
import { ChevronRightIcon } from "../svg";

import { MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonSidebar } from "./button-sidebar";
import { Headset, Settings } from "lucide-react";

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar = ({ isAdmin = false }: SidebarProps) => {
  const pathname = usePathname();
  const [isExpand, setIsExpand] = useState<boolean>(false);

  // animasi sidebar-width
  const sidebarWidthVariant = {
    isExpand: { width: 265.95 },
    isShrink: { width: 67.575 },
  };

  // animasi sidebar-width
  const sidebarToggleVariant = {
    isExpand: { rotate: 180 },
    isShrink: { rotate: 0 },
  };

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <motion.div
        className={cn(
          "h-full lg:flex flex-col justify-between items-center bg-white dark:bg-gray-900 border-gray-500 border-r py-4 hidden relative",
          isExpand ? "px-4" : "px-2"
        )}
        initial="isShrink"
        animate={isExpand ? "isExpand" : "isShrink"}
        variants={sidebarWidthVariant}
      >
        <motion.button
          type="button"
          className={cn(
            "bg-green-400 w-6 h-6 flex items-center  z-50 justify-center rounded-full outline-2 outline outline-white dark:outline-gray-900 absolute -right-3",
            isAdmin ? "top-[60px]" : "top-[116px]"
          )}
          initial="isShrink"
          animate={isExpand ? "isExpand" : "isShrink"}
          variants={sidebarToggleVariant}
          onClick={() => setIsExpand(!isExpand)}
        >
          <ChevronRightIcon className="w-4 h-4 stroke-white dark:stroke-gray-900 stroke-2" />
        </motion.button>
        <div className="flex flex-col gap-4 items-center w-full">
          <MenuAtas isExpand={isExpand} isAdmin={isAdmin} />
          <Separator className="bg-gray-500 dark:bg-white" />
          <MenuTengah
            pathname={pathname}
            isExpand={isExpand}
            isAdmin={isAdmin}
          />
          <Separator className="bg-gray-500 dark:bg-white" />
          <MenuBawah
            pathname={pathname}
            isExpand={isExpand}
            isAdmin={isAdmin}
          />
          <Separator className="bg-gray-500 dark:bg-white" />
          <ButtonSidebar
            label="Contact Support"
            icon={<Headset className="w-5 h-5" />}
            href={isAdmin ? "/admin/contacts" : "/contacts"}
            active={pathname.startsWith(
              !isAdmin ? "/contacts" : "/admin/contacts"
            )}
            expand={isExpand}
          />
          {isAdmin && (
            <ButtonSidebar
              label="Settings"
              icon={<Settings className="w-5 h-5" />}
              href={"/admin/settings"}
              active={pathname.startsWith("/admin/settings")}
              expand={isExpand}
            />
          )}
        </div>
        <div className="w-full">
          <MenuAkun isExpand={isExpand} isAdmin={isAdmin} pathname={pathname} />
        </div>
      </motion.div>
    </MotionConfig>
  );
};
