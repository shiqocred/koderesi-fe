"use client";

import AccountModal from "@/components/modals/account-modal";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Moon, MoreHorizontal, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const MenuAkun = ({ isExpand }: { isExpand: boolean }) => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();

  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  const buttonDisplayVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };

  const onChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <motion.button
        type="button"
        className={cn(
          "flex items-center leading-none h-10 bg-transparent hover:bg-gray-100 border dark:hover:bg-gray-700 border-gray-900 dark:border-white transition-all rounded-md text-xs font-medium",
          isExpand
            ? "px-4 gap-4 justify-start"
            : "hover:rounded-[20px] justify-center"
        )}
        initial="isShrink"
        animate={isExpand ? "isExpand" : "isShrink"}
        variants={buttonWidthVariant}
        transition={{ duration: 0.5 }}
        onClick={onChangeTheme}
      >
        <span className="w-5 h-5">
          {theme === "light" && <Sun className="w-5 h-5" />}
          {theme === "dark" && <Moon className="w-5 h-5" />}
        </span>
        <motion.p
          initial="isShrink"
          animate={isExpand ? "isExpand" : "isShrink"}
          variants={buttonDisplayVariant}
          transition={
            isExpand
              ? { delay: 0.5, duration: 0.5 }
              : { delay: 0, duration: 0.5 }
          }
          className="capitalize"
        >
          {theme}
        </motion.p>
      </motion.button>
      {/* sasda */}
      <AccountModal isExpand={isExpand} />
    </div>
  );
};

export default MenuAkun;
