"use client";

import React from "react";
import { ButtonSidebar } from "../button-sidebar";
import { ArchiveIcon, HomeIcon, TrackIcon } from "@/components/svg";
import { Coins, Sparkles, Users } from "lucide-react";

interface MenuTengahProps {
  isExpand: boolean;
  pathname: string;
  isAdmin?: boolean;
}

const MenuTengah = ({ pathname, isExpand, isAdmin }: MenuTengahProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ButtonSidebar
        label="Dashboard"
        icon={<HomeIcon className="w-5 h-5" />}
        href={isAdmin ? "/admin/dashboard" : "/dashboard"}
        active={pathname.startsWith(
          !isAdmin ? "/dashboard" : "/admin/dashboard"
        )}
        expand={isExpand}
      />
      <ButtonSidebar
        label="Lacak"
        icon={<TrackIcon className="w-5 h-5" />}
        href={isAdmin ? "/admin/tracks" : "/tracks"}
        active={
          pathname.startsWith(!isAdmin ? "/tracks" : "/admin/tracks") ||
          pathname.startsWith("/admin/check-resi")
        }
        expand={isExpand}
      />
      {!isAdmin ? (
        <ButtonSidebar
          label="Arsip"
          icon={<ArchiveIcon className="w-5 h-5" />}
          href="/archives"
          active={pathname.startsWith("/archives")}
          expand={isExpand}
        />
      ) : (
        <>
          <ButtonSidebar
            label="Pengguna"
            icon={<Users className="w-5 h-5" />}
            href="/admin/users"
            active={pathname.startsWith("/admin/users")}
            expand={isExpand}
          />
          <ButtonSidebar
            label="Kredit"
            icon={<Sparkles className="w-5 h-5" />}
            href="/admin/credits"
            active={pathname.startsWith("/admin/credits")}
            expand={isExpand}
          />
          <ButtonSidebar
            label="Transaksi"
            icon={<Coins className="w-5 h-5" />}
            href="/admin/transactions"
            active={pathname.startsWith("/admin/transactions")}
            expand={isExpand}
          />
        </>
      )}
    </div>
  );
};

export default MenuTengah;
