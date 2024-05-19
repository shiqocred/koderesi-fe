"use client";

import { Archive, ArrowDown } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal";
import { TooltipProviderPage } from "@/providers/tooltip-provider-page";

interface ResiCardProps {
  id: string;
  kode_resi: string;
  keterangan: string;
  kode_kurir: string;
  status: string;
  shipper: string;
  receiver: string;
  last_manifest: {
    manifest: string;
    date: string;
  };
  owner?: string;
  isDashboard?: boolean;
  layout?: string;
  isAdmin?: boolean;
}

export const ResiCard = ({
  kode_resi,
  id,
  keterangan,
  kode_kurir,
  shipper,
  receiver,
  last_manifest,
  status,
  isDashboard,
  owner,
  layout = "list",
  isAdmin = false,
}: ResiCardProps) => {
  const { onOpen } = useModal();
  return (
    <Card className="border w-full border-green-200 dark:border-green-200/40 p-2 md:p-4 space-y-2 md:space-y-4 text-xs xl:text-sm font-light">
      <div className="mt-1">
        <span className="px-2 py-1 bg-green-200 dark:bg-green-300 rounded-sm xl:text-sm text-xs text-gray-900 capitalize">
          {isAdmin ? owner : receiver} / {keterangan}
        </span>
      </div>
      <div
        className={cn(
          "flex ",
          layout === "list"
            ? "justify-between lg:flex-row items-start lg:items-center flex-col gap-4 lg:gap-0"
            : "flex-col gap-4 items-start"
        )}
      >
        <div
          className={cn(
            "flex w-full",
            layout === "list"
              ? "lg:gap-10 xl:gap-16 md:flex-row flex-col items-start md:items-center gap-4 md:gap-8 "
              : "gap-4 flex-col"
          )}
        >
          <div className="w-full lg:w-52">
            <Link href={isAdmin ? `/admin/tracks/${id}` : `/tracks/${id}`}>
              <h3 className="xl:text-lg text-base font-bold hover:underline">
                {kode_resi}
              </h3>
            </Link>
            <p className="text-gray-500 dark:text-gray-300">{kode_kurir}</p>
          </div>
          <div
            className={cn(
              "flex md:flex-row flex-col w-full",
              layout === "list" ? "md:gap-10 xl:gap-16 gap-4" : "gap-4 md:gap-8"
            )}
          >
            <div
              className={cn(
                "relative flex flex-col justify-center overflow-hidden whitespace-nowrap",
                layout === "grid" ? "w-full pr-4" : "w-full md:w-52 pr-4"
              )}
            >
              <p className="pr-1 capitalize py-1 px-2 w-full overflow-hidden text-ellipsis">
                {shipper}
              </p>
              <Separator className="bg-gray-300 dark:bg-gray-400" />
              <p className="pr-1 capitalize py-1 px-2 w-full overflow-hidden text-ellipsis">
                {receiver}
              </p>
              <div className="text-gray-500 absolute right-0 dark:text-gray-300">
                <ArrowDown className="w-3 h-3" />
              </div>
            </div>
            {!isDashboard && (
              <div
                className={cn(
                  "relative flex flex-col justify-center overflow-hidden whitespace-nowrap",
                  layout === "grid" ? "w-full pr-4" : "w-full md:w-52"
                )}
              >
                <div className="capitalize py-1 px-2 overflow-hidden text-ellipsis">
                  {last_manifest?.manifest}
                </div>
                <Separator className="bg-gray-300" />
                <div className="capitalize py-1 px-2 overflow-hidden text-ellipsis">
                  {format(
                    new Date(last_manifest.date),
                    "dd MMM yyyy - HH:mm:ss",
                    { locale: indonesia }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full gap-x-4 justify-end">
          <div
            className={cn(
              "h-8 flex items-center justify-center rounded capitalize text-sm text-gray-900",
              status === "on-progress" && "bg-yellow-300",
              status === "delivered" && "bg-green-300",
              layout === "grid" ? "w-full" : "lg:w-28 w-full"
            )}
          >
            {status === "on-progress" ? "on progress" : status}
          </div>
          {!isAdmin && (
            <TooltipProviderPage text="Arsipkan">
              <Button
                className="h-8 w-8 p-0 flex-none border border-gray-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 dark:bg-gray-700 dark:text-gray-300 text-gray-700 flex items-center justify-center"
                onClick={() => onOpen("archive-resi", id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            </TooltipProviderPage>
          )}
        </div>
      </div>
    </Card>
  );
};
