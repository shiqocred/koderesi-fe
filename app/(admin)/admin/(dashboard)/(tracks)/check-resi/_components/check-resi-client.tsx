"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  PackageCheck,
  RefreshCcw,
  Save,
  Search,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { archives, data } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal";

export const CheckResiClient = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isResi, setIsResi] = useState<boolean>(false);
  const [resi, setResi] = useState<string>("");
  const [dataResi, setDataResi] = useState<any | null>(null);
  const { onOpen } = useModal();

  const handleSearch = useCallback(
    (l: string) => {
      setIsResi(true);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        q: l,
      };

      const url = qs.stringifyUrl(
        {
          url: "/admin/check-resi",
          query: updateQuery,
        },
        { skipNull: true }
      );
      const dataArchive = archives.find((item) => item.kode_resi === l);
      if (dataArchive !== undefined) {
        setDataResi(dataArchive);
      } else {
        setDataResi(null);
      }
      const dataResi = data.find((item) => item.kode_resi === l);
      if (dataResi !== undefined) {
        setDataResi(dataResi);
      } else {
        setDataResi(null);
      }

      router.push(url);
    },
    [params, router]
  );

  useEffect(() => {
    if (params.get("q")) {
      setResi(params.get("q") ?? "");
      setIsResi(true);
      const dataArchive = archives.find(
        (item) => item.kode_resi === params.get("q")
      );
      if (dataArchive !== undefined) {
        setDataResi(dataArchive);
      } else {
        setDataResi(null);
      }
      const dataResi = data.find((item) => item.kode_resi === params.get("q"));
      if (dataResi !== undefined) {
        setDataResi(dataResi);
      } else {
        setDataResi(null);
      }
    }
  }, [params]);

  if (!params.get("q")) {
    return (
      <div className="w-full h-full justify-center items-center max-w-2xl flex mx-auto">
        <div className="flex flex-col items-center w-full gap-y-4 -mt-10">
          <h2 className="text-5xl font-bold">CHECK RESI</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(resi);
            }}
            className="flex w-full gap-x-2 items-center"
          >
            <Input
              placeholder="Kode resi..."
              value={resi}
              onChange={(e) => setResi(e.target.value)}
            />
            <Button type="submit" size={"icon"}>
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <Card className="p-4 flex flex-col w-full gap-6 h-full">
      <div className="flex flex-col gap-y-2">
        <Label>Check Resi</Label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(resi);
          }}
          className="flex w-full gap-x-2 items-center"
        >
          <Input
            placeholder="Kode resi..."
            value={resi}
            onChange={(e) => setResi(e.target.value)}
            readOnly={isResi}
          />
          {isResi ? (
            <Button type="button" size={"icon"}>
              <RefreshCcw
                className="w-4 h-4"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResi(false);
                }}
              />
            </Button>
          ) : (
            <Button type="submit" size={"icon"}>
              <Search className="w-4 h-4" />
            </Button>
          )}
        </form>
      </div>
      {dataResi ? (
        <div className="flex w-full gap-x-6">
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <div className=" flex flex-col text-xs md:text-sm bg-gray-50 dark:bg-gray-800 p-4 gap-2 rounded-md h-auto">
              <div className="flex justify-between ">
                <p>Titel:</p>
                <p className="font-semibold capitalize">
                  {dataResi?.keterangan}
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
                  {dataResi?.shipper.nama} - {dataResi?.shipper.origin}
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
                  {dataResi?.receiver.nama} - {dataResi?.receiver.destination}
                </h5>
                <p className="text-xs md:text-sm text-gray-500 mt-4">Alamat</p>
              </div>
            </div>
            {dataResi?.status === "delivered" && (
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
            </div>
            <div className="border rounded-md">
              <div className="flex h-full justify-between items-center even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
                <div className="flex">
                  <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                    <div>13 Feb</div>
                    <div>20.00</div>
                  </div>
                  <div className="py-4 flex items-center px-4">
                    Sedang transit di Solo
                  </div>
                </div>
                <div className="px-5">
                  <Button
                    size={"icon"}
                    onClick={() =>
                      onOpen("save-manifest", {
                        waktu: "20.00",
                        tanggal: "13 Feb",
                        manifest: "Sedang transit di Solo",
                        resiKode: params.get("q") || "",
                      })
                    }
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex h-full justify-between items-center even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
                <div className="flex">
                  <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                    <div>13 Feb</div>
                    <div>15.00</div>
                  </div>
                  <div className="py-4 flex items-center px-4">
                    Sedang Transit diJakarta
                  </div>
                </div>
                <div className="px-5">
                  <Button
                    size={"icon"}
                    onClick={() =>
                      onOpen("save-manifest", {
                        waktu: "15.00",
                        tanggal: "13 Feb",
                        manifest: "Sedang Transit diJakarta",
                        resiKode: params.get("q") || "",
                      })
                    }
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex h-full justify-between items-center even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800">
                <div className="flex">
                  <div className="w-20 md:w-32 flex flex-col items-end pr-4 border-r py-4 border-gray-500">
                    <div>13 Feb</div>
                    <div>13.00</div>
                  </div>
                  <div className="py-4 flex items-center px-4">
                    Manifest dibuat
                  </div>
                </div>
                <div className="px-5">
                  <Button
                    size={"icon"}
                    onClick={() =>
                      onOpen("save-manifest", {
                        waktu: "13.00",
                        tanggal: "13 Feb",
                        manifest: "Manifest dibuat",
                        resiKode: params.get("q") || "",
                      })
                    }
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Data not found.</div>
      )}
    </Card>
  );
};
