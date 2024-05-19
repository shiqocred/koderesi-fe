"use client";

import { formatNumber } from "@/lib/utils";
import { useCookies } from "next-client-cookies";

interface HeaderProps {
  title: string;
  description?: string;
  isAccount?: boolean;
}

export const Header = ({ title, description, isAccount }: HeaderProps) => {
  const cookies = useCookies();
  return (
    <div className="flex w-full justify-between md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
      <div className="flex flex-col">
        <h3 className="xl:text-xl text-lg font-bold">{title}</h3>
        <p className="font-light text-sm lg:text-base">{description}</p>
      </div>
      {!isAccount && (
        <div className="px-6 w-full md:w-auto flex flex-row items-center justify-between md:flex-col md:items-start bg-green-400 h-10 md:h-[50px] md:justify-center rounded-md">
          <p className="text-sm text-gray-900 leading-none">Kredit anda</p>
          <h3 className="font-bold text-sm lg:text-lg leading-none dark:text-gray-900">
            {formatNumber(parseFloat(cookies.get("totalCreadits") ?? "0"))}{" "}
            kredit
          </h3>
        </div>
      )}
    </div>
  );
};
