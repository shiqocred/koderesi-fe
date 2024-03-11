"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  HeartHandshake,
  HomeIcon,
  Menu,
  Moon,
  Rocket,
  Sun,
  Truck,
} from "lucide-react";
import { ArchiveIcon, LogoExpandIcon } from "../svg";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { ButtonSidebar } from "../sidebar/button-sidebar";
import { useTheme } from "next-themes";

export const IsiNavbar = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
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
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            className="p-0 h-10 w-10 rounded dark:bg-transparent dark:hover:bg-gray-800"
            variant={"outline"}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetTitle>Navigasi</SheetTitle>
          <div className="py-8 gap-4 flex flex-col">
            <ButtonSidebar
              label="Dashboard"
              icon={<HomeIcon className="w-5 h-5" />}
              href="/dashboard"
              active={pathname.startsWith("/dashboard")}
              expand
              onClick={() => onOpenChange(false)}
            />
            <ButtonSidebar
              label="Lacak"
              icon={<Truck className="w-5 h-5" />}
              href="/tracks"
              active={pathname.startsWith("/tracks")}
              expand
              onClick={() => onOpenChange(false)}
            />
            <ButtonSidebar
              label="Arsip"
              icon={<ArchiveIcon className="w-5 h-5" />}
              href="/archives"
              active={pathname.startsWith("/archives")}
              expand
              onClick={() => onOpenChange(false)}
            />
            <Separator className="bg-gray-500 dark:bg-white/50" />
            <ButtonSidebar
              label="Top up"
              icon={<Rocket className="w-5 h-5" />}
              href="/top-up"
              active={pathname.startsWith("/top-up")}
              expand
              onClick={() => onOpenChange(false)}
            />
            <ButtonSidebar
              label="Affiliate"
              icon={<HeartHandshake className="w-5 h-5" />}
              href="/affiliate"
              active={pathname.startsWith("/affiliate")}
              expand
              onClick={() => onOpenChange(false)}
            />
          </div>
          <button
            type="button"
            className="flex items-center leading-none h-10 bg-transparent hover:bg-gray-100 border dark:hover:bg-gray-700 border-gray-900 dark:border-white transition-all rounded-md text-xs font-medium px-4 gap-4 justify-start"
            onClick={onChangeTheme}
          >
            <span className="w-5 h-5">
              {theme === "light" && <Sun className="w-5 h-5" />}
              {theme === "dark" && <Moon className="w-5 h-5" />}
            </span>
            <p className="capitalize">{theme}</p>
          </button>
        </SheetContent>
      </Sheet>
      <LogoExpandIcon className="h-6" />
      <Button className="p-0 h-10 w-10 rounded border-gray-900 border hover:border-green-400 relative overflow-hidden">
        <Image src="/avatar.webp" alt="" fill className="object-cover" />
      </Button>
    </>
  );
};
