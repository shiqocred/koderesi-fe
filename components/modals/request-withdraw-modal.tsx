"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { useSearchParams } from "next/navigation";
import { ToastError } from "../toast-error";
import { baseUrl, cn, formatRupiah, optionToast } from "@/lib/utils";
import { dialPhone } from "@/lib/dial";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";

export const RequestWithdrawModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "save-manifest";

  const dataNominal = 500000;

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();
  const [isCountry, setIsCountry] = useState(false);
  const [country, setCountry] = useState("ID");
  const [data, setData] = useState({
    nominal: 0,
    target_phone: "",
  });
  const value = useDebounce(data.target_phone);

  const onApprove = async (e: MouseEvent) => {
    e.preventDefault();

    const body = {
      amount: data.nominal,
      target_number: data.target_phone,
      withdraw_method: "DANA",
    };
    try {
      if (data.nominal < 300000) {
        throw new Error("Nominal tidak boleh dibawah Rp. 300.000");
      } else if (data.nominal > dataNominal) {
        throw new Error(
          JSON.stringify({
            error: {
              response: {
                data: {
                  message: ["Nominal Melebihi Pendapatan"],
                },
              },
            },
          })
        );
      }
      await axios.put(`${baseUrl}/admin/affiliate/withdrawRequest`, body, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Withdraw berhasil di ajukan");
      cookies.set("affiliateReq", "withr");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_AJUKAN_WITHDRAW]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Withdraw gagal di ajukan" error={error} t={t} />
        ),
        optionToast
      );
    }
  };

  useEffect(() => {
    if (value.startsWith("0")) {
      setData((prev) => ({
        ...prev,
        target_phone: prev.target_phone.replace(/^0+/, ""),
      }));
    }
  }, [value]);
  useEffect(() => {
    if (data.nominal.toString().startsWith("0")) {
      setData((prev) => ({
        ...prev,
        nominal: parseFloat(prev.nominal.toString().replace(/^0+/, "")),
      }));
    }
  }, [data.nominal]);

  return (
    <Modal
      title="Konfirmasi Withdraw Affiliate"
      description="Konfirmasi jika anda menyetujui withdraw."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-6 mt-4 mb-2 flex-col">
        <div className="w-full flex items-center justify-between text-sm rounded bg-gray-100 px-5 py-3">
          <p>Pendapatan</p>
          <p className="font-semibold">{formatRupiah(dataNominal)}</p>
        </div>
        <div className="space-y-0.5 md:space-y-1 relative w-full">
          <Label
            className={cn(
              "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
              data.nominal.toString().length === 0
                ? "translate-y-3.5 left-3 font-normal"
                : "-translate-y-3 left-0 font-light"
            )}
          >
            Nominal
          </Label>
          <Input
            value={data.nominal}
            type="number"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                nominal: parseFloat(e.target.value),
              }))
            }
            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
          />
        </div>
        <div className="space-y-0.5 md:space-y-1 relative w-full">
          <Label
            className={cn(
              "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
              data.target_phone.length === 0
                ? "translate-y-3.5 left-[120px] font-normal"
                : "-translate-y-3 left-28 font-semibold"
            )}
            htmlFor={"number_phone"}
          >
            Nomor DANA
          </Label>
          <Input
            value={data.target_phone}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                target_phone: e.target.value,
              }))
            }
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
                        dialPhone.find((item) => item.code === country)?.code ??
                        "ID"
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
      </div>
      <div className="flex gap-2 md:gap-4 w-full">
        <Button
          onClick={onClose}
          className="w-full dark:text-white border border-green-300 hover:border-green-400 dark:border-green-700/70 dark:hover:border-green-700 bg-transparent hover:bg-transparent text-black"
        >
          Batal
        </Button>
        <Button
          onClick={onApprove}
          className="w-full bg-green-400 hover:bg-green-300 text-black"
        >
          Ajukan
        </Button>
      </div>
    </Modal>
  );
};
