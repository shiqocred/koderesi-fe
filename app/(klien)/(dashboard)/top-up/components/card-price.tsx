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

interface CardPriceProps {
  kredit: number;
  perKredit: number;
  price: number;
  keterangan: string[];
  isPopular?: boolean;
}

export const CardPrice = ({
  kredit,
  perKredit,
  price,
  keterangan,
  isPopular,
}: CardPriceProps) => {
  return (
    <Card
      className={cn(
        "bg-gray-50 border col-span-1 text-start relative flex flex-col items-center w-full",
        isPopular
          ? "border-yellow-400 shadow-md shadow-yellow-300/20"
          : "border-gray-500"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3.5 mx-auto bg-yellow-500 px-8 text-gray-900 h-7 text-sm flex items-center font-semibold tracking-wider rounded-full">
          TERLARIS!
        </div>
      )}
      <CardHeader className="w-full">
        <CardTitle className="text-xl">
          {kredit.toLocaleString("id-ID")} Kredit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 w-full">
        <div className="flex items-center text-sm">
          <div className="bg-gray-900 w-4 h-4 flex justify-center items-center rounded-full mr-2">
            <Check className="w-2.5 h-2.w-2.5 stroke-[3] text-white" />
          </div>
          Harga<span className="ml-1">{formatRupiah(perKredit)}/kredit</span>
        </div>
        {keterangan.map((item) => (
          <div key={item} className="flex items-center text-sm">
            <div className="bg-gray-900 w-4 h-4 flex justify-center items-center rounded-full mr-2">
              <Check className="w-2.5 h-2.w-2.5 stroke-[3] text-white" />
            </div>
            {item}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start w-full mt-auto">
        <Separator className="mb-4 bg-gray-300" />
        <span className="text-2xl font-semibold mb-2">
          {formatRupiah(price)}
        </span>
        <Button
          className={cn(
            "w-full transition-all",
            isPopular
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-green-400 hover:bg-green-500 text-black"
          )}
        >
          Beli
        </Button>
      </CardFooter>
    </Card>
  );
};
