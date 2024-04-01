import { Card } from "@/components/ui/card";
import React from "react";
import { CurrentCard } from "./current-card";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export const UserCurrentCard = ({
  data,
  href,
  label,
}: {
  data: any[];
  href: string;
  label: string;
}) => {
  return (
    <CurrentCard label={label} href={href}>
      {data.map((item) => (
        <li className="capitalize" key={item.id}>
          <Card className="p-4 rounded-sm text-sm flex justify-between items-center">
            <div className="flex items-center">
              <div className="overflow-hidden w-9 h-9 relative rounded">
                <Image
                  src={"/avatar.webp"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="font-semibold">{item.nama}</div>
                <div className="text-xs lowercase">
                  {item.email} - {item.handphone}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {item.tanggal}, {item.waktu}
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
