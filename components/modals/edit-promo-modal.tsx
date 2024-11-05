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
  CalendarIcon,
  ChevronDown,
  Minus,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import Image from "next/image";
import { id } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

interface InputNewProps {
  image: FileList | null;
  judul?: string;
  kredit?: number;
  harga?: number;
  hargaPromo?: number;
  date?: DateRange;
  keterangan: string[];
}

export const EditPromoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "edit-promo";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const bannerURL = data?.banner;

  const [inputNew, setInputNew] = useState<InputNewProps>({
    image: null,
    judul: undefined,
    kredit: undefined,
    harga: undefined,
    hargaPromo: undefined,
    date: {
      from: new Date(),
      to: addDays(new Date(), 20),
    },
    keterangan: [""],
  });

  const handleReset = () => {
    setInputNew({
      image: null,
      judul: undefined,
      kredit: undefined,
      harga: undefined,
      hargaPromo: undefined,
      date: {
        from: new Date(),
        to: addDays(new Date(), 20),
      },
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
    if (inputNew.image) {
      body.append("banner", inputNew.image[0]);
    }
    body.append("title", inputNew.judul ?? "");
    body.append("total_credits", inputNew.kredit?.toString() ?? "");
    body.append("before_discount", inputNew.harga?.toString() ?? "");
    body.append("after_discount", inputNew.hargaPromo?.toString() ?? "");
    body.append(
      "date_start",
      format(inputNew.date?.from ?? new Date(), "yyyy-MM-dd") ?? ""
    );
    body.append(
      "date_end",
      format(inputNew.date?.to ?? new Date(), "yyyy-MM-dd") ?? ""
    );

    try {
      const res = await axios.put(
        `${baseUrl}/superadmin/promo/update/${data.id}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Promo Diupdate");
        cookies.set("promo updated", "1");
        handleReset();
        onClose();
      } else {
        toast.success("Promo Gagal Diupdate");
      }
    } catch (error) {
      toast.success("Kredit Gagal Diupdate");
      console.log("[ERROR_PROMO_UPDATE]:", error);
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
      title="Edit Promo"
      description=""
      isOpen={isModalOpen}
      className="lg:max-w-5xl"
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <div className="flex flex-col gap-6 rounded-md">
        <form onSubmit={handleCreate} className="w-full gap-4 flex flex-col">
          <div className="flex items-start flex-col gap-6 w-full">
            <div className="w-full">
              {!bannerURL &&
                (!inputNew.image || inputNew.image.length === 0) && (
                  <Label className="w-full aspect-[4/1] bg-transparent rounded overflow-hidden border border-green-400 hover:border-green-500 flex items-center justify-center group flex-col">
                    <div className="flex items-center mt-2 group-hover:text-black text-black/80 group-hover:dark:text-white dark:text-white/80">
                      <Plus className="w-5 h-5 mr-2" />
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
              {bannerURL &&
                (!inputNew.image || inputNew.image.length === 0) && (
                  <Label className="w-full aspect-[4/1] bg-transparent rounded overflow-hidden border border-green-400 hover:border-green-500 flex items-center justify-center group flex-col relative">
                    <div className="z-20 w-full h-full group-hover:backdrop-blur-sm flex items-center justify-center flex-col group-hover:bg-white/30">
                      <div className="items-center mt-2 group-hover:text-black group-hover:flex hidden transition-all group-hover:dark:text-white dark:text-white/80">
                        <Plus className="w-5 h-5 mr-2" />
                        <p className="text-lg">Add Banner</p>
                      </div>
                      <p className="text-xs font-light italic text-gray-800 group-hover:flex hidden transition-all">
                        (Rekomendasi Resolusi 4:1)
                      </p>
                    </div>
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
                    <Image
                      src={bannerURL}
                      alt=""
                      fill
                      className="object-cover object-center"
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
            </div>
            <div className="w-full flex gap-4 flex-col lg:flex-row">
              <div className="w-full gap-6 flex flex-col">
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
                        <Button className="justify-between w-full bg-transparent hover:bg-transparent rounded-none text-black dark:text-white border-green-400 focus-visible:border-green-400 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-b">
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
              </div>
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
            </div>
          </div>

          <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
            <p className="text-sm dark:text-gray-300">
              Periksa terlebih dahulu sebelum konfirmasi.
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => onClose()}
                className="transition-all bg-transparent hover:bg-transparent dark:text-gray-400 hover:underline font-normal text-gray-700"
              >
                <X className="w-4 h-4  mr-2" />
                Batal
              </Button>
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
