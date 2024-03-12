import { ResiCard } from "@/components/resi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { data, formatRupiah } from "@/lib/utils";
import {
  BadgeDollarSign,
  Package,
  PackageCheck,
  Plus,
  Rocket,
  Truck,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { ChartClient } from "./components/chart-client";

const DashboardPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="w-full transition-all flex flex-col md:flex-row gap-4 xl:gap-8">
        <Card className="w-full lg:w-2/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-xl font-bold">Lacak Resi Anda!</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
              Silahkan masukan resi anda
            </p>
          </div>
          <Button
            className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
            variant={"outline"}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </Card>
        <Card className="w-full lg:w-3/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-xl font-bold">Kredit Habis?</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
              Top up kredit anda sekarang juga!
            </p>
          </div>
          <div className="flex items-center">
            <div className="px-6 lg:flex hidden flex-col items-center bg-green-400 h-[50px] justify-center rounded-l-md">
              <h3 className="font-bold text-lg leading-none dark:text-gray-900">
                3500 kredit
              </h3>
              <p className="text-xs text-gray-900">Total kredit anda</p>
            </div>
            <Link href={"/top-up"}>
              <Button
                className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                variant={"outline"}
              >
                <Rocket className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      <div className="px-6 w-full md:w-auto flex lg:hidden flex-row items-center justify-between lg:flex-col lg:items-start bg-green-400 h-10 lg:justify-center rounded-md">
        <p className="text-xs lg:text-sm text-gray-900">Kredit anda</p>
        <h3 className="font-bold text-xs lg:text-sm leading-none dark:text-gray-900">
          3500 kredit
        </h3>
      </div>
      <Separator className="dark:bg-white bg-gray-500" />
      <div className="w-full transition-all flex flex-col gap-4">
        <div className="w-full gap-4 grid-cols-4 grid">
          <Card className="w-full text-sm justify-center flex flex-col p-6 gap-4">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Total Resi</h5>
              <Package className="w-5 h-5 stroke-1" />
            </div>
            <p className="font-bold text-xl">
              5 <span className="font-semibold text-base">Resi</span>
            </p>
          </Card>
          <Card className="w-full text-sm justify-center flex flex-col p-6 gap-4">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>On Progress</h5>
              <Truck className="w-5 h-5 stroke-1" />
            </div>
            <p className="font-bold text-xl">
              5 <span className="font-semibold text-base">Resi</span>
            </p>
          </Card>
          <Card className="w-full text-sm justify-center flex flex-col p-6 gap-4">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Delivered</h5>
              <PackageCheck className="w-5 h-5 stroke-1" />
            </div>
            <p className="font-bold text-xl">
              5 <span className="font-semibold text-base">Resi</span>
            </p>
          </Card>
          <Card className="w-full text-sm justify-center flex flex-col p-6 gap-4">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Cash Flow</h5>
              <BadgeDollarSign className="w-5 h-5 stroke-1" />
            </div>
            <p className="font-bold text-xl">- {formatRupiah(3000000)}</p>
          </Card>
        </div>
        <div className="flex gap-4">
          <Card className="md:w-8/12 xl:w-7/12 p-4 rounded-md flex flex-col gap-y-4">
            <ChartClient />
          </Card>
          <Card className="md:w-4/12 xl:w-5/12 p-4 rounded-md flex flex-col gap-y-4">
            <div>
              <p className="text-xl font-semibold">Manifest Terbaru</p>
              <p className="text-sm font-light text-gray-700">
                Daftar Manifest Terbaru.
              </p>
              <ul>
                <li className="flex text-sm flex-col">
                  <div className="flex justify-between">
                    <p>Manifest</p>
                    <p>waktu</p>
                  </div>
                  <div>Resi</div>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
