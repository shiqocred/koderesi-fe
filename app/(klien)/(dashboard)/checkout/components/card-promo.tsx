"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, formatRupiah } from "@/lib/utils";
import { Check } from "lucide-react";
import CountdownTimer from "./countdown";

interface CardPromoProps {
  id: string;
  title: string;
  total_credits: number;
  before_discount: number;
  after_discount: number;
  date_start: string;
  date_end: string;
  descriptions: string[];
}

export const CardPromo = ({
  id,
  title,
  total_credits,
  before_discount,
  after_discount,
  date_start,
  date_end,
  descriptions,
}: CardPromoProps) => {
  return (
    <Card className="bg-gray-50 border col-span-1 text-start relative flex flex-col items-center w-full border-gray-500 h-full">
      <CardHeader className="w-full">
        <CardTitle className="w-full flex flex-col items-start justify-center">
          <h5 className="text-base font-semibold">{title}</h5>
          <p className="text-2xl font-bold">{total_credits} Kredit</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 w-full">
        {descriptions.map((v) => (
          <div key={v} className="flex items-center text-sm">
            <div className="bg-gray-900 dark:bg-white w-4 h-4 flex justify-center items-center rounded-full mr-2">
              <Check className="w-2.5 h-2.w-2.5 stroke-[3] text-white dark:text-black" />
            </div>
            {v}
          </div>
        ))}
        <div className="flex flex-col gap-1 mt-5">
          <p className="text-sm font-light">Berakhir dalam:</p>
          <CountdownTimer targetDate={new Date(date_end)} />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start w-full">
        <Separator className="mb-4 bg-gray-300" />
        <div className="flex items-end mb-2">
          <span className="text-2xl font-semibold">
            {formatRupiah(after_discount)}
          </span>
          <p className="text-xs font-light line-through ml-1 mb-1">
            {formatRupiah(before_discount)}
          </p>
        </div>
        <Button className="w-full transition-all bg-green-400 hover:bg-green-500 text-black">
          Beli
        </Button>
      </CardFooter>
    </Card>
  );
};
