"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal";
import { formatNumber } from "@/lib/utils";
import { Plus, Rocket } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import React from "react";

export const TopClientDashboard = () => {
  const { onOpen } = useModal();
  const cookies = useCookies();
  return (
    <div className="w-full transition-all flex flex-col md:flex-row gap-4 xl:gap-8">
      <Card className="w-full lg:w-2/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center shadow">
        <div>
          <h3 className="text-base md:text-xl font-bold">Lacak Resi Anda!</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
            Silahkan masukan resi anda
          </p>
        </div>
        <Button
          className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
          variant={"outline"}
          onClick={() => onOpen("add-resi")}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </Card>
      <Card className="w-full lg:w-3/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center shadow">
        <div>
          <h3 className="text-base md:text-xl font-bold">Kredit Habis?</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
            Top up kredit anda sekarang juga!
          </p>
        </div>
        <div className="flex items-center">
          <div className="px-6 lg:flex hidden flex-col items-center bg-green-400 h-[50px] justify-center rounded-l-md">
            <h3 className="font-bold text-lg leading-none dark:text-gray-900">
              {formatNumber(parseFloat(cookies.get("totalCreadits") ?? "0"))}{" "}
              kredit
            </h3>
            <p className="text-xs text-gray-900">Total kredit anda</p>
          </div>
          <Link href={"/top-up"}>
            <Button
              className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
              variant={"outline"}
            >
              <Rocket className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
