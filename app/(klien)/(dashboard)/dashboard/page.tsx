"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumber, formatRupiah } from "@/lib/utils";
import { BadgeDollarSign, Package, PackageCheck, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChartClient } from "./components/chart-client";
import { TopClientDashboard } from "./components/top-client-dashboard";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useCookies } from "next-client-cookies";

interface NewManifest {
  date_manifest: string;
  id: string;
  note: string;
  status: string;
  waybill_id: string;
  waybill: { id: string; user_id: string; waybill: string };
}

const DashboardPage = () => {
  const [statistik, setStatistik] = useState({
    total_resi: 0,
    total_on_progress: 0,
    total_delivered: 0,
  });
  const [newManifest, setNewManifest] = useState<NewManifest[]>([]);
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const getStatistik = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/admin/dashboard/statistic",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatistik(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_STATISTICT]:", error);
    }
  };
  const getNewestManifest = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/admin/dashboard",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewManifest(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_MANIFEST]:", error);
    }
  };

  useEffect(() => {
    getStatistik();
    getNewestManifest();
  }, []);

  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <TopClientDashboard />
      <div className="px-6 w-full md:w-auto flex lg:hidden flex-row items-center justify-between lg:flex-col lg:items-start bg-green-400 h-10 lg:justify-center rounded-md">
        <p className="text-xs lg:text-sm text-gray-900">Kredit anda</p>
        <h3 className="font-bold text-xs lg:text-sm leading-none dark:text-gray-900">
          {formatNumber(parseFloat(cookies.get("totalCreadits") ?? "0"))} Kredit
        </h3>
      </div>
      <Separator className="dark:bg-white bg-gray-500" />
      <div className="w-full transition-all flex flex-col gap-4">
        <div className="w-full gap-4 grid-cols-2 md:grid-cols-3 grid">
          <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 lg:p-6 gap-4 col-span-2 md:col-span-1 shadow">
            <div className="flex justify-between pb-2 border-b border-gray-500">
              <h5>Total Resi</h5>
              <Package className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
            </div>
            <p className="font-bold text-sm sm:text-xl">
              {statistik.total_delivered}{" "}
              <span className="font-semibold text-xs sm:text-base">Resi</span>
            </p>
          </Card>
          <div className="flex w-full col-span-2 grid-cols-2 gap-4">
            <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 lg:p-6 gap-4 shadow">
              <div className="flex justify-between pb-2 border-b border-gray-500">
                <h5>On Progress</h5>
                <Truck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
              </div>
              <p className="font-bold text-sm sm:text-xl">
                {statistik.total_on_progress + " "}
                <span className="font-semibold text-xs sm:text-base">Resi</span>
              </p>
            </Card>
            <Card className="w-full text-xs sm:text-sm justify-center flex flex-col p-2 sm:p-4 lg:p-6 gap-4 shadow">
              <div className="flex justify-between pb-2 border-b border-gray-500">
                <h5>Delivered</h5>
                <PackageCheck className="sm:w-5 sm:h-5 w-4 h-4 stroke-1" />
              </div>
              <p className="font-bold text-sm sm:text-xl">
                {statistik.total_delivered + " "}
                <span className="font-semibold text-xs sm:text-base">Resi</span>
              </p>
            </Card>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="w-full xl:w-7/12 ">
            <Card className="pr-2 pt-2 md:p-2 lg:p-4 rounded-md flex flex-col gap-y-4 h-[200px] sm:h-[250px] lg:h-[350px] md:h-[300px] shadow">
              <ChartClient />
            </Card>
          </div>
          <div className="w-full xl:w-5/12 ">
            <Card className="p-4 rounded-md flex flex-col gap-y-4 h-auto shadow">
              <div>
                <p className="sm:text-xl text-lg font-semibold">
                  Manifest Terbaru
                </p>
                <p className="sm:text-sm text-xs font-light text-gray-700 dark:text-gray-300">
                  Daftar Manifest Terbaru.
                </p>
                <ul className="pt-4 space-y-2 md:space-y-4 w-full">
                  {newManifest.map((item) => (
                    <li
                      className="flex text-sm justify-between items-center py-2 w-full"
                      key={item.id}
                    >
                      <div className="flex gap-4 items-center w-full">
                        <div className="md:w-10 md:h-10 w-8 h-8 rounded-full border flex items-center justify-center border-gray-500 text-gray-500 dark:text-gray-300 flex-none">
                          {item.status === "delivered" ? (
                            <PackageCheck className="md:w-5 md:h-5 w-4 h-4 stroke-[1.5]" />
                          ) : (
                            <Truck className="md:w-5 md:h-5 w-4 h-4 stroke-[1.5]" />
                          )}
                        </div>
                        <div className="flex w-full justify-between flex-col md:flex-row overflow-hidden md:items-center md:gap-6">
                          <h5 className="font-semibold text-base sm:text-lg lg:text-xl">
                            {item.waybill.waybill}
                          </h5>
                          <div className="flex flex-col md:items-end border-t border-gray-500 md:border-none mt-1 pt-1 md:p-0 md:m-0 overflow-hidden whitespace-nowrap w-full">
                            <p className="sm:text-sm text-xs font-medium lg:text-base capitalize w-full md:text-end text-ellipsis overflow-hidden">
                              {item.note}
                            </p>
                            <p className="lg:text-sm text-xs font-light">
                              {format(
                                new Date(item.date_manifest),
                                "dd MMM yyyy - HH:mm:ss",
                                { locale: id }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
