"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardPrice } from "./card-price";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { TextSelect } from "lucide-react";
import { baseUrl } from "@/lib/utils";

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
      const res = await axios.get(`${baseUrl}/admin/price`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOnceList(res.data.data.once);
      setMonthlyList(res.data.data.monthly);
      setYearlyList(res.data.data.yearly);
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
    <Tabs
      defaultValue="sekali"
      className="w-full space-y-8 md:space-y-16 pb-8 px-2 sm:px-4 md:px-8"
    >
      <TabsList>
        <TabsTrigger value="sekali">Sekali Beli</TabsTrigger>
        <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
        <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
      </TabsList>
      <TabsContent value="sekali">
        {onceList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {onceList.map((item) => (
              <CardPrice
                key={item.id}
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
  );
};
