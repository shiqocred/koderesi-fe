"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { data } from "@/lib/utils";

export const SaveManifestModal = () => {
  const { isOpen, onClose, type, dataManifest } = useModal();

  const isModalOpen = isOpen && type === "save-manifest";

  const [kode, setKode] = useState<string | string[]>("");
  const [dataResi, setDataResi] = useState<any | null>(null);

  const handleSearch = () => {
    setDataResi(data.find((item) => item.kode_resi === dataManifest?.resiKode));
  };

  useEffect(() => {
    if (dataManifest) {
      setKode(dataManifest?.resiKode);
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
        <div className="flex w-full h-full bg-gray-100 rounded dark:bg-gray-800/40 dark:bg-gray-800 mt-2 text-sm">
          <div className="w-20 md:w-36 flex justify-end pr-4 border-r py-4 border-gray-500 gap-x-1">
            <div>{dataManifest?.tanggal}</div>-<div>{dataManifest?.waktu}</div>
          </div>
          <div className="py-4 flex items-center px-4">
            {dataManifest?.manifest}
          </div>
        </div>
        <div className="mt-4 w-full">
          <div className="flex items-end gap-x-4 w-full">
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
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              Check
            </Button>
          </div>
        </div>
        <div className="w-full min-h-16 border-dashed rounded-md flex items-center justify-center border-2 text-sm mt-4">
          {!dataResi ? "Data not found." : <div>{dataResi.kode_resi}</div>}
        </div>
        <div className="flex w-full gap-x-2 mt-4">
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => {
              onClose();
              setDataResi(null);
              setKode("");
            }}
          >
            Batal
          </Button>
          <Button
            className="w-full bg-green-400 hover:bg-green-500 text-black"
            disabled={!dataResi}
          >
            Tambah
          </Button>
        </div>
      </div>
    </Modal>
  );
};
