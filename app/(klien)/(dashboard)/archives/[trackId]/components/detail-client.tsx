"use client";

import { Button } from "@/components/ui/button";
import {
  baseUrl,
  cn,
  formatTanggal,
  formatTanggalWaktu,
  formatWaktu,
} from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  PackageCheck,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import axios from "axios";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { mapCourier } from "@/components/modals/add-resi-modal";
import { useModal } from "@/hooks/use-modal";
import { useCookies } from "next-client-cookies";

interface DetailProps {
  id: string;
  waybill: string;
  title: string;
  courier: string;
  shipper: string;
  receiver: string;
  origin_address: string;
  destination_address: string;
  status: string;
  display_status: string;
  user_id: string;
  status_loop: string;
  created_at: string;
  updated_at: string;
  manifests: {
    id: string;
    note: string;
    status: string;
    user_id: string;
    waybill_id: string;
    date_manifest: string;
    created_at: string;
    updated_at: string;
  }[];
}

export const DetailClient = () => {
  const { trackId } = useParams();
  const [dataDetail, setDataDetail] = useState<DetailProps>();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const { onOpen } = useModal();

  const getDetail = async () => {
    const detail = await axios.get(`${baseUrl}/admin/waybill/show/${trackId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setDataDetail(detail.data.data);
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      <div className="flex gap-2 pb-4 border-b items-center w-full">
        <Link href={"/tracks"}>
          <Button variant={"ghost"} className="p-0 md:h-10 md:w-10 w-8 h-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="w-full">
          <p className="text-sm md:text-base mb-1 md:mb-0">Detail Resi</p>
          <div className="flex w-full justify-between items-center">
            <div className="flex sm:gap-4 sm:items-center flex-col sm:flex-row items-start">
              <h2 className="text-xl md:text-4xl font-bold">
                {dataDetail?.waybill}
              </h2>
              <span
                className={cn(
                  "md:px-4 md:py-1 py-0.5 px-2 rounded-sm md:rounded-md text-gray-900 text-xs md:text-sm capitalize font-semibold",
                  dataDetail?.status === "on_progress" && "bg-yellow-300",
                  dataDetail?.status === "delivered" && "bg-green-300"
                )}
              >
                {dataDetail?.status === "on-progress"
                  ? "on progress"
                  : dataDetail?.status}
              </span>
            </div>
            <Button
              variant={"destructive"}
              className="w-8 h-8 md:h-10 md:w-auto p-0 md:px-4 md:py-2"
              onClick={(e) => {
                e.preventDefault();
                onOpen("delete-resi");
              }}
            >
              <Trash2 className="w-4 h-4 md:mr-2" />
              <p className="hidden md:flex">Hapus</p>
            </Button>
          </div>
        </div>
      </div>
      <Card className="p-2 md:p-4 flex flex-col lg:flex-row w-full gap-6 h-full">
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          <div className=" flex flex-col text-xs md:text-sm bg-gray-50 dark:bg-gray-800 p-2 md:p-4 gap-2 rounded-md h-auto">
            <div className="flex justify-between ">
              <p>Judul:</p>
              <p className="font-semibold capitalize">{dataDetail?.title}</p>
            </div>
            <div className="flex justify-between ">
              <p>Kurir:</p>
              <p>
                {
                  mapCourier.find((item) => item.value === dataDetail?.courier)
                    ?.name
                }
              </p>
            </div>
            <div className="flex justify-between ">
              <p>Dibuat Pada:</p>
              <p>
                {dataDetail?.created_at &&
                  formatTanggalWaktu(dataDetail?.created_at)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 p-2 md:p-4 rounded-md h-auto">
            <div>
              <p className="text-xs md:text-sm font-semibold">Pengirim</p>
              <h5 className="capitalize font-semibold md:text-lg text-base">
                {dataDetail?.shipper}
              </h5>
              <p className="text-xs md:text-sm text-gray-500 mt-4">
                {dataDetail?.origin_address}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Separator className="flex-1 dark:bg-gray-300 bg-gray-500" />
              <ArrowDown className="md:w-5 md:h-5 w-4 h-4 text-gray-500 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold">Penerima</p>
              <h5 className="capitalize font-semibold md:text-lg text-base">
                {dataDetail?.receiver}
              </h5>
              <p className="text-xs md:text-sm text-gray-500 mt-4">
                {dataDetail?.destination_address}
              </p>
            </div>
          </div>
          {dataDetail?.status === "delivered" && (
            <div className="flex flex-col bg-gray-50 dark:bg-gray-800 p-2 md:p-4 rounded-md h-auto">
              <div>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <PackageCheck className="w-5 h-5 text-green-500" />
                    <p className="font-semibold text-xs md:text-sm">
                      Diterima pada:
                    </p>
                  </div>
                  <p className="text-xs md:text-sm">
                    {formatTanggalWaktu(
                      dataDetail?.manifests[0].date_manifest ??
                        "01-01-2000 00:00:00"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-3/5 sm:text-sm lg:text-base text-xs">
          <div className="flex md:justify-between flex-col md:flex-row items-start md:items-center pb-4">
            <span className="font-semibold text-lg mb-2 md:mb-0">
              Manifest Pengiriman
            </span>
            <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-4 text-gray-500">
              <div className="text-xs">
                <p>Pengecekan Terakhir</p>
                <p>3 Feb - 13.00</p>
              </div>
              <Button className="h-8 w-8 md:h-10 px-0 py-0 md:w-10">
                <RefreshCcw className="md:w-4 md:h-4 w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="border rounded-md">
            {dataDetail?.manifests.map((item) => (
              <div
                key={item.id}
                className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800"
              >
                <div className="w-24 md:w-32 flex flex-col pr-2 pl-1 md:pl-2 md:pr-4 border-r py-4 border-gray-500 flex-none text-end text-xs md:text-sm">
                  <p>{formatTanggal(item.date_manifest)}</p>
                  <p>{formatWaktu(item.date_manifest)}</p>
                </div>
                <div className="py-4 flex items-center px-4">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
