import { Card } from "@/components/ui/card";
import { ArchiveDataProps, formatTanggalWaktu } from "@/lib/utils";
import { PackageCheck, Truck } from "lucide-react";
import React from "react";
import { CurrentCard } from "./current-card";
import { NewManifestProps } from "../page";

export const ResiCurrentCard = ({
  data,
  href,
  label,
}: {
  data: NewManifestProps[];
  href: string;
  label: string;
}) => {
  return (
    <CurrentCard label={label} href={href}>
      {data.map((item) => (
        <li className="capitalize" key={item.id}>
          <Card className="md:py-2 md:px-5 p-2 min-h-16 rounded-sm text-sm flex justify-between items-center">
            <div className="flex items-center w-full gap-2">
              {item.status === "delivered" ? (
                <PackageCheck className="h-7 w-7 stroke-[1.5] mr-2 text-green-500" />
              ) : (
                <Truck className="h-7 w-7 stroke-[1.5] mr-2 text-yellow-500" />
              )}
              <div className="flex w-full justify-between flex-col md:flex-row overflow-hidden md:items-center md:gap-6">
                <h5 className="font-semibold text-base sm:text-lg lg:text-xl">
                  {item.waybill.waybill}
                </h5>
                <div className="flex flex-col md:items-end border-t border-gray-500 md:border-none mt-1 pt-1 md:p-0 md:m-0 overflow-hidden whitespace-nowrap w-full">
                  <p className="sm:text-sm text-xs font-medium lg:text-base capitalize w-full md:text-end text-ellipsis overflow-hidden">
                    {item.note}
                  </p>
                  <p className="lg:text-sm text-xs font-light">
                    {item.date_manifest &&
                      formatTanggalWaktu(item.date_manifest)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
