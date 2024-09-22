"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import formatPhoneNumber, { cn, formatRupiah } from "@/lib/utils";
import {
  ArrowDownCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Save,
  Slash,
  Twitter,
  XCircle,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ChartAffiliate } from "./chart-affiliate";
import { Separator } from "@/components/ui/separator";

interface DataProps {
  id: number;
  nama: string;
  status: string;
  date?: string;
  time?: string;
  method?: string;
  transactionNumber?: string;
  reason?: string;
  cash?: number;
  numberPhone?: number;
}

const DetailWithdraw = ({
  id,
  nama,
  status,
  date,
  time,
  method,
  transactionNumber,
  reason,
  cash,
  numberPhone,
}: DataProps) => {
  const { onOpen } = useModal();

  if (status === "approved") {
    return (
      <>
        <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
          <div className="flex items-center gap-1 md:gap-4 w-full justify-between">
            <p className="font-semibold">{nama}</p>
            <div className="flex items-center">
              <div
                className={cn(
                  "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black bg-green-300"
                )}
              >
                {status}
              </div>
            </div>
          </div>
        </Card>
        <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
          <p className="font-semibold">Nominal withdraw</p>
          <p>{formatRupiah(cash ?? 0)}</p>
        </Card>
        <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
          <p className="font-semibold">Nomor DANA</p>
          <p>{formatPhoneNumber(numberPhone ?? 0)}</p>
        </Card>
        <Card className="flex flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm ">
          <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
            <div className="flex flex-col gap-1 w-full">
              <Label>Nomor Transaksi</Label>
              <Input
                value={transactionNumber ?? "-"}
                className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label>Withdraw via</Label>
              <Input
                value={method ?? "-"}
                className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
            <div className="flex flex-col gap-1 w-full">
              <Label>Tanggal</Label>
              <Input
                value={date ?? "-"}
                className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label>Waktu</Label>
              <Input
                value={time ?? "-"}
                className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                disabled
              />
            </div>
          </div>
        </Card>
      </>
    );
  }

  if (status === "rejected") {
    return (
      <>
        <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
          <div className="flex items-center gap-1 md:gap-4 w-full justify-between">
            <p className="font-semibold">{nama}</p>
            <div className="flex items-center">
              <div
                className={cn(
                  "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black bg-red-300"
                )}
              >
                {status}
              </div>
            </div>
          </div>
        </Card>
        <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
          <p className="font-semibold">Nominal withdraw</p>
          <p>{formatRupiah(cash ?? 0)}</p>
        </Card>
        <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
          <p className="font-semibold">Nomor DANA</p>
          <p>{formatPhoneNumber(numberPhone ?? 0)}</p>
        </Card>
        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
          <Textarea
            value={reason}
            className="bg-transparent border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
          />
          <Button
            className="bg-green-400 hover:bg-green-300 text-black flex-none"
            size={"icon"}
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
        <div className="flex items-center gap-1 md:gap-4 w-full justify-between">
          <p className="font-semibold">{nama}</p>
          <div className="flex items-center">
            <div
              className={cn(
                "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black bg-yellow-300"
              )}
            >
              {status}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nominal withdraw</p>
        <p>{formatRupiah(cash ?? 0)}</p>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nomor DANA</p>
        <p>{formatPhoneNumber(numberPhone ?? 0)}</p>
      </Card>
      <Card className="flex items-center flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-sm">
        <Label className="text-xs md:text-sm">Update status</Label>
        <div className="flex gap-2 md:gap-4 w-full flex-col-reverse md:flex-row">
          <Button
            className="w-full bg-red-500 hover:bg-red-400 text-black"
            onClick={() => onOpen("reject-withdraw")}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button
            className="w-full bg-green-500 hover:bg-green-400 text-black"
            onClick={() => onOpen("approve-withdraw")}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      </Card>
    </>
  );
};

export default DetailWithdraw;
