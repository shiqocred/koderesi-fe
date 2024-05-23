"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { ManifestProps, useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { data, formatTanggal, formatWaktu } from "@/lib/utils";

export const SaveManifestModal = () => {
  const { isOpen, onClose, type, dataManifest } = useModal();

  const isModalOpen = isOpen && type === "save-manifest";

  const [kode, setKode] = useState<string | string[]>("");
  const [dataResi, setDataResi] = useState<ManifestProps>();

  // const handleSearch = () => {
  //   setDataResi(data.find((item) => item.kode_resi === dataManifest?.resiKode));
  // };

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
          onSubmit={(e) => {
            e.preventDefault();
          }}
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
