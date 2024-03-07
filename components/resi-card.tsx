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
}: ResiCardProps) => {
  return (
    <Card className="border border-green-200 p-4 space-y-4 text-sm">
      <span className="px-2 py-1 bg-green-200 rounded-sm text-xs text-gray-900">
        {receiver.nama} / {keterangan}
      </span>
      <div className="flex justify-between">
        <div className="flex gap-16">
          <div>
            <h3>{kode_resi}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {kode_kurir}
            </p>
          </div>
          <div className="relative flex flex-col justify-center">
            <p className="pr-2 capitalize">
              {shipper.nama + " (" + shipper.origin + ")"}
            </p>
            <Separator className="bg-gray-300 dark:bg-gray-400" />
            <p className="pr-2 capitalize">
              {receiver.nama + " (" + receiver.destination + ")"}
            </p>
            <div className="text-gray-500 absolute -right-4 dark:text-gray-300">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
          {!isDashboard && (
            <div>
              <div>{last_manifest?.manifest + " " + last_manifest?.city}</div>
              <Separator className="bg-gray-300" />
              <div>{last_manifest?.date + " - " + last_manifest?.waktu}</div>
            </div>
          )}
        </div>
        <div className="flex gap-x-4">
          <div
            className={cn(
              "w-28 h-8 flex items-center justify-center rounded capitalize text-sm text-gray-900",
              status === "on progress" && "bg-yellow-300",
              status === "delivered" && "bg-green-300"
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
