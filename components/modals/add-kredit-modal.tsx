"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { cn, formatRupiah } from "@/lib/utils";
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
import { ChevronDown, Minus, Plus, Save } from "lucide-react";

interface InputNewProps {
  kredit?: number;
  harga?: number;
  hargaSatuan?: number;
  jenis: "once" | "monthly" | "yearly";
  keterangan: string[];
}

export const AddKreditModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "add-credit";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const [inputNew, setInputNew] = useState<InputNewProps>({
    kredit: undefined,
    harga: undefined,
    hargaSatuan: undefined,
    jenis: "once",
    keterangan: [""],
  });

  const handleReset = () => {
    setInputNew({
      kredit: undefined,
      harga: undefined,
      hargaSatuan: undefined,
      jenis: "once",
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
    body.append("type", inputNew.jenis);

    try {
      const res = await axios.post(
        `https://koderesi.raventech.my.id/api/superadmin/price/store`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Kredit Dibuat");
        cookies.set("kredit updated", "1");
        setInputNew({
          jenis: "once",
          kredit: 0,
          harga: 0,
          hargaSatuan: 0,
          keterangan: [""],
        });
        onClose();
      } else {
        toast.success("Kredit Gagal Dibuat");
      }
    } catch (error) {
      toast.success("Kredit Gagal Dibuat");
      console.log("[ERROR_KREDIT_CREATE]:", error);
    }
  };

  return (
    <Modal
      title="Tambah Kredit Baru"
      description=""
      isOpen={isModalOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <div className="flex flex-col gap-6 rounded-md">
        <div className="flex items-center gap-2 border px-5 rounded-md justify-between bg-gray-200 dark:bg-gray-800 mt-5">
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
        <form onSubmit={handleCreate} className="w-full gap-4 flex flex-col">
          <div className="flex items-start flex-col gap-6 w-full">
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
            {inputNew.keterangan.map((keterangan, index) => (
              <div
                className="space-y-0.5 md:space-y-1 relative w-full group"
                key={index}
              >
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    inputNew.keterangan[0].length === 0
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Keterangan
                </Label>
                <div className="flex items-end gap-2">
                  <Input
                    value={inputNew.keterangan[index]}
                    onChange={(e) => onChangeNewKeterangan(index, e)}
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <Button
                    onClick={() => removeKeterangan(index)}
                    type="button"
                    className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white hover:bg-transparent py-0 h-9 group-last:hidden"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={addKeterangan}
                    type="button"
                    className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white hover:bg-transparent py-0 h-9 hidden group-last:flex"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 mt-5">
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