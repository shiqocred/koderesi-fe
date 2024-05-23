"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoExpandIcon } from "@/components/svg";

export const TopNav = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
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
    <div className="flex justify-between items-center w-full border-b border-gray-500  pb-4">
      <div className="flex gap-2 items-center w-full ">
        <Link href={"/admin"}>
          <Button variant={"ghost"} size={"icon"}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex w-full  flex-col items-start gap-1">
          <Link href={"/admin"}>
            <LogoExpandIcon className="h-8" />
          </Link>
          <p className="font-light text-sm lg:text-base">Contact Support</p>
        </div>
      </div>
      <Button
        className="h-9 w-9 md:w-auto flex-none justify-center md:justify-start rounded relative overflow-hidden border dark:border-white border-gray-500"
        onClick={onChangeTheme}
        variant={"ghost"}
      >
        <span className="w-5 h-5 md:mr-2">
          {theme === "light" && <Sun className="w-5 h-5" />}
          {theme === "dark" && <Moon className="w-5 h-5" />}
        </span>
        <span className="hidden md:flex">{theme}</span>
      </Button>
    </div>
  );
};