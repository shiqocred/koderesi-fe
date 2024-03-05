import React from "react";
import { ButtonSidebar } from "../button-sidebar";
import { AffiliateIcon, RocketIcon } from "@/components/svg";

interface MenuBawahProps {
  isExpand: boolean;
  pathname: string;
}

const MenuBawah = ({ pathname, isExpand }: MenuBawahProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ButtonSidebar
        label="Top up"
        icon={<RocketIcon className="w-5 h-5" />}
        href="/top-up"
        active={pathname.startsWith("/top-up")}
        expand={isExpand}
      />
      <ButtonSidebar
        label="Affiliate"
        icon={<AffiliateIcon className="w-5 h-5" />}
        href="/affiliate"
        active={pathname.startsWith("/affiliate")}
        expand={isExpand}
      />
    </div>
  );
};

export default MenuBawah;
