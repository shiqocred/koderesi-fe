"use client";
import { ArrowDown, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface ResiCardProps {
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
    <Card className="border border-green-200 dark:border-green-200/40 p-4 space-y-4 text-sm font-light">
      <span className="px-2 py-1 bg-green-200 dark:bg-green-300 rounded-sm text-gray-900">
        {receiver.nama} / {keterangan}
      </span>
      <div
        className={cn(
          "flex",
          layout === "list" ? "justify-between flex-row" : "flex-col gap-4"
        )}
      >
        <div
          className={cn(
            "flex",
            layout === "list" ? "gap-16 flex-row" : "gap-4 flex-col"
          )}
        >
          <div className="w-52">
            <h3 className="text-lg font-bold">{kode_resi}</h3>
            <p className="text-gray-500 dark:text-gray-300">{kode_kurir}</p>
          </div>
          <div className={cn("flex", layout === "list" ? "gap-16" : "gap-8")}>
            <div className="relative flex flex-col justify-center w-52">
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
              <div className="w-52">
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
        <div className="flex gap-x-4">
          <div
            className={cn(
              "w-28 h-8 flex items-center justify-center rounded capitalize text-sm text-gray-900",
              status === "on progress" && "bg-yellow-300",
              status === "delivered" && "bg-green-300",
              layout === "grid" && "w-full"
            )}
          >
            {status}
          </div>
          <div className="h-8 w-8 rounded-full border-gray-300 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-500 flex items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};
