"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardPrice } from "./card-price";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { BadgePercent, TextSelect } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PriceProps {
  id: string;
  total_credits: number;
  price_credit: number;
  price_one_credit: number;
  is_popular: boolean;
  descriptions: string[];
}

export const PriceList = () => {
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [isMounted, setIsMounted] = useState(false);
  const [isPromo, setIsPromo] = useState(false);
  const [onceList, setOnceList] = useState<PriceProps[]>([
    {
      id: "",
      total_credits: 0,
      price_credit: 0,
      price_one_credit: 0,
      is_popular: false,
      descriptions: [""],
    },
  ]);
  const [monthlyList, setMonthlyList] = useState<PriceProps[]>([
    {
      id: "",
      total_credits: 0,
      price_credit: 0,
      price_one_credit: 0,
      is_popular: false,
      descriptions: [""],
    },
  ]);
  const [yearlyList, setYearlyList] = useState<PriceProps[]>([
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
        `https://koderesi.raventech.my.id/api/admin/price`,
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
      setIsPromo(res.data.promo_active);
    } catch (error) {
      console.log("[ERROR_PRICE_GET]:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetPrice();
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="flex w-full justify-between md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <h3 className="xl:text-xl text-lg font-bold">Kredit Koderesi</h3>
            <p className="font-light text-sm lg:text-base">
              Top up untuk menjadi advance
            </p>
          </div>
        </div>
        {isPromo && (
          <Link href={"/top-up/promo"}>
            <Button className="bg-green-400/80 hover:bg-green-400 text-black relative">
              <BadgePercent className="w-4 h-4 mr-2" />
              Promo
              <div className="absolute -right-1 -top-1 w-3 h-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                </span>
              </div>
            </Button>
          </Link>
        )}
      </div>
      <Card className="flex flex-col text-sm text-center p-4 shadow">
        <div className="w-full flex justify-center pt-16 pb-20 xl:py-32">
          <div className="flex w-full flex-col max-w-xl xl:max-w-4xl gap-2 xl:gap-4">
            <h2 className="text-xl sm:text-3xl xl:text-5xl font-black uppercase text-green-400 leading-tight">
              Pilih Paket Kredit Yang Paling{" "}
              <span className="text-gray-900 dark:text-white">
                Tepat Untuk Anda
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base xl:text-xl text-gray-500 dark:text-gray-300">
              Pilihlah dengan fokus pada kebutuhan dan preferensi anda.
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="sekali"
          className="w-full space-y-8 md:space-y-16 pb-8 px-2 sm:px-4 md:px-8"
        >
          <TabsList>
            {onceList.length > 0 && (
              <TabsTrigger value="sekali">Sekali Beli</TabsTrigger>
            )}
            {monthlyList.length > 0 && (
              <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
            )}
            {yearlyList.length > 0 && (
              <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="sekali">
            {onceList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {onceList.map((item) => (
                  <CardPrice
                    key={item.id}
                    id={item.id}
                    kredit={item.total_credits}
                    perKredit={item.price_one_credit}
                    price={item.price_credit}
                    keterangan={item.descriptions}
                    isPopular={item.is_popular}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-[300px] flex flex-col justify-center items-center border-4 border-dashed rounded-md">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
              </div>
            )}
          </TabsContent>
          <TabsContent value="bulanan">
            {monthlyList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {monthlyList.map((item) => (
                  <CardPrice
                    key={item.id}
                    id={item.id}
                    kredit={item.total_credits}
                    perKredit={item.price_one_credit}
                    price={item.price_credit}
                    keterangan={item.descriptions}
                    isPopular={item.is_popular}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-[300px] flex flex-col justify-center items-center border-4 border-dashed rounded-md">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
              </div>
            )}
          </TabsContent>
          <TabsContent value="tahunan">
            {yearlyList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {yearlyList.map((item) => (
                  <CardPrice
                    key={item.id}
                    id={item.id}
                    kredit={item.total_credits}
                    perKredit={item.price_one_credit}
                    price={item.price_credit}
                    keterangan={item.descriptions}
                    isPopular={item.is_popular}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-[300px] flex flex-col justify-center items-center border-4 border-dashed rounded-md">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};
