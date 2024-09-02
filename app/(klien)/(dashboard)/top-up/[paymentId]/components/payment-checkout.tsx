"use client";

import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, formatRupiah } from "@/lib/utils";
import { CheckCircle2, ChevronDown, Circle, QrCode, Slash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const paymentVA = [
  {
    id: 1,
    label: "Bank BCA",
    value: "bca",
    image: "/images/payment-method/bca.png",
  },
  {
    id: 2,
    label: "Bank BNI",
    value: "bni",
    image: "/images/payment-method/bni.png",
  },
  {
    id: 3,
    label: "Bank BRI",
    value: "bri",
    image: "/images/payment-method/bri.png",
  },
  {
    id: 4,
    label: "Bank BSI",
    value: "bsi",
    image: "/images/payment-method/bsi.png",
  },
  {
    id: 5,
    label: "Bank Mandiri",
    value: "mandiri",
    image: "/images/payment-method/mandiri.png",
  },
  {
    id: 6,
    label: "Bank BJB",
    value: "bjb",
    image: "/images/payment-method/bjb.png",
  },
  {
    id: 7,
    label: "Bank CIMB Niaga",
    value: "cimbniaga",
    image: "/images/payment-method/cimbniaga.png",
  },
  {
    id: 8,
    label: "Bank DBS",
    value: "dbs",
    image: "/images/payment-method/dbs.png",
  },
  {
    id: 9,
    label: "Bank Neobank",
    value: "neobank",
    image: "/images/payment-method/neobank.png",
  },
  {
    id: 10,
    label: "Bank Permata",
    value: "permatabank",
    image: "/images/payment-method/permatabank.png",
  },
  {
    id: 11,
    label: "Bank Sampoerna",
    value: "bss",
    image: "/images/payment-method/bss.png",
  },
];
const paymentDebit = [
  {
    id: 1,
    label: "Bank BRI",
    value: "bri",
    image: "/images/payment-method/bri.png",
  },
  {
    id: 2,
    label: "Bank Mandiri",
    value: "mandiri",
    image: "/images/payment-method/mandiri.png",
  },
];
const paymentPaylater = [
  {
    id: 1,
    label: "Akulaku",
    value: "akulaku",
    image: "/images/payment-method/akulaku.png",
  },
  {
    id: 2,
    label: "Kredivo",
    value: "kredivo",
    image: "/images/payment-method/kredivo.png",
  },
  {
    id: 3,
    label: "Indodana",
    value: "indodana",
    image: "/images/payment-method/indodana.png",
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
    value: "dana",
    image: "/images/payment-method/dana.png",
  },
  {
    id: 2,
    label: "Ovo",
    value: "ovo",
    image: "/images/payment-method/ovo.png",
  },
  {
    id: 3,
    label: "ShopeePay",
    value: "shopeePay",
    image: "/images/payment-method/shopee-pay.png",
  },
  {
    id: 4,
    label: "AstraPay",
    value: "astrapay",
    image: "/images/payment-method/astrapay.png",
  },
  {
    id: 5,
    label: "LinkAja",
    value: "linkaja",
    image: "/images/payment-method/linkaja.png",
  },
];

const PaymentCheckout = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [personal, setPersonal] = useState({
    email: "",
    referralCode: "",
  });
  const [creditCard, setCreditCard] = useState({
    name: "",
    numberCard: "",
    expDate: "",
    cvv: "",
  });
  const [method, setMethod] = useState("");
  const [typeMethod, setTypeMethod] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 w-full">
      <div className="w-full">
        <div className="w-full bg-white p-5 rounded-md flex flex-col">
          <div className="flex w-full border-b border-gray-500 pb-2 flex-col">
            <h3 className="xl:text-lg text-base font-semibold">
              Informasi Pembelian
            </h3>
          </div>
          <form className="flex flex-col gap-6 mt-8">
            <div className="flex flex-col gap-0.5 md:gap-1 relative">
              <Label
                className={cn(
                  "absolute transition-all text-gray-700 dark:text-white/70 text-sm after:content-['*'] after:text-red-500 after:pl-1",
                  personal.email.length === 0
                    ? "translate-y-3.5 left-3 font-normal"
                    : "-translate-y-3 left-0 font-semibold"
                )}
              >
                Email
              </Label>
              <Input
                value={personal.email}
                onChange={(e) =>
                  setPersonal((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                required
                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-0.5 md:gap-1 relative">
              <Label
                className={cn(
                  "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                  personal.referralCode.length === 0
                    ? "translate-y-3.5 left-3 font-normal"
                    : "-translate-y-3 left-0 font-semibold"
                )}
              >
                Kode Referral
              </Label>
              <Input
                value={personal.referralCode}
                onChange={(e) =>
                  setPersonal((prev) => ({
                    ...prev,
                    referralCode: e.target.value,
                  }))
                }
                type="email"
                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="bg-green-400 hover:bg-green-400/80 text-black"
              >
                Lanjutkan Pembayaran
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full bg-white p-5 rounded-md flex flex-col">
          <div className="flex w-full border-b border-gray-500 pb-2 flex-col">
            <h3 className="xl:text-lg text-base font-semibold">
              Metode Pembayaran
            </h3>
          </div>
          <form className="flex flex-col gap-6 mt-8">
            <Accordion
              type="single"
              className="flex flex-col w-full gap-4"
              collapsible
            >
              <AccordionItem
                value="virtual-account"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "virtualAccount"
                      ? "bg-green-100"
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
                        "bg-green-300 text-black text-xs px-3 py-0.5 rounded-full",
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
                value="credit-card"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "creditCard"
                      ? "bg-green-100"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "creditCard" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Kartu Kredit</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-5 px-5 border-t border-gray-500">
                  <RadioGroup
                    className="flex items-center w-full gap-4"
                    value={method}
                    onValueChange={(e) => {
                      setMethod(e);
                      setTypeMethod("creditCard");
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
                          <p className="text-sm font-semibold">Kartu Kredit</p>
                          <div className="flex items-center gap-2">
                            <div className="relative w-12 h-12 overflow-hidden">
                              <Image
                                fill
                                alt=""
                                src={"/images/payment-method/visa.png"}
                                className="object-contain pointer-events-none"
                              />
                            </div>
                            <div className="relative w-10 h-10 overflow-hidden">
                              <Image
                                fill
                                alt=""
                                src={"/images/payment-method/jcb.png"}
                                className="object-contain pointer-events-none"
                              />
                            </div>
                            <div className="relative w-10 h-10 overflow-hidden">
                              <Image
                                fill
                                alt=""
                                src={"/images/payment-method/mastercard.png"}
                                className="object-contain pointer-events-none"
                              />
                            </div>
                            <div className="relative w-10 h-10 overflow-hidden">
                              <Image
                                fill
                                alt=""
                                src={
                                  "/images/payment-method/americanexpress.png"
                                }
                                className="object-contain pointer-events-none"
                              />
                            </div>
                          </div>
                        </div>
                        {typeMethod === "creditCard" &&
                          method === "credit-card" && (
                            <div className="w-full flex flex-col gap-6 py-6 border-t border-gray-500">
                              <div className="flex flex-col gap-0.5 md:gap-1 relative">
                                <Label
                                  className={cn(
                                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm after:content-['*'] after:text-red-500 after:pl-1",
                                    creditCard.name.length === 0
                                      ? "translate-y-3.5 left-3 font-normal"
                                      : "-translate-y-3 left-0 font-semibold"
                                  )}
                                >
                                  Nama
                                </Label>
                                <Input
                                  value={creditCard.name}
                                  onChange={(e) =>
                                    setCreditCard((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  required
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5 md:gap-1 relative">
                                <Label
                                  className={cn(
                                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm after:content-['*'] after:text-red-500 after:pl-1",
                                    creditCard.numberCard.length === 0
                                      ? "translate-y-3.5 left-3 font-normal"
                                      : "-translate-y-3 left-0 font-semibold"
                                  )}
                                >
                                  Nomor Kartu
                                </Label>
                                <Input
                                  value={creditCard.numberCard}
                                  onChange={(e) =>
                                    setCreditCard((prev) => ({
                                      ...prev,
                                      numberCard: e.target.value,
                                    }))
                                  }
                                  type="number"
                                  required
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
                                />
                              </div>
                              <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col gap-2 relative">
                                  <Label className="transition-all text-gray-700 dark:text-white/70 text-sm after:content-['*'] after:text-red-500 after:pl-1">
                                    Tanggal EXP (MM/YY)
                                  </Label>
                                  <InputOTP maxLength={4}>
                                    <InputOTPGroup>
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={0}
                                      />
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={1}
                                      />
                                    </InputOTPGroup>
                                    <Slash className="w-4 h-4 mx-1 -rotate-[20deg]" />
                                    <InputOTPGroup>
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={2}
                                      />
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={3}
                                      />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </div>
                                <div className="flex flex-col gap-2 relative">
                                  <Label className="transition-all text-gray-700 dark:text-white/70 text-sm after:content-['*'] after:text-red-500 after:pl-1">
                                    CVV
                                  </Label>
                                  <InputOTP maxLength={3}>
                                    <InputOTPGroup>
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={0}
                                      />
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={1}
                                      />
                                      <InputOTPSlot
                                        className="border-gray-500 w-9 h-9"
                                        index={2}
                                      />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </div>
                              </div>
                            </div>
                          )}
                      </Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="over-counter"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "overTheCounter"
                      ? "bg-green-100"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "overTheCounter" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Over The Counter</p>
                    <p
                      className={cn(
                        "bg-green-300 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "overTheCounter" &&
                          !!method &&
                          paymentOTC.find((item) => item.value === method)
                            ?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "overTheCounter" &&
                      !!method &&
                      paymentOTC.find((item) => item.value === method)?.label
                        ? paymentOTC.find((item) => item.value === method)
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
                      setTypeMethod("overTheCounter");
                    }}
                  >
                    {paymentOTC.map((item) => (
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
                    typeMethod === "eWallet" ? "bg-green-100" : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "eWallet" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>E-Wallet</p>
                    <p
                      className={cn(
                        "bg-green-300 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "eWallet" &&
                          !!method &&
                          paymentEWallet.find((item) => item.value === method)
                            ?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "eWallet" &&
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
                      setTypeMethod("eWallet");
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="qris"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "qris" ? "bg-green-100" : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "qris" ? (
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
                      setTypeMethod("qris");
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
              <AccordionItem
                value="debit"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "debit" ? "bg-green-100" : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "debit" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Kartu Debit</p>
                    <p
                      className={cn(
                        "bg-green-300 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "debit" &&
                          !!method &&
                          paymentDebit.find((item) => item.value === method)
                            ?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "debit" &&
                      !!method &&
                      paymentDebit.find((item) => item.value === method)?.label
                        ? paymentDebit.find((item) => item.value === method)
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
                      setTypeMethod("debit");
                    }}
                  >
                    {paymentDebit.map((item) => (
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
                value="paylater"
                className="border border-gray-500 rounded overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    "px-5",
                    typeMethod === "paylater"
                      ? "bg-green-100"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {typeMethod === "paylater" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <p>Paylater</p>
                    <p
                      className={cn(
                        "bg-green-300 text-black text-xs px-3 py-0.5 rounded-full",
                        typeMethod === "paylater" &&
                          !!method &&
                          paymentPaylater.find((item) => item.value === method)
                            ?.label
                          ? "flex"
                          : "hidden"
                      )}
                    >
                      {typeMethod === "paylater" &&
                      !!method &&
                      paymentPaylater.find((item) => item.value === method)
                        ?.label
                        ? paymentPaylater.find((item) => item.value === method)
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
                      setTypeMethod("paylater");
                    }}
                  >
                    {paymentPaylater.map((item) => (
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
            </Accordion>
            <div>
              <Button
                type="submit"
                className="bg-green-400 hover:bg-green-400/80 text-black"
              >
                Lanjutkan Pembayaran
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full bg-white p-5 rounded-md flex flex-col">
          <div className="flex w-full border-b border-gray-500 pb-2 flex-col">
            <h3 className="xl:text-lg text-base font-semibold">
              Rincian Pembayaran
            </h3>
          </div>
          <div className="mt-8 flex flex-col gap-4 border p-5 rounded border-gray-500">
            <div className="flex justify-between items-center border-b border-black pb-2">
              <p className="font-medium">Informasi Pembelian</p>
              <button className="text-gray-500 text-sm dark:text-gray-700 underline">
                Ubah Data
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Email</p>
                <p>isro@gmail.com</p>
              </div>
              <div className="flex justify-between">
                <p>Kode Refferal</p>
                <p>-</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <Button className="justify-between bg-transparent hover:bg-transparent text-black dark:text-white w-full border border-black">
              <p>Ganti Paket</p>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Category</p>
                <p className="bg-gray-300 px-5 rounded-full py-0.5 text-sm">
                  Promo
                </p>
              </div>
              <div className="flex justify-between">
                <p>300 Kredit</p>
                <p>{formatRupiah(300000)}</p>
              </div>
              <div className="flex justify-between">
                <p>PPN 11%</p>
                <p>{formatRupiah(30000)}</p>
              </div>
              <div className="w-full h-[1px] bg-black my-2" />
              <div className="flex justify-between">
                <p className="font-bold uppercase">Total</p>
                <p className="font-bold">{formatRupiah(330000)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
