"use client";

import { formatNumber } from "@/lib/utils";
import { useCookies } from "next-client-cookies";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  description?: string;
  isAccount?: boolean;
  href?: string;
}

export const Header = ({
  title,
  description,
  isAccount,
  href,
}: HeaderProps) => {
  const cookies = useCookies();
  return (
    <div className="flex w-full justify-between md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
      <div className="flex gap-2 items-center">
        {href && (
          <Link
            href={href}
            className="w-10 h-10 p-0 bg-transparent flex justify-center items-center hover:bg-transparent text-black dark:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">{title}</h3>
          <p className="font-light text-sm lg:text-base">{description}</p>
        </div>
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
