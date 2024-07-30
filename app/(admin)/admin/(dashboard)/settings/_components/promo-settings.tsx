"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronDown,
  Edit3,
  Minus,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn, formatRupiah } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { id } from "date-fns/locale";

interface InputNewProps {
  image: FileList | null;
  judul?: string;
  kredit?: number;
  harga?: number;
  hargaPromo?: number;
  date?: DateRange;
  keterangan: string[];
}

export const PromoSettings = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [inputNew, setInputNew] = useState<InputNewProps>({
    image: null,
    judul: undefined,
    kredit: undefined,
    harga: undefined,
    hargaPromo: undefined,
    date: {
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    },
    keterangan: [""],
  });

  console.log(inputNew.image);

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

  const handleCreate = async () => {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-4 bg-transparent border-gray-500 border flex-col md:flex-row">
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold">Promo Kredit</h2>
        <p className="font-light">Promo kredit.</p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border md:p-5 p-3 flex flex-col gap-6 rounded-md border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-lg">Buat Promo Baru</h5>
          </div>
          <form onSubmit={handleCreate} className="w-full gap-4 flex flex-col">
            <div className="flex items-start flex-col gap-6 w-full">
              {(!inputNew.image || inputNew.image.length === 0) && (
                <Label className="w-full aspect-[4/1] bg-transparent rounded overflow-hidden border border-green-400 hover:border-green-500 flex items-center justify-center group flex-col">
                  <div className="flex items-center mt-2">
                    <Plus className="w-5 h-5 group-hover:text-black text-black/80 mr-2" />
                    <p className="text-lg">Add Banner</p>
                  </div>
                  <p className="text-xs font-light italic text-gray-500">
                    (Rekomendasi Resolusi 4:1)
                  </p>
                  <Input
                    className="hidden"
                    type="file"
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        image: e.target.files,
                      }))
                    }
                  />
                </Label>
              )}
              {inputNew?.image && inputNew.image.length > 0 && (
                <div className="w-full aspect-[4/1] bg-transparent rounded overflow-hidden border border-green-400 hover:border-green-500 flex items-center justify-center group flex-col relative">
                  <Button
                    type="button"
                    onClick={() =>
                      setInputNew((prev) => ({ ...prev, image: null }))
                    }
                    className="z-10 rounded-full absolute right-1 top-1 w-9 h-9 px-0 bg-transparent group-hover:border group-hover:border-gray-500 group-hover:bg-white transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                  <Image
                    src={URL.createObjectURL(inputNew.image[0])}
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    !inputNew.judul || inputNew.judul === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                  htmlFor="judul"
                >
                  Judul Promo
                </Label>
                <Input
                  value={inputNew.judul}
                  onChange={(e) =>
                    setInputNew((prev) => ({
                      ...prev,
                      judul: e.target.value,
                    }))
                  }
                  id="judul"
                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                />
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.kredit)) ||
                      inputNew.kredit?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                  htmlFor="kredit"
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
                  id="kredit"
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
                  Harga Sebelum Diskon
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
                    isNaN(Number(inputNew.hargaPromo)) ||
                      inputNew.hargaPromo?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Harga Setelah Diskon
                </Label>
                <div className="relative">
                  <Input
                    value={inputNew.hargaPromo}
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        hargaPromo: parseFloat(e.target.value),
                      }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <p className="absolute top-4 right-3 text-xs text-gray-500">
                    {isNaN(Number(inputNew.hargaPromo))
                      ? formatRupiah(0)
                      : formatRupiah(inputNew.hargaPromo ?? 0)}
                  </p>
                </div>
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    !inputNew.date?.from?.getTime()
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  {inputNew.date?.from || inputNew.date?.to
                    ? "Tanggal Promo"
                    : "Pick a Date"}
                </Label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="justify-between w-full bg-transparent hover:bg-transparent rounded-none text-black border-green-400 focus-visible:border-green-400 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-b">
                        <p>
                          {inputNew.date?.from ? (
                            inputNew.date.to ? (
                              <>
                                {format(inputNew.date.from, "LLL dd, y", {
                                  locale: id,
                                })}{" "}
                                -{" "}
                                {format(inputNew.date.to, "LLL dd, y", {
                                  locale: id,
                                })}
                              </>
                            ) : (
                              format(inputNew.date.from, "LLL dd, y", {
                                locale: id,
                              })
                            )
                          ) : (
                            <span></span>
                          )}
                        </p>
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="range"
                        initialFocus
                        defaultMonth={inputNew.date?.from}
                        selected={inputNew.date}
                        onSelect={(e) =>
                          setInputNew((prev) => ({
                            ...prev,
                            date: { from: e?.from, to: e?.to },
                          }))
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {inputNew.keterangan.map((keterangan, index) => (
                <div
                  className="space-y-0.5 md:space-y-1 relative w-full group"
                  key={`cell-${index}`}
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
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9 group-last:hidden"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={addKeterangan}
                      type="button"
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9 hidden group-last:flex"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
        <div className="border md:p-5 p-3 flex flex-col gap-6 rounded-md border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-lg">Promo-Promo</h5>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="flex col-span-1 p-2 border rounded-md flex-col text-xs border-gray-300 bg-gradient-to-tl from-gray-300/30 to-gray-300/0 relative group"
              >
                <div className="flex flex-col bg-white/5 backdrop-blur-sm w-full h-full items-center absolute top-0 left-0 gap-2 opacity-0 group-hover:opacity-100 z-10 justify-center">
                  <Button className="border border-black bg-yellow-400 hover:bg-yellow-400/80 text-black">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button className="border border-black bg-red-500 hover:bg-red-500/80 text-black transition-all">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                </div>
                <div className="relative w-full aspect-[4/1] rounded overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1708162665956-98da095550ea?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-3">Ini Judul</h3>
                <p>3 Juni 2024 - 4 Juni 2024</p>
                <div className="flex w-full justify-between mt-3">
                  <p>3500 Kredit</p>
                  <p className="font-semibold text-sm">
                    {formatRupiah(1200000)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
