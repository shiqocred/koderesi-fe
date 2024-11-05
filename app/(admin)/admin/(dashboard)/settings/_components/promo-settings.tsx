"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Percent, PlusCircle, TextSelect, Trash2 } from "lucide-react";
import { baseUrl, cn, formatRupiah } from "@/lib/utils";
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
      const res = await axios.get(`${baseUrl}/superadmin/promo`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
            {promoActiveList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
                {promoActiveList.map((item) => (
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
                            ? format(
                                new Date(item.date_start),
                                "dd MMMM yyyy",
                                {
                                  locale: id,
                                }
                              )
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
                ))}
              </div>
            ) : (
              <div className="w-full h-[200px] flex flex-col items-center mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 justify-center border-t border-gray-300 dark:border-gray-700">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
              </div>
            )}
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
            {promoInactiveList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
                {promoInactiveList.map((item) => (
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
                        <p className="text-xs md:text-sm">
                          {item.date_start
                            ? format(
                                new Date(item.date_start),
                                "dd MMMM yyyy",
                                {
                                  locale: id,
                                }
                              )
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
                          <p className="text-xs md:text-sm">Total Kredit</p>
                          <p className="font-semibold text-xs md:text-sm">
                            {item.total_credits.toLocaleString()} Kredit
                          </p>
                        </div>
                        <div className="w-full flex flex-col lg:items-end mt-2 pt-2 border-t lg:border-none lg:m-0 lg:p-0 border-gray-300">
                          <p className="text-xs md:text-sm">Harga</p>
                          <div className="flex gap-2 items-center lg:flex-row-reverse text-xs md:text-sm">
                            <p className="font-semibold">
                              {formatRupiah(item.after_discount)}
                            </p>
                            <p className="line-through text-gray-500 dark:text-gray-300">
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
                ))}
              </div>
            ) : (
              <div className="w-full h-[200px] flex flex-col items-center mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 justify-center border-t border-gray-300 dark:border-gray-700">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
