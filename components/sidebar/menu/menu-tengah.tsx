"use client";

import React from "react";
import { ButtonSidebar } from "../button-sidebar";
import { ArchiveIcon, HomeIcon, TrackIcon } from "@/components/svg";

interface MenuTengahProps {
  isExpand: boolean;
  pathname: string;
}

const MenuTengah = ({ pathname, isExpand }: MenuTengahProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ButtonSidebar
        label="Dashboard"
        icon={<HomeIcon className="w-5 h-5" />}
        href="/dashboard"
        active={pathname.startsWith("/dashboard")}
        expand={isExpand}
      />
      <ButtonSidebar
        label="Lacak"
        icon={<TrackIcon className="w-5 h-5" />}
        href="/tracks"
        active={pathname.startsWith("/tracks")}
        expand={isExpand}
      />
      <ButtonSidebar
        label="Arsip"
        icon={<ArchiveIcon className="w-5 h-5" />}
        href="/archives"
        active={pathname.startsWith("/archives")}
        expand={isExpand}
      />
    </div>
  );
};

export default MenuTengah;
