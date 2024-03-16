"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Headset,
  HeartHandshake,
  HomeIcon,
  LogOut,
  Menu,
  Moon,
  Plus,
  Rocket,
  Sun,
  Truck,
  User,
} from "lucide-react";
import { ArchiveIcon, LogoExpandIcon } from "../svg";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { ButtonSidebar } from "../sidebar/button-sidebar";
import { useTheme } from "next-themes";
import { useModal } from "@/hooks/use-modal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import AccountModal from "../modals/account-modal";

export const IsiNavbar = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { onOpen } = useModal();
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
      <div className="flex gap-2 items-center">
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button
              className="p-0 h-9 w-9 rounded dark:bg-transparent dark:hover:bg-gray-800"
              variant={"ghost"}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetTitle>Navigasi</SheetTitle>
            <div className="py-8 gap-4 flex flex-col">
              <Button
                className="flex items-center leading-none h-10 bg-green-400 hover:bg-green-500 transition-all rounded-md justify-center text-xs font-medium dark:text-gray-900"
                onClick={() => {
                  onOpen("add-resi");
                  onOpenChange(false);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="pr-3">Tambah Resi</span>
              </Button>
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
          </SheetContent>
        </Sheet>
        <LogoExpandIcon className="h-6" />
      </div>
      <div className="flex gap-2 items-center">
        <Button
          className="p-0 h-9 w-9 rounded relative overflow-hidden"
          onClick={onChangeTheme}
          variant={"ghost"}
        >
          <span className="w-5 h-5">
            {theme === "light" && <Sun className="w-5 h-5" />}
            {theme === "dark" && <Moon className="w-5 h-5" />}
          </span>
        </Button>
        <AccountModal />
      </div>
    </>
  );
};
