"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, formatRupiah } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface DataProps {
  id: number;
  nama: string;
  status: string;
  cash: number;
}

const ApprovedWithdraw = (data: DataProps) => {
  return (
    <>
      <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
        <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
          <Image alt="" src={"/avatar.webp"} fill />
        </div>
        <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
          <p className="font-semibold">{data.nama}</p>
          <div className="flex items-center">
            <div
              className={cn(
                "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                data.status === "waiting" && "bg-yellow-300",
                data.status === "approved" && "bg-green-300",
                data.status === "rejected" && "bg-red-300"
              )}
            >
              {data.status}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nominal withdraw</p>
        <p>{formatRupiah(data.cash)}</p>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nomor DANA</p>
        <p>0888-8888-8888</p>
      </Card>
      <Card className="flex flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm ">
        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label>Nomor Transaksi</Label>
            <Input
              value="325529134832"
              className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label>Withdraw via</Label>
            <Input
              value="DANA"
              className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label>Tanggal</Label>
            <Input
              value="23 Des 2024"
              className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label>Waktu</Label>
            <Input
              value="13:22:21"
              className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
              disabled
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ApprovedWithdraw;
