"use client";

import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDebounce } from "@/hooks/use-debounce";
import { dialPhone } from "@/lib/dial";
import { baseUrl, cn, formatRupiah } from "@/lib/utils";
import axios from "axios";
import { CheckCircle2, ChevronDown, Circle, QrCode, Slash } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FormEvent, MouseEvent, useEffect, useState } from "react";

const paymentVA = [
  {
    id: 1,
    label: "Bank BNI",
    value: "BNI",
    image: "/images/payment-method/bni.png",
  },
  {
    id: 2,
    label: "Bank BRI",
    value: "BRI",
    image: "/images/payment-method/bri.png",
  },
  {
    id: 3,
    label: "Bank BSI",
    value: "BSI",
    image: "/images/payment-method/bsi.png",
  },
  {
    id: 4,
    label: "Bank Mandiri",
    value: "MANDIRI",
    image: "/images/payment-method/mandiri.png",
  },
  {
    id: 5,
    label: "Bank Permata",
    value: "PERMATA",
    image: "/images/payment-method/permatabank.png",
  },
];
const paymentOTC = [
  {
    id: 1,
    label: "Alfamart",
    value: "alfamart",
    image: "/images/payment-method/alfamart.png",
  },
  {
    id: 2,
    label: "Indomaret",
    value: "indomaret",
    image: "/images/payment-method/indomaret.png",
  },
  {
    id: 3,
    label: "Alfamidi",
    value: "alfamidi",
    image: "/images/payment-method/alfamidi.png",
  },
];
const paymentEWallet = [
  {
    id: 1,
    label: "Dana",
    value: "ID_DANA",
    image: "/images/payment-method/dana.png",
  },
  {
    id: 2,
    label: "OVO",
    value: "ID_OVO",
    image: "/images/payment-method/ovo.png",
  },
  {
    id: 3,
    label: "ShopeePay",
    value: "ID_SHOPEEPAY",
    image: "/images/payment-method/shopee-pay.png",
  },
];

const PaymentCheckout = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { paymentId } = useParams();
  const [isCountry, setIsCountry] = useState(false);
  const [country, setCountry] = useState("ID");
  const [numberPhone, setNumberPhone] = useState("");
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [method, setMethod] = useState("");
  const value = useDebounce(numberPhone);
  const [typeMethod, setTypeMethod] = useState("");
  const [data, setData] = useState<{
    id: string;
    code_transaction: string;
    amount_bill: number;
    amount_credit: number;
    referral_code: string;
    category: string;
  }>({
    id: "",
    code_transaction: "",
    amount_bill: 0,
    amount_credit: 0,
    referral_code: "",
    category: "",
  });

  const handleGetPromo = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/admin/transaction/show/${paymentId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log("[ERROR_CHECKOUT_GET]:", error);
    }
  };
  const handleCekRefferal = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/admin/transaction/checkAffiliate`,
        { referral_code: data.referral_code },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log("[ERROR_REFFERAL_CHECK]:", error);
    }
  };
  const handleCheckout = async (e: MouseEvent) => {
    e.preventDefault();
    const body = {
      channel: typeMethod,
      methode_payment: method !== "qrcode" ? method : "",
      mobile_number:
        method === "ID_OVO"
          ? dialPhone.find((item) => item.code === country)?.dial_code +
            numberPhone
          : "",
    };
    try {
      const res = await axios.put(
        `${baseUrl}/admin/transaction/checkout/${data.id}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log("[ERROR_CHECKOUT]:", error);
    }
  };

  useEffect(() => {
    if (paymentId) {
      handleGetPromo();
    }
  }, [paymentId]);

  useEffect(() => {
    if (value.startsWith("0")) {
      setNumberPhone((prev) => prev.replace(/^0+/, ""));
    }
  }, [value]);

  useEffect(() => {
    setIsMounted(true);
    handleGetPromo();
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 w-full">
      <div className="w-full">
        <div className="w-full bg-white dark:bg-gray-900 p-5 rounded-md flex flex-col">
          <div className="flex w-full border-b border-gray-500 pb-2 flex-col">
            <h3 className="xl:text-lg text-base font-semibold">
              Metode Pembayaran
            </h3>
          </div>
          <div className="flex flex-col gap-6 mt-8">
            <Accordion
              type="single"
              className="flex flex-col w-full gap-4"
              collapsible
              defaultValue="virtual-account"
            >
              <AccordionItem
                value="virtual-account"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "virtualAccount"
                      ? "bg-green-100 dark:bg-green-800"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "virtualAccount" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Virtual Account</p>
                    <p
                      className={cn(
                        "bg-green-300 dark:bg-green-100 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "virtualAccount" &&
                          !!method &&
                          paymentVA.find((item) => item.value === method)?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "virtualAccount" &&
                      !!method &&
                      paymentVA.find((item) => item.value === method)?.label
                        ? paymentVA.find((item) => item.value === method)?.label
                        : null}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-5 px-5 border-t border-gray-500">
                  <RadioGroup
                    className="grid grid-cols-4 w-full gap-4"
                    value={method}
                    onValueChange={(e) => {
                      setMethod(e);
                      setTypeMethod("virtualAccount");
                    }}
                  >
                    {paymentVA.map((item) => (
                      <div key={item.id} className="flex items-center w-full">
                        <RadioGroupItem
                          value={item.value}
                          id={item.value}
                          className="hidden"
                        />
                        <Label
                          htmlFor={item.value}
                          className={cn(
                            "h-24 w-full px-4 gap-2 flex flex-col items-center justify-center rounded",
                            method === item.value
                              ? "border-green-500 border-2"
                              : "border-gray-500 border"
                          )}
                        >
                          <div className="relative w-full h-8 overflow-hidden">
                            <Image
                              fill
                              alt=""
                              src={item.image}
                              className="object-contain pointer-events-none"
                            />
                          </div>
                          <p className="text-sm font-semibold">{item.label}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="e-wallet"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "ewallet"
                      ? "bg-green-100 dark:bg-green-800"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "ewallet" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>E-Wallet</p>
                    <p
                      className={cn(
                        "bg-green-300 dark:bg-green-100 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "ewallet" &&
                          !!method &&
                          paymentEWallet.find((item) => item.value === method)
                            ?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "ewallet" &&
                      !!method &&
                      paymentEWallet.find((item) => item.value === method)
                        ?.label
                        ? paymentEWallet.find((item) => item.value === method)
                            ?.label
                        : null}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-5 px-5 border-t border-gray-500">
                  <RadioGroup
                    className="grid grid-cols-4 w-full gap-4"
                    value={method}
                    onValueChange={(e) => {
                      setMethod(e);
                      setTypeMethod("ewallet");
                    }}
                  >
                    {paymentEWallet.map((item) => (
                      <div key={item.id} className="flex items-center w-full">
                        <RadioGroupItem
                          value={item.value}
                          id={item.value}
                          className="hidden"
                        />
                        <Label
                          htmlFor={item.value}
                          className={cn(
                            "h-24 w-full px-4 gap-2 flex flex-col items-center justify-center rounded",
                            method === item.value
                              ? "border-green-500 border-2"
                              : "border-gray-500 border"
                          )}
                        >
                          <div className="relative w-full h-8 overflow-hidden">
                            <Image
                              fill
                              alt=""
                              src={item.image}
                              className="object-contain pointer-events-none"
                            />
                          </div>
                          <p className="text-sm font-semibold">{item.label}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {typeMethod === "ewallet" && method === "ID_OVO" && (
                    <div className="space-y-0.5 md:space-y-1 relative w-full md:w-1/2 mt-10">
                      <Label
                        className={cn(
                          "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                          numberPhone.length === 0
                            ? "translate-y-3.5 left-[120px] font-normal"
                            : "-translate-y-3 left-28 font-semibold"
                        )}
                        htmlFor={"number_phone"}
                      >
                        Number Phone
                      </Label>
                      <Input
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                        type="number"
                        id={"number_phone"}
                        className="peer-hover:border-green-400 pl-28 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                      />
                      <Popover open={isCountry} onOpenChange={setIsCountry}>
                        <PopoverTrigger asChild>
                          <button className="absolute bottom-2 flex items-center gap-2 px-2 w-28 justify-between">
                            <div className="flex gap-1 items-center">
                              <div className="w-8 aspect-[3/2] rounded overflow-hidden relative border shadow">
                                <Image
                                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                                    dialPhone.find(
                                      (item) => item.code === country
                                    )?.code ?? "ID"
                                  }.svg`}
                                  alt="Country"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-xs font-medium">
                                {dialPhone.find((item) => item.code === country)
                                  ?.dial_code ?? "+62"}
                              </p>
                            </div>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align={"start"}>
                          <Command>
                            <CommandInput />
                            <CommandGroup>
                              <CommandList>
                                {dialPhone.map((item) => (
                                  <CommandItem
                                    key={item.code}
                                    className="justify-between gap-3"
                                    onSelect={() => {
                                      setCountry(item.code);
                                      setIsCountry(false);
                                    }}
                                  >
                                    <div className="flex items-center gap-2 overflow-hidden w-full">
                                      <div className="w-8 aspect-[3/2] rounded overflow-hidden relative">
                                        <Image
                                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.code}.svg`}
                                          alt="Country"
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <p className="overflow-hidden text-xs w-full text-ellipsis whitespace-nowrap">
                                        {item.name}
                                      </p>
                                    </div>
                                    <p className="flex-none text-xs font-semibold">
                                      {item.dial_code}
                                    </p>
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="qrcode"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "qrcode"
                      ? "bg-green-100 dark:bg-green-800"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "qrcode" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Kode QR</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-5 px-5 border-t border-gray-500">
                  <RadioGroup
                    className="flex items-center w-full gap-4"
                    value={method}
                    onValueChange={(e) => {
                      setMethod(e);
                      setTypeMethod("qrcode");
                    }}
                  >
                    <div className="flex items-center w-full">
                      <RadioGroupItem
                        value={"credit-card"}
                        id={"credit-card"}
                        className="hidden"
                      />
                      <Label
                        htmlFor={"credit-card"}
                        className={cn(
                          "w-full px-4 flex flex-col rounded justify-center",
                          method === "credit-card"
                            ? "border-green-500 border-2"
                            : "border-gray-500 border",
                          typeMethod === "creditCard" &&
                            method === "credit-card"
                            ? "h-full py-2"
                            : "h-14 py-0"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">QRIS</p>
                          <QrCode className="w-8 h-8" />
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full bg-white dark:bg-gray-900 p-5 rounded-md flex flex-col">
          <div className="flex w-full border-b border-gray-500 pb-2 flex-col">
            <h3 className="xl:text-lg text-base font-semibold">
              Rincian Pembayaran
            </h3>
          </div>
          <form onSubmit={handleCekRefferal} className="flex w-full gap-4 mt-8">
            <div className="space-y-0.5 md:space-y-1 relative w-full">
              <Label
                className={cn(
                  "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                  !data.referral_code ||
                    (data.referral_code && data.referral_code.length === 0)
                    ? "translate-y-3.5 left-3 font-normal"
                    : "-translate-y-3 left-0 font-semibold"
                )}
              >
                Kode Refferal
              </Label>
              <Input
                value={data.referral_code}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    referral_code: e.target.value,
                  }))
                }
                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
              />
            </div>
            <Button
              type="submit"
              className="bg-green-400/80 hover:bg-green-400 text-black h-9"
            >
              Check Kode
            </Button>
          </form>
          <div className="mt-14 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Category</p>
                <p className="bg-gray-300 dark:bg-gray-700 px-5 rounded-full py-0.5 text-sm capitalize">
                  {data.category}
                </p>
              </div>
              <div className="flex justify-between">
                <p>{data.amount_credit} Kredit</p>
                <p>{formatRupiah(data.amount_bill)}</p>
              </div>
              <div className="w-full h-[1px] bg-black dark:bg-gray-700 my-2" />
              <div className="flex justify-between">
                <p className="font-bold uppercase">Total</p>
                <p className="font-bold">{formatRupiah(data.amount_bill)}</p>
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleCheckout}
            className="bg-green-400 hover:bg-green-400/80 text-black w-full mt-8"
          >
            Lanjutkan Pembayaran
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
