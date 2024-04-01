import { Card } from "@/components/ui/card";
import { ArchiveDataProps } from "@/lib/utils";
import { PackageCheck, Truck } from "lucide-react";
import React from "react";
import { CurrentCard } from "./current-card";

export const ResiCurrentCard = ({
  data,
  href,
  label,
}: {
  data: ArchiveDataProps[];
  href: string;
  label: string;
}) => {
  return (
    <CurrentCard label={label} href={href}>
      {data.slice(0, 4).map((item) => (
        <li className="capitalize" key={item.id}>
          <Card className="p-4 rounded-sm text-sm flex justify-between items-center">
            <div className="flex items-center">
              {item.status === "on_progress" ? (
                <Truck className="h-7 w-7 stroke-[1.5] mr-2 text-yellow-500" />
              ) : (
                <PackageCheck className="h-7 w-7 stroke-[1.5] mr-2 text-green-500" />
              )}
              <div>
                <div className="font-semibold">{item.keterangan}</div>
                <div className="text-xs">{item.kode_resi}</div>
              </div>
            </div>
            <div className="flex flex-col items-end font-semibold">
              {item.last_manifest.manifest} - {item.last_manifest.city}
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
