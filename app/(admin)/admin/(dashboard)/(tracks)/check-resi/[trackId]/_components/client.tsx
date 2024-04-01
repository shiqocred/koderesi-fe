"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { ArchiveDataProps, archives, data } from "@/lib/utils";
import { ArrowDown, PackageCheck, Save, Search } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const CheckResiIdClient = () => {
  const { trackId } = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  if (!trackId) {
    return redirect("/admin/check-resi");
  }

  const [resi, setResi] = useState("");
  const [dataResi, setDataResi] = useState<ArchiveDataProps>();

  const handleSearch = (resi: string) => {
    router.push(`/admin/check-resi/${resi}`);
  };

  useEffect(() => {
    setResi(trackId[0]);

    const dataTrackMap = data.find((item) => item.kode_resi === trackId);
    if (dataTrackMap !== undefined) setDataResi(dataTrackMap);
    const dataArchiveMap = archives.find((item) => item.kode_resi === trackId);
    if (dataArchiveMap !== undefined) setDataResi(dataArchiveMap);
  }, []);
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
          />
          <Button type="submit" size={"icon"}>
            <Search className="w-4 h-4" />
          </Button>
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
                        resiKode: resi,
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
                        resiKode: resi,
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
                        resiKode: resi,
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
