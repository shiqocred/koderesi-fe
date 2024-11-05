"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Modal } from "./modal";
import { ManifestProps, useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { baseUrl, data, formatTanggal, formatWaktu } from "@/lib/utils";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";
import { AlertCircle, X } from "lucide-react";

export const SaveManifestModal = () => {
  const { isOpen, onClose, type, dataManifest } = useModal();

  const isModalOpen = isOpen && type === "save-manifest";

  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const [kode, setKode] = useState<string | string[]>("");
  const [dataResi, setDataResi] = useState<ManifestProps>();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${baseUrl}/api/superadmin/waybill/check-resi/${kode}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success(`Resi ${kode} ditemukan`);
    } catch (error: any) {
      console.log("[ERROR_GET_DETAIL]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Resi {kode} tidak ditemukan.
                </h5>
                {error.response.data.error && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.error}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    }
  };

  useEffect(() => {
    if (dataManifest) {
      setKode(dataManifest?.waybill_id);
    }
  }, [dataManifest]);

  return (
    <Modal
      title="Tambah Manifest Baru"
      description="Tambah manifest untuk pengguna."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800 items-center text-sm rounded-md">
          <div className="w-24 md:w-32 flex flex-col pr-2 pl-1 md:pl-2 md:pr-4 border-r py-4 border-gray-500 flex-none text-end text-xs md:text-sm h-full justify-center">
            <p>
              {dataManifest?.date_manifest &&
                formatTanggal(dataManifest?.date_manifest)}
            </p>
            <p>
              {dataManifest?.date_manifest &&
                formatWaktu(dataManifest?.date_manifest)}
            </p>
          </div>
          <div className="py-4 flex items-center px-4 justify-between w-full">
            {dataManifest?.note}
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className="mt-4 flex items-end gap-x-4 w-full"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="kodeResi">Kode Resi</Label>
            <Input
              placeholder="kode resi..."
              id="kodeResi"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
            />
          </div>
          <Button
            className="bg-green-400 hover:bg-green-500 text-black"
            type="submit"
          >
            Check
          </Button>
        </form>
        <div className="w-full min-h-16 border-dashed rounded-md flex items-center justify-center border-2 text-sm mt-4">
          {!dataResi ? "Data not found." : <div>{dataResi.waybill_id}</div>}
        </div>
        <div className="flex w-full gap-2 mt-4 flex-col-reverse md:flex-row">
          <Button
            className="w-full md:w-1/4"
            variant={"secondary"}
            onClick={() => {
              onClose();
              setDataResi(undefined);
              setKode("");
            }}
          >
            Batal
          </Button>
          <Button
            className="w-full bg-green-400 hover:bg-green-500 text-black md:w-3/4"
            disabled={!dataResi}
          >
            Tambah
          </Button>
        </div>
      </div>
    </Modal>
  );
};
