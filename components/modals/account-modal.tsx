"use client";
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
import Link from "next/link";
import Image from "next/image";
import { Headset, LogOut, Rocket, User, MoreHorizontal } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const AccountModal = ({ isExpand }: { isExpand?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1100px)");
  const pathname = usePathname();

  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  const buttonDisplayVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {isDesktop ? (
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
        ) : (
          <Button className="p-0 h-9 w-9 rounded border-gray-900 border hover:border-green-400 relative overflow-hidden">
            <Image src="/avatar.webp" alt="" fill className="object-cover" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="p-2"
        side={isDesktop ? "right" : "bottom"}
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
              <Link
                href={
                  pathname.includes("admin")
                    ? "/admin/accounts/profile"
                    : "/accounts/profile"
                }
              >
                <CommandItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </CommandItem>
              </Link>
              <Link
                href={
                  pathname.includes("admin") ? "/admin/contacts" : "/contacts"
                }
              >
                <CommandItem>
                  <Headset className="w-4 h-4 mr-2" />
                  Contact Support
                </CommandItem>
              </Link>
              <CommandSeparator className="bg-gray-500 dark:bg-gray-400" />
              <CommandItem className="text-red-500 aria-selected:text-red-500">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AccountModal;
