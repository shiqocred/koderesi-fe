"use client";

import { ToastError } from "@/components/toast-error";
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
import { baseUrl, cn, formatRupiah, optionToast } from "@/lib/utils";
import axios from "axios";
import { AlertCircle, Check, CheckCircle2, Loader } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { toast } from "sonner";

interface CardPriceProps {
  kredit: number;
  id: any;
  perKredit: number;
  price: number;
  keterangan: string[];
  isPopular?: boolean;
}

export const CardPrice = ({
  kredit,
  id,
  perKredit,
  price,
  keterangan,
  isPopular,
}: CardPriceProps) => {
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const handleCheckout = async (e: MouseEvent, id: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/admin/transaction/payment`,
        {
          package_id: id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/checkout/${res.data.data.code_transaction}`);
      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 2000)
        ),
        {
          loading: (
            <div className="flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              <div className="text-xs font-semibold">
                <p>Paket berhasil dipilih,</p>
                <p>halaman segera dialihkan...</p>
              </div>
            </div>
          ),
          success: (data) => {
            return (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-white fill-green-400" />
                <div className="text-xs font-semibold">
                  <p>Paket berhasil diproses,</p>
                  <p>halaman berhasil dialihkan</p>
                </div>
              </div>
            );
          },
          error: (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-white fill-red-400" />
              <div className="text-xs font-semibold">
                <p>Paket gagal diproses,</p>
                <p>halaman gagal dialihkan</p>
              </div>
            </div>
          ),
        }
      );
    } catch (error) {
      console.log("[ERROR_PRICE_POST]:", error);
      toast.custom(
        (t) => <ToastError label="Paket gagal dipilih" error={error} t={t} />,
        optionToast
      );
    }
  };
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
          onClick={(e) => handleCheckout(e, id)}
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
