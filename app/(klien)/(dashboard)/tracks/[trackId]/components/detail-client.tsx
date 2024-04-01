"use client";

import { Button } from "@/components/ui/button";
import { ArchiveDataProps, archives, cn, data } from "@/lib/utils";
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

export const DetailClient = () => {
  const { trackId } = useParams();
  const [dataDetail, setDataDetail] = useState<ArchiveDataProps | undefined>();

  useEffect(() => {
    const dataArchive = archives.find((item) => item.id === trackId);
    if (dataArchive !== undefined) setDataDetail(dataArchive);
    const dataResi = data.find((item) => item.id === trackId);
    if (dataResi !== undefined) setDataDetail(dataResi);
  }, [trackId]);
  return (
    <>
      <div className="flex justify-between pb-4 border-b items-end md:items-center">
        <div className="flex items-center">
          <Link href={"/tracks"}>
            <Button size={"icon"} variant={"ghost"} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <p className="text-sm md:text-base mb-4 md:mb-0">Detail Resi</p>
            <div className="flex sm:gap-4 sm:items-center flex-col sm:flex-row items-start">
              <h2 className="text-2xl md:text-4xl font-bold">
                {dataDetail?.kode_resi}
              </h2>
              <span
                className={cn(
                  "px-4 py-1 rounded-md text-gray-900 text-xs md:text-sm capitalize font-semibold",
                  dataDetail?.status === "on_progress" && "bg-yellow-300",
                  dataDetail?.status === "delivered" && "bg-green-300"
                )}
              >
                {dataDetail?.status === "on_progress"
                  ? "on progress"
                  : dataDetail?.status}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant={"destructive"}
            className="w-8 h-8 md:h-10 md:w-auto p-0 md:px-4 md:py-2"
          >
            <Trash2 className="w-4 h-4 md:mr-2" />
            <p className="hidden md:flex">Hapus</p>
          </Button>
        </div>
      </div>
      <Card className="p-4 flex flex-col lg:flex-row w-full gap-6 h-full">
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          <div className=" flex flex-col text-xs md:text-sm bg-gray-50 dark:bg-gray-800 p-4 gap-2 rounded-md h-auto">
            <div className="flex justify-between ">
              <p>Titel:</p>
              <p className="font-semibold capitalize">
                {dataDetail?.keterangan}
              </p>
            </div>
            <div className="flex justify-between ">
              <p>Dibuat Pada:</p>
              <p>3 Feb - 13.00</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md h-auto">
            <div>
              <p className="text-xs md:text-sm font-semibold">Pengirim</p>
              <h5 className="capitalize font-semibold md:text-lg text-base">
                {dataDetail?.shipper.nama} - {dataDetail?.shipper.origin}
              </h5>
              <p className="text-xs md:text-sm text-gray-500 mt-4">Alamat</p>
            </div>
            <div className="flex items-center gap-4">
              <Separator className="flex-1 dark:bg-gray-300 bg-gray-500" />
              <ArrowDown className="md:w-5 md:h-5 w-4 h-4 text-gray-500 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold">Penerima</p>
              <h5 className="capitalize font-semibold md:text-lg text-base">
                {dataDetail?.receiver.nama} - {dataDetail?.receiver.destination}
              </h5>
              <p className="text-xs md:text-sm text-gray-500 mt-4">Alamat</p>
            </div>
          </div>
          {dataDetail?.status === "delivered" && (
            <div className="flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-md h-auto">
              <div>
                <div className="flex gap-2 items-center">
                  <PackageCheck className="w-5 h-5 text-green-500" />
                  <p className="font-semibold text-xs md:text-sm">
                    Diterima oleh:
                  </p>
                </div>
                <Separator className="bg-gray-500 dark:bg-gray-300 mt-2" />
                <div className="flex justify-between items-center mt-4">
                  <h5 className="capitalize font-semibold md:text-lg text-base">
                    Ahmad Fulan
                  </h5>
                  <p className="text-xs md:text-sm">13 Feb - 13.00</p>
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
            <div className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
              <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                <div>13 Feb</div>
                <div>13.00</div>
              </div>
              <div className="py-4 flex items-center px-4">
                Sedang transit di Solo
              </div>
            </div>
            <div className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
              <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                <div>13 Feb</div>
                <div>15.00</div>
              </div>
              <div className="py-4 flex items-center px-4">
                Sedang Transit diJakarta
              </div>
            </div>
            <div className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
              <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                <div>13 Feb</div>
                <div>20.00</div>
              </div>
              <div className="py-4 flex items-center px-4">Manifest dibuat</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
