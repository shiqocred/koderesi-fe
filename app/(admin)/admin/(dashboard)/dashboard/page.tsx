"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Link2,
  Package,
  PackageCheck,
  Truck,
  Users2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChartAdmin } from "./_components/chart-admin";
import { data, formatRupiah, mapNewestTransaction } from "@/lib/utils";
import { TransactionCurrentCard } from "./_components/transaction-current-card";
import { ResiCurrentCard } from "./_components/resi-current-card";
import { UserCurrentCard } from "./_components/user-current-card";

const mapNewUser = [
  {
    id: 1839147239,
    nama: "Ahmad Fulan",
    email: "example@mail.com",
    handphone: "082223286788",
    tanggal: "feb 2",
    waktu: "08.00",
  },
  {
    id: 4392839187,
    nama: "Ahmad Fulan",
    email: "example@mail.com",
    handphone: "082223286788",
    tanggal: "feb 2",
    waktu: "08.00",
  },
  {
    id: 2718391832,
    nama: "Ahmad Fulan",
    email: "example@mail.com",
    handphone: "082223286788",
    tanggal: "feb 2",
    waktu: "08.00",
  },
  {
    id: 7283712628,
    nama: "Ahmad Fulan",
    email: "example@mail.com",
    handphone: "082223286788",
    tanggal: "feb 2",
    waktu: "08.00",
  },
];

const AdminDashboardpage = () => {
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="w-full transition-all flex flex-col gap-4">
        <div className="w-full gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid">
          <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 lg:p-6 gap-4 xl:col-span-1 lg:col-span-3 col-span-1 border border-gray-200">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Total User</h5>
              <Users2 className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
            </div>
            <p className="font-bold text-sm sm:text-xl h-full items-center flex">
              5
              <span className="font-semibold text-xs sm:text-base ml-1">
                User
              </span>
            </p>
          </Card>
          <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 lg:p-6 gap-4 xl:col-span-1 lg:col-span-3 col-span-1 border border-gray-200">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Total Affiliate</h5>
              <Link2 className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
            </div>
            <p className="font-bold text-sm sm:text-xl h-full items-center flex">
              5
              <span className="font-semibold text-xs sm:text-base ml-1">
                User
              </span>
            </p>
          </Card>
          <div className="flex flex-col gap-y-2 col-span-2">
            <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 lg:p-6 gap-4 border border-gray-200">
              <div className="flex gap-x-2 bg-gray-200 py-1 px-2 rounded-full">
                <Package className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
                <h5>Total Resi</h5>
              </div>
              <p className="font-bold text-sm sm:text-xl">
                5{" "}
                <span className="font-semibold text-xs sm:text-base">Resi</span>
              </p>
            </Card>
            <div className="flex gap-x-2">
              <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 lg:p-6 gap-4 border border-gray-200">
                <div className="flex gap-x-2 bg-yellow-100 py-1 px-2 rounded-full">
                  <Truck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
                  <h5>On Progress</h5>
                </div>
                <p className="font-bold text-sm sm:text-xl">
                  5{" "}
                  <span className="font-semibold text-xs sm:text-base">
                    Resi
                  </span>
                </p>
              </Card>
              <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 lg:p-6 gap-4 border border-gray-200">
                <div className="flex gap-x-2 bg-green-100 py-1 px-2 rounded-full">
                  <PackageCheck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
                  <h5>Delivered</h5>
                </div>
                <p className="font-bold text-sm sm:text-xl">
                  5{" "}
                  <span className="font-semibold text-xs sm:text-base">
                    Resi
                  </span>
                </p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Card className="w-full text-xs sm:text-sm justify-between items-center bg-green-200/50 border border-green-300 flex p-2 sm:p-4 lg:p-6 gap-4">
              <div className="flex gap-x-2">
                <ArrowDownCircle className="text-green-700 sm:w-6 sm:h-6 w-4 h-4 stroke-1" />
              </div>
              <p className="font-bold text-sm sm:text-base">
                {formatRupiah(500000)}
              </p>
            </Card>
            <Card className="w-full text-xs sm:text-sm justify-between items-center bg-red-200/50 border border-red-300 flex p-2 sm:p-4 lg:p-6 gap-4">
              <div className="flex gap-x-2">
                <ArrowUpCircle className="text-red-500 sm:w-6 sm:h-6 w-4 h-4 stroke-1" />
              </div>
              <p className="font-bold text-sm sm:text-base">
                {formatRupiah(500000)}
              </p>
            </Card>
          </div>
        </div>
        <Separator className="dark:bg-white bg-gray-500" />
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="w-full xl:w-9/12 ">
            <Card className="pr-2 pt-2 md:p-2 lg:p-4 rounded-md flex flex-col gap-y-4 h-[200px] sm:h-[250px] lg:h-[470px] md:h-[300px]">
              <div className="flex justify-between items-center">
                <CardTitle>Cash Flow</CardTitle>
                <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                  <Button
                    size={"icon"}
                    className="h-5 w-5 rounded-sm"
                    variant={"ghost"}
                    onClick={() => onChangeMonth("prev")}
                    disabled={mth === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="capitalize w-20 select-none flex items-center justify-center">
                    {month[mth].label}
                  </span>
                  <Button
                    size={"icon"}
                    className="h-5 w-5 rounded-sm"
                    variant={"ghost"}
                    onClick={() => onChangeMonth("next")}
                    disabled={mth === month.length - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <ChartAdmin month={month[mth].value} />
            </Card>
          </div>
          <div className="w-full xl:w-3/12 ">
            <TransactionCurrentCard
              label="Transaksi Terbaru"
              data={mapNewestTransaction}
              href="/admin/tracks"
            />
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="w-full">
            <UserCurrentCard
              label="User Terbaru"
              data={mapNewUser}
              href="/admin/tracks"
            />
          </div>
          <div className="w-full ">
            <ResiCurrentCard
              label="Manifest Terbaru"
              data={data}
              href="/admin/tracks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardpage;
