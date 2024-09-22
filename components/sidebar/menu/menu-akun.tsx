"use client";

import AccountModal from "@/components/modals/account-modal";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Headset, LogOut, Moon, MoreHorizontal, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonSidebar } from "../button-sidebar";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

const MenuAkun = ({
  isExpand,
  isAdmin,
  pathname,
}: {
  pathname: string;
  isExpand: boolean;
  isAdmin?: boolean;
}) => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const cookies = useCookies();
  const router = useRouter();
  const { onOpen } = useModal();

  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  const buttonDisplayVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };

  const buttonOpacityVariant = {
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

  const handleLogOut = async () => {
    try {
      await axios.post(
        "https://koderesi.raventech.my.id/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      toast.success("Logout berhasil");
      cookies.remove("accessToken");
      router.push("/auth/login");
    } catch (error) {
      console.log("ERROR_LOGOUT");
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
      <Link
        href={isAdmin ? "/admin/account" : "/account"}
        className="relative flex justify-center w-full group"
      >
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
              className="font-medium group-hover:text-xs transition-all capitalize"
            >
              {cookies.get("nameProfile")}
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
      </Link>
      <Separator className="bg-gray-500 dark:bg-white" />
      <motion.button
        type="button"
        className={cn(
          "flex items-center leading-none h-10 bg-transparent hover:bg-red-50 dark:hover:bg-red-700/30  transition-all text-sm font-medium rounded-md text-red-500",
          isExpand
            ? "justify-start px-4 gap-4"
            : "justify-center hover:rounded-[20px]"
        )}
        onClick={handleLogOut}
        initial="isShrink"
        animate={isExpand ? "isExpand" : "isShrink"}
        variants={buttonWidthVariant}
        transition={{ duration: 0.5 }}
      >
        <span className="w-5 h-5 stroke-gray-900 dark:stroke-white">
          <LogOut className="w-5 h-5" />
        </span>
        <motion.p
          initial="isShrink"
          animate={isExpand ? "isExpand" : "isShrink"}
          variants={buttonOpacityVariant}
          transition={
            isExpand
              ? { delay: 0.5, duration: 0.5 }
              : { delay: 0, duration: 0.5 }
          }
        >
          Logout
        </motion.p>
      </motion.button>
    </div>
  );
};

export default MenuAkun;
