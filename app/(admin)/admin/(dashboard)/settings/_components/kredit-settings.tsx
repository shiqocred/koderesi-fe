"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit3,
  LayoutGrid,
  MoreHorizontal,
  PlusCircle,
  Star,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useModal } from "@/hooks/use-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatRupiah } from "@/lib/utils";

interface PriceCreditProps {
  id: string;
  total_credits: number;
  price_credit: number;
  price_one_credit: number;
  is_popular: boolean;
  descriptions: string[];
}

export const KreditSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const { onOpen } = useModal();
  const [onceList, setOnceList] = useState<PriceCreditProps[]>([
    {
      id: "",
      total_credits: 0,
      price_credit: 0,
      price_one_credit: 0,
      is_popular: false,
      descriptions: [""],
    },
  ]);
  const [monthlyList, setMonthlyList] = useState<PriceCreditProps[]>([
    {
      id: "",
      total_credits: 0,
      price_credit: 0,
      price_one_credit: 0,
      is_popular: false,
      descriptions: [""],
    },
  ]);
  const [yearlyList, setYearlyList] = useState<PriceCreditProps[]>([
    {
      id: "",
      total_credits: 0,
      price_credit: 0,
      price_one_credit: 0,
      is_popular: false,
      descriptions: [""],
    },
  ]);

  const handleGetPrice = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/price`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOnceList(res.data.data.once);
      setMonthlyList(res.data.data.monthly);
      setYearlyList(res.data.data.yearly);
    } catch (error) {
      console.log("[ERROR_KREDIT_GET]:", error);
    }
  };

  useEffect(() => {
    if (cookies.get("kredit updated")) {
      handleGetPrice();
      return cookies.remove("kredit updated");
    }
  }, [cookies.get("kredit updated")]);

  useEffect(() => {
    setIsMounted(true);
    handleGetPrice();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-4 bg-transparent border-gray-500 border flex-col">
      <div className="flex w-full items-center justify-between mb-3 md:mb-4 lg:mb-5">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Harga Kredit
          </h2>
          <p className="text-sm md:text-base font-light">
            Konfigurasi harga kredit.
          </p>
        </div>
        <Button
          onClick={() => onOpen("add-credit")}
          className="bg-green-400 dark:bg-green-500 hover:bg-green-400/80 dark:hover:bg-green-500/80 text-black w-10 p-0 md:w-auto md:px-4 md:py-2"
        >
          <PlusCircle className="w-4 h-4 m-0 md:mr-2" />
          <p className="hidden md:flex">Tambah Harga</p>
        </Button>
      </div>
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        <AccordionItem
          value="once"
          className="border border-gray-300 dark:border-gray-700 p-2 md:p-3 lg:p-4 xl:p-5 rounded-md"
        >
          <AccordionTrigger className="p-0">
            <div className="flex items-center">
              <div className="dark:bg-green-500 bg-green-300 flex items-center justify-center rounded-full h-8 w-8 mr-2 text-black">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <h5 className="text-sm md:text-base lg:text-lg font-medium">
                List Kredit Sekali Beli
              </h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
              {onceList.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border p-3 w-full col-span-1 rounded-md border-gray-300 dark:border-gray-700"
                >
                  <div className="flex w-full justify-between">
                    <button className="h-6 w-6 flex items-center justify-center dark:bg-gray-700/80 dark:hover:bg-gray-700 bg-gray-300/80 hover:bg-gray-300 rounded-full group">
                      <Star className="h-3 w-3 dark:group-hover:fill-white group-hover:fill-black" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onOpen("edit-credit", {
                            jenis: "once",
                            kredit: item.total_credits,
                            harga: item.price_credit,
                            hargaSatuan: item.price_one_credit,
                            keterangan: item.descriptions,
                            id: item.id,
                            is_popular: item.is_popular,
                          })
                        }
                        className="h-6 w-6 flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded-full group"
                      >
                        <Edit3 className="h-3 w-3 text-black" />
                      </button>
                      <button
                        onClick={() => onOpen("delete-credit", item.id)}
                        className="h-6 w-6 flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded-full group"
                      >
                        <Trash2 className="h-3 w-3 text-black" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col items-center pb-3">
                    <p className="text-base md:text-lg lg:text-xl font-medium">
                      {item.total_credits}
                      <span className=" ml-1">Kredit</span>
                    </p>
                    <p className="font-light px-5 md:px-6 lg:px-7 xl:px-8 py-0.5 dark:bg-green-500 bg-green-300 text-black rounded-full text-xs md:text-sm lg:text-base">
                      {formatRupiah(item.price_credit)}
                    </p>
                  </div>
                  <ul className="mt-3 border-t dark:border-gray-700 border-gray-300 pt-3 text-sm *:list-['-'] *:px-2 px-3 flex flex-col gap-1">
                    <li>Harga {formatRupiah(item.price_one_credit)}/kredit</li>
                    {item.descriptions.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="monthly"
          className="border border-gray-300 dark:border-gray-700 p-2 md:p-3 lg:p-4 xl:p-5 rounded-md"
        >
          <AccordionTrigger className="p-0">
            <div className="flex items-center">
              <div className="dark:bg-green-500 bg-green-300 flex items-center justify-center rounded-full h-8 w-8 mr-2 text-black">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <h5 className="text-sm md:text-base lg:text-lg font-medium">
                List Kredit Bulanan
              </h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
              {monthlyList.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border p-3 w-full col-span-1 rounded-md border-gray-300 dark:border-gray-700"
                >
                  <div className="flex w-full justify-between">
                    <button className="h-6 w-6 flex items-center justify-center dark:bg-gray-700/80 dark:hover:bg-gray-700 bg-gray-300/80 hover:bg-gray-300 rounded-full group">
                      <Star className="h-3 w-3 dark:group-hover:fill-white group-hover:fill-black" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onOpen("edit-credit", {
                            jenis: "monthly",
                            kredit: item.total_credits,
                            harga: item.price_credit,
                            hargaSatuan: item.price_one_credit,
                            keterangan: item.descriptions,
                            id: item.id,
                            is_popular: item.is_popular,
                          })
                        }
                        className="h-6 w-6 flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded-full group"
                      >
                        <Edit3 className="h-3 w-3 text-black" />
                      </button>
                      <button
                        onClick={() => onOpen("delete-credit", item.id)}
                        className="h-6 w-6 flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded-full group"
                      >
                        <Trash2 className="h-3 w-3 text-black" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col items-center pb-3">
                    <p className="text-base md:text-lg lg:text-xl font-medium">
                      {item.total_credits}
                      <span className=" ml-1">Kredit</span>
                    </p>
                    <p className="font-light px-5 md:px-6 lg:px-7 xl:px-8 py-0.5 dark:bg-green-500 bg-green-300 text-black rounded-full text-xs md:text-sm lg:text-base">
                      {formatRupiah(item.price_credit)}
                    </p>
                  </div>
                  <ul className="mt-3 border-t dark:border-gray-700 border-gray-300 pt-3 text-sm *:list-['-'] *:px-2 px-3 flex flex-col gap-1">
                    <li>Harga {formatRupiah(item.price_one_credit)}/kredit</li>
                    {item.descriptions.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="yearly"
          className="border border-gray-300 dark:border-gray-700 p-2 md:p-3 lg:p-4 xl:p-5 rounded-md"
        >
          <AccordionTrigger className="p-0">
            <div className="flex items-center">
              <div className="dark:bg-green-500 bg-green-300 flex items-center justify-center rounded-full h-8 w-8 mr-2 text-black">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <h5 className="text-sm md:text-base lg:text-lg font-medium">
                List Kredit Tahunan
              </h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3 mt-2 pt-2 md:mt-3 md:pt-3 lg:pt-4 lg:mt-4 xl:pt-5 xl:mt-5 border-t border-gray-300 dark:border-gray-700">
              {yearlyList.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border p-3 w-full col-span-1 rounded-md border-gray-300 dark:border-gray-700"
                >
                  <div className="flex w-full justify-between">
                    <button className="h-6 w-6 flex items-center justify-center dark:bg-gray-700/80 dark:hover:bg-gray-700 bg-gray-300/80 hover:bg-gray-300 rounded-full group">
                      <Star className="h-3 w-3 dark:group-hover:fill-white group-hover:fill-black" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onOpen("edit-credit", {
                            jenis: "yearly",
                            kredit: item.total_credits,
                            harga: item.price_credit,
                            hargaSatuan: item.price_one_credit,
                            keterangan: item.descriptions,
                            id: item.id,
                            is_popular: item.is_popular,
                          })
                        }
                        className="h-6 w-6 flex items-center justify-center dark:bg-yellow-400/80 dark:hover:bg-yellow-400 bg-yellow-300/80 hover:bg-yellow-300 rounded-full group"
                      >
                        <Edit3 className="h-3 w-3 text-black" />
                      </button>
                      <button
                        onClick={() => onOpen("delete-credit", item.id)}
                        className="h-6 w-6 flex items-center justify-center dark:bg-red-400/80 dark:hover:bg-red-400 bg-red-300/80 hover:bg-red-300 rounded-full group"
                      >
                        <Trash2 className="h-3 w-3 text-black" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col items-center pb-3">
                    <p className="text-base md:text-lg lg:text-xl font-medium">
                      {item.total_credits}
                      <span className=" ml-1">Kredit</span>
                    </p>
                    <p className="font-light px-5 md:px-6 lg:px-7 xl:px-8 py-0.5 dark:bg-green-500 bg-green-300 text-black rounded-full text-xs md:text-sm lg:text-base">
                      {formatRupiah(item.price_credit)}
                    </p>
                  </div>
                  <ul className="mt-3 border-t dark:border-gray-700 border-gray-300 pt-3 text-sm *:list-['-'] *:px-2 px-3 flex flex-col gap-1">
                    <li>Harga {formatRupiah(item.price_one_credit)}/kredit</li>
                    {item.descriptions.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
