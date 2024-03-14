"use client";

import { LogoExpandIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const AccountsLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="flex w-full h-full bg-white dark:bg-black">
      <div className="w-56 flex flex-col justify-between border-r border-gray-500 dark:border-gray-300 items-center py-4 px-4 flex-none">
        <div className="flex flex-col gap-6 w-full">
          <Link
            href={"/"}
            className="w-full flex justify-start items-center group"
          >
            <Button
              variant={"ghost"}
              size={"icon"}
              className="flex mr-2 group-hover:bg-accent goup-hover:text-accent-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <LogoExpandIcon className="h-6" />
          </Link>
          <div className="w-full flex flex-col gap-2">
            <Link href={"/accounts/profile"}>
              <Button
                className={cn(
                  "w-full h-9 justify-start text-gray-900 dark:text-white",
                  pathname.includes("/accounts/profile")
                    ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                    : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                Pengaturan Akun
              </Button>
            </Link>
            <Link href={"/accounts/histories"}>
              <Button
                className={cn(
                  "w-full h-9 justify-start text-gray-900 dark:text-white",
                  pathname.includes("/accounts/histories")
                    ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                    : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                Riwayat
              </Button>
            </Link>
          </div>
        </div>
        <Button
          className="h-9 w-full justify-start rounded relative overflow-hidden border dark:border-white border-gray-500"
          onClick={onChangeTheme}
          variant={"ghost"}
        >
          <span className="w-5 h-5 mr-2">
            {theme === "light" && <Sun className="w-5 h-5" />}
            {theme === "dark" && <Moon className="w-5 h-5" />}
          </span>
          {theme}
        </Button>
      </div>
      <div className="w-full bg-gray-50 dark:*:bg-gray-900 h-full">
        {children}
      </div>
    </div>
  );
};

export default AccountsLayout;
