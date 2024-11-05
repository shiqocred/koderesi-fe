"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { baseUrl, cn, formatRupiah } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Minus,
  Plus,
  Save,
} from "lucide-react";

interface InputNewProps {
  kredit?: number;
  harga?: number;
  hargaSatuan?: number;
  isPopular: boolean | "indeterminate";
  jenis: "once" | "monthly" | "yearly";
  keterangan: string[];
}

export const EditKreditModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "edit-credit";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const [inputNew, setInputNew] = useState<InputNewProps>({
    kredit: undefined,
    harga: undefined,
    hargaSatuan: undefined,
    jenis: "once",
    isPopular: false,
    keterangan: [""],
  });

  const handleReset = () => {
    setInputNew({
      kredit: undefined,
      harga: undefined,
      hargaSatuan: undefined,
      jenis: "once",
      isPopular: false,
      keterangan: [""],
    });
  };

  const onChangeNewKeterangan = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newKeterangan = [...inputNew.keterangan];
    newKeterangan[index] = event.target.value;
    setInputNew({
      ...inputNew,
      keterangan: newKeterangan,
    });
  };

  const addKeterangan = () => {
    setInputNew({
      ...inputNew,
      keterangan: [...inputNew.keterangan, ""],
    });
  };

  const removeKeterangan = (index: number) => {
    const newKeterangan = inputNew.keterangan.filter((_, i) => i !== index);
    setInputNew({
      ...inputNew,
      keterangan: newKeterangan,
    });
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    const body = new FormData();
    if (inputNew.keterangan) {
      for (const element of inputNew.keterangan) {
        body.append("descriptions[]", element);
      }
    }
    body.append("total_credits", inputNew.kredit?.toString() ?? "");
    body.append("price_credit", inputNew.harga?.toString() ?? "");
    body.append("price_one_credit", inputNew.hargaSatuan?.toString() ?? "");
    body.append("is_popular", `${inputNew.isPopular}`);

    try {
      const res = await axios.put(
        `${baseUrl}/superadmin/price/update/${data.id}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Kredit Diupdate");
        cookies.set("kredit updated", "1");
        setInputNew({
          jenis: "once",
          kredit: 0,
          harga: 0,
          hargaSatuan: 0,
          isPopular: false,
          keterangan: [""],
        });
        onClose();
      } else {
        toast.success("Kredit Gagal Diupdate");
      }
    } catch (error) {
      toast.success("Kredit Gagal Diupdate");
      console.log("[ERROR_KREDIT_UPDATE]:", error);
    }
  };

  const moveUp = (index: number) => {
    if (index <= 0) return; // Jika elemen sudah di atas, tidak bisa naik lagi
    const newItems = [...inputNew.keterangan];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ]; // Swap
    setInputNew((prev) => ({ ...prev, keterangan: newItems }));
  };

  // Fungsi untuk mengubah urutan elemen turun
  const moveDown = (index: number) => {
    if (index >= inputNew.keterangan.length - 1) return; // Jika elemen sudah di bawah, tidak bisa turun lagi
    const newItems = [...inputNew.keterangan];
    [newItems[index + 1], newItems[index]] = [
      newItems[index],
      newItems[index + 1],
    ]; // Swap
    setInputNew((prev) => ({ ...prev, keterangan: newItems }));
  };

  useEffect(() => {
    if (isModalOpen && data) {
      setInputNew(data);
    }
  }, [data, isModalOpen]);

  return (
    <Modal
      title="Edit Kredit Baru"
      description=""
      isOpen={isModalOpen}
      className="md:max-w-5xl"
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <div className="flex flex-col gap-6 rounded-md">
        <div className="flex items-center gap-2 border px-5 rounded-md justify-between bg-gray-200 dark:bg-gray-800 mt-5 mb-6">
          <h5 className="font-light text-sm">Jenis Kredit</h5>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-24 justify-between p-0 bg-transparent hover:bg-transparent text-black dark:text-white rounded-none font-semibold text-sm underline">
                {inputNew.jenis === "once" && "Sekali Beli"}
                {inputNew.jenis === "monthly" && "Bulanan"}
                {inputNew.jenis === "yearly" && "Tahunan"}
                <ChevronDown className="w-4 h-4 ml-2 flex-none" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
              <Command>
                <CommandGroup>
                  <CommandList>
                    <CommandItem
                      className="gap-2"
                      onSelect={() =>
                        setInputNew((prev) => ({ ...prev, jenis: "once" }))
                      }
                    >
                      <Checkbox
                        checked={inputNew.jenis === "once"}
                        onCheckedChange={() =>
                          setInputNew((prev) => ({
                            ...prev,
                            jenis: "once",
                          }))
                        }
                      />
                      Sekali Beli
                    </CommandItem>
                    <CommandItem
                      className="gap-2"
                      onSelect={() =>
                        setInputNew((prev) => ({ ...prev, jenis: "monthly" }))
                      }
                    >
                      <Checkbox
                        checked={inputNew.jenis === "monthly"}
                        onCheckedChange={() =>
                          setInputNew((prev) => ({
                            ...prev,
                            jenis: "monthly",
                          }))
                        }
                      />
                      Bulanan
                    </CommandItem>
                    <CommandItem
                      className="gap-2"
                      onSelect={() =>
                        setInputNew((prev) => ({ ...prev, jenis: "yearly" }))
                      }
                    >
                      <Checkbox
                        checked={inputNew.jenis === "yearly"}
                        onCheckedChange={() =>
                          setInputNew((prev) => ({
                            ...prev,
                            jenis: "yearly",
                          }))
                        }
                      />
                      Tahunan
                    </CommandItem>
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <form onSubmit={handleCreate} className="w-full gap-6 flex flex-col">
          <div className="flex gap-6 w-full flex-col md:flex-row">
            <div className="flex flex-col gap-6 items-start w-full">
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.kredit)) ||
                      inputNew.kredit?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Total Kredit
                </Label>
                <Input
                  value={inputNew.kredit}
                  onChange={(e) =>
                    setInputNew((prev) => ({
                      ...prev,
                      kredit: parseFloat(e.target.value),
                    }))
                  }
                  type="number"
                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                />
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.harga)) ||
                      inputNew.harga?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Harga Kredit
                </Label>
                <div className="relative">
                  <Input
                    value={inputNew.harga}
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        harga: parseFloat(e.target.value),
                      }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <p className="absolute top-4 right-3 text-xs text-gray-500">
                    {isNaN(Number(inputNew.harga))
                      ? formatRupiah(0)
                      : formatRupiah(inputNew.harga ?? 0)}
                  </p>
                </div>
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.hargaSatuan)) ||
                      inputNew.hargaSatuan?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Harga perkredit
                </Label>
                <div className="relative">
                  <Input
                    value={inputNew.hargaSatuan}
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        hargaSatuan: parseFloat(e.target.value),
                      }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <p className="absolute top-4 right-3 text-xs text-gray-500">
                    {isNaN(Number(inputNew.hargaSatuan))
                      ? formatRupiah(0)
                      : formatRupiah(inputNew.hargaSatuan ?? 0)}
                  </p>
                </div>
              </div>
              <Label className="h-10 w-full md:flex items-center hidden">
                <Checkbox
                  checked={inputNew.isPopular}
                  onCheckedChange={(e) =>
                    setInputNew((prev) => ({ ...prev, isPopular: e }))
                  }
                />
                <p className="ml-2">Jadikan Populer</p>
              </Label>
            </div>
            <div className="flex flex-col gap-6 items-start w-full">
              <div className="w-full flex flex-col gap-6 relative">
                {inputNew.keterangan.map((keterangan, index) => (
                  <div className="w-full flex " key={`cell-${index}`}>
                    <Button
                      onClick={() => moveUp(index)}
                      type="button"
                      disabled={index === 0}
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent p-0 h-9 w-9 flex-none hover:bg-gray-100"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => moveDown(index)}
                      disabled={index === inputNew.keterangan.length - 1}
                      type="button"
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent p-0 h-9 w-9 flex-none hover:bg-gray-100 mr-2"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <div className="space-y-0.5 md:space-y-1 relative w-full">
                      <Label
                        className={cn(
                          "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                          keterangan.length === 0
                            ? "translate-y-3.5 left-3 font-normal"
                            : "-translate-y-3 left-0 font-light"
                        )}
                      >
                        Keterangan
                      </Label>
                      <div className="flex items-end gap-2">
                        <Input
                          value={keterangan}
                          onChange={(e) => onChangeNewKeterangan(index, e)}
                          className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                        />
                        <Button
                          onClick={() => removeKeterangan(index)}
                          disabled={inputNew.keterangan.length === 1}
                          type="button"
                          className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={addKeterangan}
                  type="button"
                  className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9 flex border border-gray-400 dark:border-gray-600"
                >
                  <Plus className="w-4 h-4 mr-2 -ml-4" />
                  Tambah Keterangan
                </Button>
              </div>
              <Label className="h-10 w-full flex items-center md:hidden">
                <Checkbox
                  checked={inputNew.isPopular}
                  onCheckedChange={(e) =>
                    setInputNew((prev) => ({ ...prev, isPopular: e }))
                  }
                />
                <p className="ml-2">Jadikan Populer</p>
              </Label>
            </div>
          </div>

          <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
            <p className="text-sm dark:text-gray-300">
              Periksa terlebih dahulu sebelum konfirmasi.
            </p>
            <div className="flex items-center">
              <Button
                type="submit"
                className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
              >
                <Save className="w-4 h-4  mr-2" />
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
