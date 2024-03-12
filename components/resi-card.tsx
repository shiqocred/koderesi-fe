"use client";
import { ArrowDown, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ResiCardProps {
  id: string;
  kode_resi: string;
  keterangan: string;
  kode_kurir: string;
  status: string;
  shipper: { nama: string; origin: string };
  receiver: { nama: string; destination: string };
  last_manifest?: {
    manifest: string;
    city: string;
    date: string;
    waktu: string;
  };
  isDashboard?: boolean;
  layout?: string;
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
  layout = "list",
}: ResiCardProps) => {
  return (
    <Card className="border w-full border-green-200 dark:border-green-200/40 p-4 space-y-4 text-xs xl:text-sm font-light">
      <span className="px-2 py-1 bg-green-200 dark:bg-green-300 rounded-sm xl:text-sm text-xs text-gray-900">
        {receiver.nama} / {keterangan}
      </span>
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
            "flex",
            layout === "list"
              ? "lg:gap-10 xl:gap-16 md:flex-row flex-col items-start md:items-center gap-4 md:gap-8"
              : "gap-4 flex-col"
          )}
        >
          <div className="w-40 md:w-32 xl:w-52">
            <Link href={`/tracks/${id}`}>
              <h3 className="xl:text-lg text-base font-bold hover:underline">
                {kode_resi}
              </h3>
            </Link>
            <p className="text-gray-500 dark:text-gray-300">{kode_kurir}</p>
          </div>
          <div
            className={cn(
              "flex md:flex-row flex-col",
              layout === "list" ? "md:gap-10 xl:gap-16 gap-4" : "gap-4 md:gap-8"
            )}
          >
            <div
              className={cn(
                "relative flex flex-col justify-center ",
                layout === "grid" ? "xl:w-40" : "w-40 md:w-32 xl:w-52"
              )}
            >
              <p className="pr-1 capitalize py-1 px-2">
                {shipper.nama.split(" ")[0] + " (" + shipper.origin + ")"}
              </p>
              <Separator className="bg-gray-300 dark:bg-gray-400" />
              <p className="pr-1 capitalize py-1 px-2">
                {receiver.nama.split(" ")[0] +
                  " (" +
                  receiver.destination +
                  ")"}
              </p>
              <div className="text-gray-500 absolute -right-4 dark:text-gray-300">
                <ArrowDown className="w-3 h-3" />
              </div>
            </div>
            {!isDashboard && (
              <div
                className={cn(
                  "relative flex flex-col justify-center ",
                  layout === "grid" ? "xl:w-40" : "w-40 md:w-32 xl:w-52"
                )}
              >
                <div className="capitalize py-1 px-2">
                  {last_manifest?.manifest + " " + last_manifest?.city}
                </div>
                <Separator className="bg-gray-300" />
                <div className="capitalize py-1 px-2">
                  {last_manifest?.date + " - " + last_manifest?.waktu}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full gap-x-4 justify-end">
          <div
            className={cn(
              "h-8 flex items-center justify-center rounded capitalize text-sm text-gray-900",
              status === "on_progress" && "bg-yellow-300",
              status === "delivered" && "bg-green-300",
              layout === "grid" ? "w-full" : "lg:w-28 w-full"
            )}
          >
            {status === "on_progress" ? "on progress" : status}
          </div>
          <div className="h-8 w-8 rounded-full flex-none border-gray-300 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-500 flex items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};
