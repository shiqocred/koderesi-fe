"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Percent, PlusCircle, Trash2 } from "lucide-react";
import { cn, formatRupiah } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useModal } from "@/hooks/use-modal";
import { useCookies } from "next-client-cookies";
import axios from "axios";

interface PromoProps {
  id: string;
  banner: string | null;
  title: string;
  total_credits: number;
  before_discount: number;
  after_discount: number;
  date_start: string;
  date_end: string;
  descriptions: string[];
}

export const PromoSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const { onOpen } = useModal();
  const [promoActiveList, setPromoActiveList] = useState<PromoProps[]>([
    {
      id: "",
      banner: null,
      title: "",
      total_credits: 0,
      before_discount: 0,
      after_discount: 0,
      date_start: "",
      date_end: "",
      descriptions: [""],
    },
  ]);
  const [promoInactiveList, setPromoInactiveList] = useState<PromoProps[]>([
    {
      id: "",
      banner: null,
      title: "",
      total_credits: 0,
      before_discount: 0,
      after_discount: 0,
      date_start: "",
      date_end: "",
      descriptions: [""],
    },
  ]);

  const handleGetPromo = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/promo`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPromoActiveList(res.data.data.active);
      setPromoInactiveList(res.data.data.inactive);
    } catch (error) {
      console.log("[ERROR_PROMO_GET]:", error);
    }
  };

  useEffect(() => {
    if (cookies.get("promo updated")) {
      handleGetPromo();
      return cookies.remove("promo updated");
    }
  }, [cookies.get("promo updated")]);

  useEffect(() => {
    setIsMounted(true);
    handleGetPromo();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-4 bg-transparent border-gray-500 border flex-col">
      <div className="flex w-full items-center justify-between mb-3 md:mb-4 lg:mb-5">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Promo Kredit
          </h2>
          <p className="text-sm md:text-base font-light">
            Konfigurasi promo kredit.
          </p>
        </div>
        <Button
          onClick={() => onOpen("add-promo")}
          className="bg-green-400 dark:bg-green-500 hover:bg-green-400/80 dark:hover:bg-green-500/80 text-black w-10 p-0 md:w-auto md:px-4 md:py-2"
        >
          <PlusCircle className="w-4 h-4 m-0 md:mr-2" />
          <p className="hidden md:flex">Tambah Promo</p>
        </Button>
      </div>
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        <AccordionItem
          value="active"
          className="border border-gray-300 dark:border-gray-700 p-2 md:p-3 lg:p-4 xl:p-5 rounded-md"
        >
          <AccordionTrigger className="p-0">
            <div className="flex items-center">
              <div className="dark:bg-green-500 bg-green-300 flex items-center justify-center rounded-full h-8 w-8 mr-2 text-black">
                <Percent className="w-4 h-4" />
              </div>
              <h5 className="text-sm md:text-base lg:text-lg font-medium">
                List Promo Active
              </h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
              {/* {promoActiveList.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border p-3 w-full col-span-1 rounded-md border-gray-300 dark:border-gray-700 relative overflow-hidden"
                >
                  <div className="lg:flex -right-4 absolute -top-8 z-10 h-32 w-32 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all hover:backdrop-blur-sm items-center justify-center rounded-full hidden">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onOpen("edit-promo", {
                            judul: item.title,
                            kredit: item.total_credits,
                            harga: item.before_discount,
                            hargaPromo: item.after_discount,
                            date: {
                              from: new Date(item.date_start),
                              to: new Date(item.date_end),
                            },
                            keterangan: item.descriptions,
                            banner: item.banner,
                            id: item.id,
                          })
                        }
                        className="h-6 w-6 flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded-full group"
                      >
                        <Edit3 className="h-3 w-3 text-black" />
                      </button>
                      <button
                        onClick={() => onOpen("delete-promo", item.id)}
                        className="h-6 w-6 flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded-full group"
                      >
                        <Trash2 className="h-3 w-3 text-black" />
                      </button>
                    </div>
                  </div>
                  {item.banner ? (
                    <div className="relative w-full aspect-[4/1] rounded overflow-hidden">
                      <Image
                        src={item.banner}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/1] rounded overflow-hidden border shadow-sm">
                      <Image
                        src={"/images/no_image.webp"}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex w-full flex-col justify-center">
                    <div className="flex flex-col my-5 w-full text-center capitalize justify-center items-center">
                      <h3 className="text-lg font-semibold ">{item.title}</h3>
                      <p className="text-sm">
                        {item.date_start
                          ? format(new Date(item.date_start), "dd MMMM yyyy", {
                              locale: id,
                            })
                          : ""}{" "}
                        -{" "}
                        {item.date_end
                          ? format(new Date(item.date_end), "dd MMMM yyyy", {
                              locale: id,
                            })
                          : ""}
                      </p>
                    </div>
                    <div className="flex w-full bg-gray-200 dark:bg-gray-700 px-5 py-1.5 rounded-sm flex-col lg:flex-row items-center">
                      <div className="w-full flex flex-col">
                        <p className="text-xs">Total Kredit</p>
                        <p className="font-semibold">
                          {item.total_credits.toLocaleString()} Kredit
                        </p>
                      </div>
                      <div className="w-full flex flex-col lg:items-end mt-2 pt-2 border-t lg:border-none lg:m-0 lg:p-0 border-gray-300">
                        <p className="text-xs">Harga</p>
                        <div className="flex gap-2 items-center lg:flex-row-reverse">
                          <p className="font-semibold">
                            {formatRupiah(item.after_discount)}
                          </p>
                          <p className="text-xs line-through text-gray-500 dark:text-gray-300">
                            {formatRupiah(item.before_discount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 *:list-['-'] *:pl-2 px-3 mt-6 mb-3">
                      {item.descriptions.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 w-full mt-5 lg:hidden">
                    <button
                      onClick={() =>
                        onOpen("edit-promo", {
                          judul: item.title,
                          kredit: item.total_credits,
                          harga: item.before_discount,
                          hargaPromo: item.after_discount,
                          date: {
                            from: new Date(item.date_start),
                            to: new Date(item.date_end),
                          },
                          keterangan: item.descriptions,
                          banner: item.banner,
                          id: item.id,
                        })
                      }
                      className="h-8 w-full flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded group"
                    >
                      <Edit3 className="h-3 w-3 text-black" />
                      <p className="flex lg:hidden ml-2 text-sm text-black">
                        Edit
                      </p>
                    </button>
                    <button
                      onClick={() => onOpen("delete-promo", item.id)}
                      className="h-8 w-8 flex-none flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded group"
                    >
                      <Trash2 className="h-3 w-3 text-black" />
                    </button>
                  </div>
                </div>
              ))} */}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="inactive"
          className="border border-gray-300 dark:border-gray-700 p-2 md:p-3 lg:p-4 xl:p-5 rounded-md"
        >
          <AccordionTrigger className="p-0">
            <div className="flex items-center">
              <div className="dark:bg-red-500 bg-red-300 flex items-center justify-center rounded-full h-8 w-8 mr-2 text-black">
                <Percent className="w-4 h-4" />
              </div>
              <h5 className="text-sm md:text-base lg:text-lg font-medium">
                List Promo Inactive
              </h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
              {/* {promoInactiveList.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border p-3 w-full col-span-1 rounded-md border-gray-300 dark:border-gray-700 relative overflow-hidden"
                >
                  <div className="lg:flex -right-4 absolute -top-8 z-10 h-32 w-32 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all hover:backdrop-blur-sm items-center justify-center rounded-full hidden">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onOpen("edit-promo", {
                            judul: item.title,
                            kredit: item.total_credits,
                            harga: item.before_discount,
                            hargaPromo: item.after_discount,
                            date: {
                              from: new Date(item.date_start),
                              to: new Date(item.date_end),
                            },
                            keterangan: item.descriptions,
                            banner: item.banner,
                            id: item.id,
                          })
                        }
                        className="h-6 w-6 flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded-full group"
                      >
                        <Edit3 className="h-3 w-3 text-black" />
                      </button>
                      <button
                        onClick={() => onOpen("delete-promo", item.id)}
                        className="h-6 w-6 flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded-full group"
                      >
                        <Trash2 className="h-3 w-3 text-black" />
                      </button>
                    </div>
                  </div>
                  {item.banner ? (
                    <div className="relative w-full aspect-[4/1] rounded overflow-hidden">
                      <Image
                        src={item.banner}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/1] rounded overflow-hidden border shadow-sm">
                      <Image
                        src={"/images/no_image.webp"}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex w-full flex-col justify-center">
                    <div className="flex flex-col my-5 w-full text-center capitalize justify-center items-center">
                      <h3 className="text-lg font-semibold ">{item.title}</h3>
                      <p className="text-sm">
                        {item.date_start
                          ? format(new Date(item.date_start), "dd MMMM yyyy", {
                              locale: id,
                            })
                          : ""}{" "}
                        -{" "}
                        {item.date_end
                          ? format(new Date(item.date_end), "dd MMMM yyyy", {
                              locale: id,
                            })
                          : ""}
                      </p>
                    </div>
                    <div className="flex w-full bg-gray-200 dark:bg-gray-700 px-5 py-1.5 rounded-sm flex-col lg:flex-row items-center">
                      <div className="w-full flex flex-col">
                        <p className="text-xs">Total Kredit</p>
                        <p className="font-semibold">
                          {item.total_credits.toLocaleString()} Kredit
                        </p>
                      </div>
                      <div className="w-full flex flex-col lg:items-end mt-2 pt-2 border-t lg:border-none lg:m-0 lg:p-0 border-gray-300">
                        <p className="text-xs">Harga</p>
                        <div className="flex gap-2 items-center lg:flex-row-reverse">
                          <p className="font-semibold">
                            {formatRupiah(item.after_discount)}
                          </p>
                          <p className="text-xs line-through text-gray-500 dark:text-gray-300">
                            {formatRupiah(item.before_discount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 *:list-['-'] *:pl-2 px-3 mt-6 mb-3">
                      {item.descriptions.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 w-full mt-5 lg:hidden">
                    <button
                      onClick={() =>
                        onOpen("edit-promo", {
                          judul: item.title,
                          kredit: item.total_credits,
                          harga: item.before_discount,
                          hargaPromo: item.after_discount,
                          date: {
                            from: new Date(item.date_start),
                            to: new Date(item.date_end),
                          },
                          keterangan: item.descriptions,
                          banner: item.banner,
                          id: item.id,
                        })
                      }
                      className="h-8 w-full flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded group"
                    >
                      <Edit3 className="h-3 w-3 text-black" />
                      <p className="flex lg:hidden ml-2 text-sm text-black">
                        Edit
                      </p>
                    </button>
                    <button
                      onClick={() => onOpen("delete-promo", item.id)}
                      className="h-8 w-8 flex-none flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded group"
                    >
                      <Trash2 className="h-3 w-3 text-black" />
                    </button>
                  </div>
                </div>
              ))} */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <div className="flex flex-col gap-4 w-full">
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
      </div> */}
    </Card>
  );
};
