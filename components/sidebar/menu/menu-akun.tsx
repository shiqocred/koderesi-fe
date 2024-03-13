"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Headset,
  LogOut,
  Moon,
  MoreHorizontal,
  Rocket,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const MenuAkun = ({ isExpand }: { isExpand: boolean }) => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

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
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            className={cn(
              "flex group items-center leading-none h-10 bg-transparent text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md justify-between transition-all overflow-hidden",
              !isExpand
                ? "hover:rounded-[20px] text-green-400 border px-0 border-gray-900 dark:border-white"
                : "hover:px-1"
            )}
            initial="isShrink"
            animate={isExpand ? "isExpand" : "isShrink"}
            variants={buttonWidthVariant}
            transition={
              isExpand
                ? { delay: 0.5, duration: 0.5 }
                : { delay: 0, duration: 0.5 }
            }
          >
            <div
              className={cn(
                "gap-x-2 flex items-center justify-center w-full",
                isExpand && "justify-start"
              )}
            >
              <div
                className={cn(
                  "relative w-10 h-10  overflow-hidden rounded-md",
                  isExpand &&
                    "border border-gray-900 dark:border-white group-hover:w-8 group-hover:h-8 transition-all flex items-center justify-center text-green-400 "
                )}
              >
                <Image
                  src={"/avatar.webp"}
                  alt=""
                  priority
                  fill
                  className="object-cover"
                />
              </div>
              <motion.p
                initial="isShrink"
                animate={isExpand ? "isExpand" : "isShrink"}
                variants={buttonDisplayVariant}
                transition={
                  isExpand
                    ? { delay: 0.5, duration: 0.5 }
                    : { delay: 0, duration: 0.5 }
                }
                className="font-medium group-hover:text-xs transition-all"
              >
                Anthonio Nerf
              </motion.p>
            </div>
            <motion.div
              initial="isShrink"
              animate={isExpand ? "isExpand" : "isShrink"}
              variants={buttonDisplayVariant}
              transition={
                isExpand
                  ? { delay: 1, duration: 0.5 }
                  : { delay: 0, duration: 0.5 }
              }
              className="group-hover:px-2 transition-all"
            >
              <MoreHorizontal className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </PopoverTrigger>
        <PopoverContent
          className="p-2"
          side="right"
          align="end"
          sideOffset={25}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <div className="flex px-2 py-2">
                  <div className="h-10 w-10 relative overflow-hidden rounded-md mr-4">
                    <Image src="/avatar.webp" fill alt="" />
                  </div>
                  <div>
                    <h5 className="font-semibold">Jhon Dhoe</h5>
                    <p className="text-xs font-light">example@mail.com</p>
                  </div>
                </div>
                <CommandSeparator className="bg-gray-500 dark:bg-gray-400" />
                <div className="flex justify-between px-2 py-2 items-center">
                  <div className="flex items-center">
                    <Rocket className="w-4 h-4 mr-2" />
                    <p>Total Kredit</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-green-400 rounded text-gray-900">
                    3200 Kredit
                  </span>
                </div>
                <CommandSeparator className="bg-gray-500 dark:bg-gray-400" />
                <CommandItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </CommandItem>
                <CommandItem>
                  <Headset className="w-4 h-4 mr-2" />
                  Contact Support
                </CommandItem>
                <CommandSeparator className="bg-gray-500 dark:bg-gray-400" />
                <CommandItem className="text-red-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MenuAkun;
