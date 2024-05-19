import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Link2,
  Package,
  PackageCheck,
  Truck,
  Users2,
} from "lucide-react";
import React from "react";
import { TotalDashboard } from "../page";

export const TopDashboard = (data: TotalDashboard) => {
  return (
    <div className="w-full gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid">
      <div className="grid col-span-2 sm:col-span-1 xl:col-span-2 gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 w-full">
        <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 gap-4 col-span-1 border border-gray-200">
          <div className="flex justify-between pb-2 border-b border-gray-500">
            <h5>Total User</h5>
            <Users2 className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
          </div>
          <p className="font-bold text-sm sm:text-xl h-full gap-x-1 items-center flex">
            {data.total_user + " "}
            <span className="font-semibold text-xs sm:text-base">User</span>
          </p>
        </Card>
        <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 gap-4 col-span-1 border border-gray-200">
          <div className="flex justify-between pb-2 border-b border-gray-500">
            <h5>Total Affiliate</h5>
            <Link2 className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
          </div>
          <p className="font-bold text-sm sm:text-xl h-full gap-x-1 items-center flex">
            0<span className="font-semibold text-xs sm:text-base">User</span>
          </p>
        </Card>
      </div>
      <div className="col-span-2 sm:col-span-1 xl:col-span-2 gap-2 grid grid-cols-1 sm:gap-4">
        <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 gap-4 border border-gray-200 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex gap-x-2 bg-gray-200 dark:bg-gray-400 py-1 px-2 rounded-full text-black">
            <Package className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
            <h5>Total Resi</h5>
          </div>
          <p className="font-bold text-sm sm:text-xl">
            {data.total_waybill + " "}
            <span className="font-semibold text-xs sm:text-base">Resi</span>
          </p>
        </Card>
        <div className="gap-2 col-span-2 sm:col-span-1 lg:col-span-2 xl:grid-cols-2 sm:gap-4 grid w-full">
          <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 gap-4 border border-gray-200">
            <div className="flex gap-x-2 bg-yellow-100 dark:bg-yellow-300 py-1 px-2 rounded-full text-black">
              <Truck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
              <h5>On Progress</h5>
            </div>
            <p className="font-bold text-sm sm:text-xl">
              {data.total_waybill_op + " "}
              <span className="font-semibold text-xs sm:text-base">Resi</span>
            </p>
          </Card>
          <Card className="w-full text-xs sm:text-sm justify-between items-center flex p-2 sm:p-4 gap-4 border border-gray-200">
            <div className="flex gap-x-2 bg-green-100 dark:bg-green-300 py-1 px-2 rounded-full text-black">
              <PackageCheck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
              <h5>Delivered</h5>
            </div>
            <p className="font-bold text-sm sm:text-xl">
              {data.total_waybill_delivered + " "}
              <span className="font-semibold text-xs sm:text-base">Resi</span>
            </p>
          </Card>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col gap-2 sm:gap-4 h-full w-full col-span-2 lg:col-span-1">
        <Card className="w-full text-xs sm:text-sm justify-between items-center lg:flex-col xl:items-center lg:items-start xl:flex-row bg-green-200/50 border border-green-300 flex p-2 sm:p-4 gap-4 h-full">
          <div className="flex gap-x-2 items-center justify-between w-full lg:border-b xl:border-0 xl:p-0 lg:pb-2 border-gray-500">
            <p className="hidden lg:block xl:hidden">Cash In</p>
            <ArrowDownCircle className="text-green-700 sm:w-6 sm:h-6 w-4 h-4 stroke-1" />
          </div>
          <p className="font-bold text-xs sm:text-base h-full flex items-center">
            {formatRupiah(data.total_revenue)}
          </p>
        </Card>
        <Card className="w-full text-xs sm:text-sm justify-between items-center lg:flex-col xl:items-center lg:items-start xl:flex-row bg-green-200/50 border border-green-300 flex p-2 sm:p-4 gap-4 h-full">
          <div className="flex gap-x-2 items-center justify-between w-full lg:border-b xl:border-0 xl:p-0 lg:pb-2 border-gray-500">
            <p className="hidden lg:block xl:hidden">Cash Out</p>
            <ArrowUpCircle className="text-red-500 sm:w-6 sm:h-6 w-4 h-4 stroke-1" />
          </div>
          <p className="font-bold text-xs sm:text-base h-full flex items-center">
            {formatRupiah(0)}
          </p>
        </Card>
      </div>
    </div>
  );
};
