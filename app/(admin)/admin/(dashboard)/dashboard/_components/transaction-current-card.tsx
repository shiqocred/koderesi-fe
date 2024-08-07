import { Card } from "@/components/ui/card";
import { formatRupiah, formatTanggalWaktu } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import React from "react";
import { CurrentCard } from "./current-card";
import { NewTransactionProps } from "../page";

export const TransactionCurrentCard = ({
  data,
  href,
  label,
}: {
  data: NewTransactionProps[];
  href: string;
  label: string;
}) => {
  return (
    <CurrentCard label={label} href={href}>
      {data.map((item) => (
        <li className="capitalize" key={item.id}>
          <Card className="p-4 rounded-sm text-xs font-light sm:text-sm flex justify-between items-center">
            <div className="flex items-center">
              {item.status === "in" ? (
                <ArrowUpCircle className="sm:h-7 sm:w-7 h-5 w-5 stroke-1 sm:stroke-[1.5] mr-2 text-red-500" />
              ) : (
                <ArrowDownCircle className="sm:h-7 sm:w-7 h-5 w-5 stroke-1 sm:stroke-[1.5] mr-2 text-green-500" />
              )}
              <div>
                <div className="font-semibold">{item.code_transaction}</div>
                <div className="text-xs">
                  {item.transaction_date &&
                    item.transaction_time &&
                    formatTanggalWaktu(
                      item.transaction_date + " " + item.transaction_time
                    )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end font-semibold">
              {formatRupiah(item.amount_bill)}
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
