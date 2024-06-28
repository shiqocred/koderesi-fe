import React from "react";
import { ButtonSidebar } from "../button-sidebar";
import { AffiliateIcon, RocketIcon } from "@/components/svg";
import { Headset } from "lucide-react";

interface MenuBawahProps {
  isExpand: boolean;
  pathname: string;
  isAdmin?: boolean;
}

const MenuBawah = ({ pathname, isExpand, isAdmin }: MenuBawahProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {!isAdmin && (
        <ButtonSidebar
          label="Top up"
          icon={<RocketIcon className="w-5 h-5" />}
          href="/top-up"
          active={pathname.startsWith("/top-up")}
          expand={isExpand}
        />
      )}
      <ButtonSidebar
        label="Affiliate"
        icon={<AffiliateIcon className="w-5 h-5" />}
        href={isAdmin ? "/admin/affiliate" : "/affiliate"}
        active={pathname.startsWith(
          !isAdmin ? "/affiliate" : "/admin/affiliate"
        )}
        expand={isExpand}
      />
    </div>
  );
};

export default MenuBawah;
