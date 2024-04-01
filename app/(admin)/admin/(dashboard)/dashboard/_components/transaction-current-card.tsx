import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import React from "react";
import { CurrentCard } from "./current-card";

export const TransactionCurrentCard = ({
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
              {item.status === "in" ? (
                <ArrowDownCircle className="h-7 w-7 stroke-[1.5] mr-2 text-green-500" />
              ) : (
                <ArrowUpCircle className="h-7 w-7 stroke-[1.5] mr-2 text-red-500" />
              )}
              <div>
                <div className="font-semibold">{item.id}</div>
                <div className="text-xs">{item.tanggal}</div>
              </div>
            </div>
            <div className="flex flex-col items-end font-semibold">
              {formatRupiah(item.price)}
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
