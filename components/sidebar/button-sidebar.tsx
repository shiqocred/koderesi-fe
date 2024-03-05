import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  label: string;
  href: string;
  icon: ReactNode;
  expand?: boolean;
  active?: boolean;
}

export const ButtonSidebar = ({
  label,
  href,
  icon,
  expand,
  active,
}: SidebarButtonProps) => {
  return (
    <Link href={href} className="relative flex justify-center group">
      {active && (
        <span className="absolute -top-[3px] w-4 h-[6px] bg-green-400 rounded-[3px] group-hover:w-[6px] transition-all" />
      )}
      <Button
        className={cn(
          "flex items-center leading-none w-10 h-10 bg-transparent hover:bg-gray-100 group-hover:rounded-[20px] transition-all",
          active && "bg-gray-100 group-hover:bg-gray-200"
        )}
      >
        <span className="w-5 h-5 stroke-gray-900">{icon}</span>
        {expand && label}
      </Button>
    </Link>
  );
};
