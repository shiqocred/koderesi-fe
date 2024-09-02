"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Coins,
  Headset,
  HeartHandshake,
  HomeIcon,
  LogOut,
  Menu,
  Moon,
  Plus,
  Rocket,
  Settings,
  Sparkles,
  Sun,
  Truck,
  User,
  Users,
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
import Link from "next/link";

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
            {pathname.startsWith("/admin") ? (
              <div className="py-8 gap-4 flex flex-col">
                <ButtonSidebar
                  label="Dashboard"
                  icon={<HomeIcon className="w-5 h-5" />}
                  href="/admin/dashboard"
                  active={pathname.startsWith("/admin/dashboard")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <ButtonSidebar
                  label="Lacak"
                  icon={<Truck className="w-5 h-5" />}
                  href="/admin/tracks"
                  active={pathname.startsWith("/admin/tracks")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <ButtonSidebar
                  label="Pengguna"
                  icon={<Users className="w-5 h-5" />}
                  href="/admin/users"
                  active={pathname.startsWith("/admin/users")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <ButtonSidebar
                  label="Kredit"
                  icon={<Sparkles className="w-5 h-5" />}
                  href="/admin/credits"
                  active={pathname.startsWith("/admin/credits")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <ButtonSidebar
                  label="Transaksi"
                  icon={<Coins className="w-5 h-5" />}
                  href="/admin/transactions"
                  active={pathname.startsWith("/admin/transactions")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <Separator className="bg-gray-500 dark:bg-white/50" />
                <ButtonSidebar
                  label="Affiliate"
                  icon={<HeartHandshake className="w-5 h-5" />}
                  href="/admin/affiliate"
                  active={pathname.startsWith("/admin/affiliate")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <Separator className="bg-gray-500 dark:bg-white/50" />
                <ButtonSidebar
                  label="Contact Service"
                  icon={<Headset className="w-5 h-5" />}
                  href="/admin/contacts"
                  active={pathname.startsWith("/admin/contacts")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
                <ButtonSidebar
                  label="Settings"
                  icon={<Settings className="w-5 h-5" />}
                  href="/admin/settings"
                  active={pathname.startsWith("/admin/settings")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
              </div>
            ) : (
              <div className="py-8 gap-4 flex flex-col">
                <Button
                  className="flex items-center leading-none h-10 bg-green-400 hover:bg-green-500 transition-all rounded-md justify-center text-xs font-medium text-gray-900"
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
                <Separator className="bg-gray-500 dark:bg-white/50" />
                <ButtonSidebar
                  label="Contact Service"
                  icon={<Headset className="w-5 h-5" />}
                  href="/contacts"
                  active={pathname.startsWith("/contacts")}
                  expand
                  onClick={() => onOpenChange(false)}
                />
              </div>
            )}
          </SheetContent>
        </Sheet>
        <Link href={pathname.includes("admin") ? "/admin" : "/"}>
          <LogoExpandIcon className="h-6" />
        </Link>
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
