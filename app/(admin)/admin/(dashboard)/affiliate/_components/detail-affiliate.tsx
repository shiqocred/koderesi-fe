"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { cn, formatRupiah } from "@/lib/utils";
import {
  ArrowDownCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Save,
  Twitter,
  XCircle,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChartAffiliate } from "./chart-affiliate";
import { Separator } from "@/components/ui/separator";

interface DataProps {
  id: number;
  nama: string;
  status: string;
  url?: any;
  reason?: string;
  referral_code?: string;
}

interface IncomeProps {
  id: number;
  nama: string;
  tanggal: string;
  cash: number;
  status: string;
}

const mapIncome: IncomeProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    tanggal: "3 Des 2024 - 18.00",
    cash: 30000,
    status: "in",
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    tanggal: "3 Des 2024 - 18.00",
    cash: 20000,
    status: "in",
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    tanggal: "3 Des 2024 - 18.00",
    cash: 30000,
    status: "in",
  },
];

const DetailAffiliate = ({
  id,
  nama,
  status,
  url,
  reason,
  referral_code,
}: DataProps) => {
  const [mth, setMth] = useState<number>(0);
  const { onOpen } = useModal();
  const [reasonData, setReasonData] = useState("");

  const month = [
    {
      label: "januari",
      value: "jan",
    },
    {
      label: "februari",
      value: "feb",
    },
    {
      label: "maret",
      value: "mar",
    },
    {
      label: "april",
      value: "apr",
    },
    {
      label: "mei",
      value: "mei",
    },
    {
      label: "juni",
      value: "jun",
    },
    {
      label: "juli",
      value: "jul",
    },
    {
      label: "agustus",
      value: "agu",
    },
    {
      label: "september",
      value: "sep",
    },
    {
      label: "oktober",
      value: "okt",
    },
    {
      label: "november",
      value: "nov",
    },
    {
      label: "desember",
      value: "des",
    },
  ];

  const onChangeMonth = (value: "prev" | "next") => {
    if (value === "prev") {
      setMth(mth !== 0 ? mth - 1 : 0);
    } else if (value === "next") {
      setMth(mth !== month.length - 1 ? mth + 1 : month.length - 1);
    }
  };

  useEffect(() => {
    if (reason) {
      setReasonData(reason);
    }
  }, [reason]);

  if (status === "pending") {
    return (
      <>
        <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 border shadow rounded">
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
        <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
          <p className="text-base font-semibold">Promosi:</p>
          <div className="text-sm border-l-4 border-black pl-2">{reason}</div>
        </Card>
        <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
          <p className="text-base font-semibold">Website url:</p>
          <ul className="before:*:content-['-'] before:*:pr-2 text-sm relative *:pl-4">
            {url.website.map((item: any) => (
              <li
                key={item}
                className="py-2 border-b first:border-t border-gray-500 dark:border-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
        {(url.ig || url.fb || url.x || url.yt) && (
          <div className="w-full flex flex-col gap-3">
            {(url.ig || url.fb) && (
              <div className="grid w-full grid-cols-2 gap-3">
                {url.ig && (
                  <Card
                    className={cn(
                      "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                      !url.fb ? "col-span-2" : "col-span-2 lg:col-span-1"
                    )}
                  >
                    <Instagram className="w-6 h-6 mx-3" />
                    <Separator
                      orientation="vertical"
                      className="bg-black h-[70%]"
                    />
                    <p className="w-full px-3 text-sm">{url.ig.url}</p>
                  </Card>
                )}
                {url.fb && (
                  <Card
                    className={cn(
                      "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                      !url.ig ? "col-span-2" : "col-span-2 lg:col-span-1"
                    )}
                  >
                    <Facebook className="w-6 h-6 mx-3" />
                    <Separator
                      orientation="vertical"
                      className="bg-black h-[70%]"
                    />
                    <p className="w-full px-3 text-sm">{url.fb.url}</p>
                  </Card>
                )}
              </div>
            )}
            {(url.x || url.yt) && (
              <div className="grid grid-cols-2 gap-3">
                {url.x && (
                  <Card
                    className={cn(
                      "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                      !url.yt ? "col-span-2" : "col-span-2 lg:col-span-1"
                    )}
                  >
                    <Twitter className="w-6 h-6 mx-3" />
                    <Separator
                      orientation="vertical"
                      className="bg-black h-[70%]"
                    />
                    <p className="w-full px-3 text-sm">{url.ig.url}</p>
                  </Card>
                )}
                {url.yt && (
                  <Card
                    className={cn(
                      "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                      !url.x ? "col-span-2" : "col-span-2 lg:col-span-1"
                    )}
                  >
                    <Youtube className="w-6 h-6 mx-3" />
                    <Separator
                      orientation="vertical"
                      className="bg-black h-[70%]"
                    />
                    <p className="w-full px-3 text-sm">{url.ig.url}</p>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
        {(!url.ig || !url.fb || !url.x || !url.yt) && (
          <div className="w-full flex gap-3">
            {!url.ig && (
              <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                <Instagram className="w-5 h-5" />
                <div className="absolute w-full h-full justify-center items-center flex">
                  <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                </div>
              </Card>
            )}
            {!url.fb && (
              <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                <Facebook className="w-5 h-5" />
                <div className="absolute w-full h-full justify-center items-center flex">
                  <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                </div>
              </Card>
            )}
            {!url.x && (
              <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                <Twitter className="w-5 h-5" />
                <div className="absolute w-full h-full justify-center items-center flex">
                  <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                </div>
              </Card>
            )}
            {!url.yt && (
              <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                <Youtube className="w-5 h-5" />
                <div className="absolute w-full h-full justify-center items-center flex">
                  <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                </div>
              </Card>
            )}
          </div>
        )}
        <div className="flex w-full flex-col gap-1">
          <Label className="text-xs md:text-sm">Affiliate Code</Label>
          <Input
            value={referral_code}
            disabled
            className="disabled:opacity-100 uppercase tracking-[5px] font-bold text-center text-sm md:text-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
          />
        </div>
        <div className="h-full border dark:border-gray-700/70 rounded-md p-0 md:p-4">
          <div className="flex md:justify-between md:items-center px-4 pt-4 gap-2 md:gap-0 md:px-5 mb-4 flex-col md:flex-row items-start">
            <CardTitle>Income Flow</CardTitle>
            <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
              <Button
                className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                variant={"ghost"}
                onClick={() => onChangeMonth("prev")}
                disabled={mth === 0}
              >
                <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
              </Button>
              <span className="capitalize md:w-20 w-14 select-none flex items-center justify-center text-xs md:text-sm">
                {month[mth].label}
              </span>
              <Button
                className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                variant={"ghost"}
                onClick={() => onChangeMonth("next")}
                disabled={mth === month.length - 1}
              >
                <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
              </Button>
            </div>
          </div>
          <div className="xl:h-[250px] md:h-[230px] h-[200px]">
            <ChartAffiliate month={month[mth].value} />
          </div>
        </div>
        <div className="h-full border dark:border-gray-700/70 rounded-md p-2 md:p-4 space-y-2">
          <Card className="h-12 px-5 rounded-sm flex bg-gray-200 dark:bg-gray-700/70 justify-center font-semibold capitalize items-center">
            Income - {month[mth].label}
          </Card>
          {mapIncome.map((item) => (
            <Card
              key={item.id}
              className="p-2 md:p-3 lg:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-between items-center"
            >
              <div className="flex items-center">
                <ArrowDownCircle className="lg:h-7 lg:w-7 h-5 w-5 stroke-[1.5] mr-2 text-green-500" />
                <div>
                  <div className="font-semibold">{item.nama}</div>
                  <div className="text-xs">{item.tanggal}</div>
                </div>
              </div>
              <div className="flex flex-col items-end font-semibold">
                {formatRupiah(item.cash)}
              </div>
            </Card>
          ))}
          <div className="w-full">
            <Button
              className="w-full mt-2"
              variant={"destructive"}
              onClick={() => onOpen("reject-affiliate")}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Stop Akses
            </Button>
          </div>
        </div>
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
        <div className="flex w-full gap-4">
          <Textarea
            value={reasonData}
            onChange={(e) => setReasonData(e.target.value)}
            className="bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
          />
          <Button
            className="bg-green-400 hover:bg-green-300 text-black flex-none"
            size={"icon"}
            onClick={() => onOpen("edit-reason", reasonData)}
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex items-center p-3 md:px-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 shadow border rounded dark:border-gray-600">
        <div className="flex items-center gap-1 md:gap-4 w-full justify-between">
          <p className="font-semibold">{nama}</p>
          <div className="flex items-center">
            <div
              className={cn(
                "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black bg-yellow-300 capitalize"
              )}
            >
              {status}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
        <p className="text-base font-semibold">Promosi:</p>
        <div className="text-sm border-l-4 border-black pl-2">{reason}</div>
      </Card>
      <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
        <p className="text-base font-semibold">Website url:</p>
        <ul className="before:*:content-['-'] before:*:pr-2 text-sm relative *:pl-4">
          {url.website.map((item: any) => (
            <li
              key={item}
              className="py-2 border-b first:border-t border-gray-500 dark:border-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>
      {(url.ig || url.fb || url.x || url.yt) && (
        <div className="w-full flex flex-col gap-3">
          {(url.ig || url.fb) && (
            <div className="grid w-full grid-cols-2 gap-3">
              {url.ig && (
                <Card
                  className={cn(
                    "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                    !url.fb ? "col-span-2" : "col-span-2 lg:col-span-1"
                  )}
                >
                  <Instagram className="w-6 h-6 mx-3" />
                  <Separator
                    orientation="vertical"
                    className="bg-black h-[70%]"
                  />
                  <p className="w-full px-3 text-sm">{url.ig.url}</p>
                </Card>
              )}
              {url.fb && (
                <Card
                  className={cn(
                    "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                    !url.ig ? "col-span-2" : "col-span-2 lg:col-span-1"
                  )}
                >
                  <Facebook className="w-6 h-6 mx-3" />
                  <Separator
                    orientation="vertical"
                    className="bg-black h-[70%]"
                  />
                  <p className="w-full px-3 text-sm">{url.fb.url}</p>
                </Card>
              )}
            </div>
          )}
          {(url.x || url.yt) && (
            <div className="grid grid-cols-2 gap-3">
              {url.x && (
                <Card
                  className={cn(
                    "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                    !url.yt ? "col-span-2" : "col-span-2 lg:col-span-1"
                  )}
                >
                  <Twitter className="w-6 h-6 mx-3" />
                  <Separator
                    orientation="vertical"
                    className="bg-black h-[70%]"
                  />
                  <p className="w-full px-3 text-sm">{url.ig.url}</p>
                </Card>
              )}
              {url.yt && (
                <Card
                  className={cn(
                    "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                    !url.x ? "col-span-2" : "col-span-2 lg:col-span-1"
                  )}
                >
                  <Youtube className="w-6 h-6 mx-3" />
                  <Separator
                    orientation="vertical"
                    className="bg-black h-[70%]"
                  />
                  <p className="w-full px-3 text-sm">{url.ig.url}</p>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
      {(!url.ig || !url.fb || !url.x || !url.yt) && (
        <div className="w-full flex gap-3">
          {!url.ig && (
            <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
              <Instagram className="w-5 h-5" />
              <div className="absolute w-full h-full justify-center items-center flex">
                <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
              </div>
            </Card>
          )}
          {!url.fb && (
            <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
              <Facebook className="w-5 h-5" />
              <div className="absolute w-full h-full justify-center items-center flex">
                <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
              </div>
            </Card>
          )}
          {!url.x && (
            <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
              <Twitter className="w-5 h-5" />
              <div className="absolute w-full h-full justify-center items-center flex">
                <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
              </div>
            </Card>
          )}
          {!url.yt && (
            <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
              <Youtube className="w-5 h-5" />
              <div className="absolute w-full h-full justify-center items-center flex">
                <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
              </div>
            </Card>
          )}
        </div>
      )}
      <div className="flex w-full gap-4">
        <Button
          className="w-full bg-red-500 hover:bg-red-400 text-black"
          onClick={() => onOpen("reject-affiliate")}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject
        </Button>
        <Button
          className="w-full bg-green-500 hover:bg-green-400 text-black"
          onClick={() => onOpen("approve-affiliate")}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Approve
        </Button>
      </div>
    </div>
  );
};

export default DetailAffiliate;
