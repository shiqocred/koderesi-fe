"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn, formatRupiah, optionToast } from "@/lib/utils";
import { TooltipProviderPage } from "@/providers/tooltip-provider-page";
import {
  AlertTriangleIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Link,
  Loader,
  Loader2,
  PlusCircle,
  Twitter,
  Unlink,
  X,
  XCircle,
  Youtube,
} from "lucide-react";
import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import { ChartAffiliateClient } from "./chart-affiliate-client";
import { useCookies } from "next-client-cookies";
import axios from "axios";
import { toast } from "sonner";
import { ToastError } from "@/components/toast-error";

enum AffiliateProgress {
  FALSE,
  WAITING,
  REJECTED,
  APPROVED,
}

const affiliateMap = [
  {
    id: 1,
    nama: "Ahmad Fulan",
    tanggal: "13 Jan - 13.00",
    phone: "0888-8888-8888",
    cash: 30000,
    status: "proses",
  },
  {
    id: 2,
    nama: "Ahmad Fulan",
    tanggal: "13 Jan - 13.00",
    phone: "0888-8888-8888",
    cash: 50000,
    status: "proses",
  },
  {
    id: 3,
    nama: "Ahmad Fulan",
    tanggal: "13 Jan - 13.00",
    phone: "0888-8888-8888",
    cash: 50000,
    status: "paid",
  },
];

export const AffiliateClient = () => {
  const [formFields, setFormFields] = useState<string[]>([]);
  const [isInstagram, setIsInstagram] = useState<boolean>(false);
  const [isFacebook, setIsFacebook] = useState<boolean>(false);
  const [isTwitter, setIsTwitter] = useState<boolean>(false);
  const [isYoutube, setIsYoutube] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<string>("false");
  const [data, setData] = useState<any>();

  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const [input, setInput] = useState({
    type_promot: "",
    ig_link: "",
    fb_link: "",
    twt_link: "",
    yt_link: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/admin/affiliate`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStep(res.data.status ? (res.data.status as string) : "");
      setData(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_DATA]:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      type_promot: input.type_promot,
      affiliate_webs: formFields,
      affiliate_sosmed: {
        fb: input.fb_link,
        x: input.twt_link,
        ig: input.ig_link,
        yt: input.yt_link,
      },
    };
    try {
      const res: any = await axios.post(
        `https://koderesi.raventech.my.id/api/admin/affiliate/store`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        toast.success("Affiliate berhasil diajukan");
        cookies.set("affiliate", "add");
      } else {
        toast.error("Affiliate gagal diajukan");
      }
    } catch (error) {
      toast.custom(
        (t) => (
          <ToastError label="Affiliate gagal diajukan" error={error} t={t} />
        ),
        optionToast
      );
      console.log("[ERROR_SUBMIT_DATA]:", error);
    }
  };

  const addFormField = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormFields([...formFields, ""]);
  };

  const removeFormField = (index: number) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = value;
    setFormFields(updatedFormFields);
  };

  const onNextStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const [mth, setMth] = useState<number>(0);

  const month = [
    {
      label: "januari",
      value: "jan",
    },
    {
      label: "februari",
      value: "feb",
    },
    {
      label: "maret",
      value: "mar",
    },
    {
      label: "april",
      value: "apr",
    },
    {
      label: "mei",
      value: "mei",
    },
    {
      label: "juni",
      value: "jun",
    },
    {
      label: "juli",
      value: "jul",
    },
    {
      label: "agustus",
      value: "agu",
    },
    {
      label: "september",
      value: "sep",
    },
    {
      label: "oktober",
      value: "okt",
    },
    {
      label: "november",
      value: "nov",
    },
    {
      label: "desember",
      value: "des",
    },
  ];
  const onChangeMonth = (value: "prev" | "next") => {
    if (value === "prev") {
      setMth(mth !== 0 ? mth - 1 : 0);
    } else if (value === "next") {
      setMth(mth !== month.length - 1 ? mth + 1 : month.length - 1);
    }
  };

  useEffect(() => {
    getData();
  }, [step]);
  useEffect(() => {
    if (cookies.get("affiliate")) {
      getData();
      return cookies.remove("affiliate");
    }
  }, [cookies.get("affiliate")]);
  useEffect(() => {
    getData();
  }, []);

  if (step.toLowerCase() === "pending") {
    return (
      <div className="flex flex-col gap-y-2">
        <Alert className="bg-yellow-300 text-black">
          <Loader2 className="animate-spin w-4 h-4 dark:text-black" />
          <AlertTitle className="m-0">
            Pengajuan anda sedang kami tinjau
          </AlertTitle>
        </Alert>
      </div>
    );
  }
  if (step.toLowerCase() === "rejected") {
    return (
      <div className="flex flex-col gap-y-2">
        <Alert className="bg-red-300 dark:bg-red-500 text-black">
          <XCircle className="w-4 h-4 dark:text-black" />
          <AlertTitle className="m-0">Pengajuan anda ditolak</AlertTitle>
        </Alert>
        <Alert>
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-2">
              <AlertTriangleIcon className="w-4 h-4" />
              <AlertTitle className="m-0 capitalize font-medium">
                Alasan Penolakan
              </AlertTitle>
            </div>
            <div className="w-full px-5 py-2 rounded bg-gray-100">
              <p className="font-light">{data?.reason}</p>
            </div>
          </div>
        </Alert>
      </div>
    );
  }
  if (step.toLowerCase() === "approved") {
    return (
      <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 w-full">
        <div className="w-full">
          <Card className="flex flex-col text-sm text-center p-4 space-y-4 w-full">
            <div className="flex flex-col gap-y-1 items-start">
              <Label>Kode affiliasi</Label>
              <div className="border p-2 rounded-md flex justify-center w-full items-center h-10 tracking-widest font-semibold">
                AFFILIATEDEWE
              </div>
            </div>
            <Separator className="bg-gray-500 dark:bg-gray-700" />
            <div className="flex flex-col gap-y-1 text-start">
              <div className="border p-2 rounded-md flex justify-between items-center w-full h-10 px-4 font-semibold">
                <Label>Pendapatan:</Label>
                <p>{formatRupiah(300000)}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                *Minimum withdraw {formatRupiah(300000)}
              </p>
            </div>
            <Button
              onClick={onNextStep}
              className="bg-green-400 hover:bg-green-500 dark:text-gray-900 text-gray-900 w-full"
            >
              Withdraw
            </Button>
          </Card>
        </div>

        <div className="border p-2 md:p-4 rounded-md space-y-2 md:space-y-4 w-full">
          <Card className="flex justify-center h-10 items-center">Riwayat</Card>
          <div className="border border-green-400 dark:border-green-400/50 rounded-md p-2 w-full">
            <div className="flex justify-between sm:items-center px-5 mb-4 flex-col sm:flex-row items-start sm:gap-y-0 gap-y-2 w-full">
              <CardTitle>Transaksi Flow</CardTitle>
              <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                <Button
                  size={"icon"}
                  className="h-5 w-5 rounded-sm"
                  variant={"ghost"}
                  onClick={() => onChangeMonth("prev")}
                  disabled={mth === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="capitalize w-20 select-none flex items-center justify-center">
                  {month[mth].label}
                </span>
                <Button
                  size={"icon"}
                  className="h-5 w-5 rounded-sm"
                  variant={"ghost"}
                  onClick={() => onChangeMonth("next")}
                  disabled={mth === month.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="h-[250px] sm:h-[300px] ">
              <ChartAffiliateClient month={month[mth].value} />
            </div>
          </div>
          <div className="mt-2 space-y-2 md:space-y-4">
            {affiliateMap.map((item) => (
              <Card
                key={item.id}
                className="flex justify-between text-sm p-2 md:p-4 items-center"
              >
                <div className="flex flex-col gap-y-1">
                  <div>{item.nama}</div>
                  <div className="text-xs flex flex-col sm:flex-row">
                    {item.tanggal}
                    <span className="hidden sm:flex px-2">|</span>
                    <span>{item.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end sm:gap-x-4 gap-y-1 sm:gap-y-0">
                  <div>{formatRupiah(item.cash)}</div>
                  <div
                    className={cn(
                      "py-0.5 bg-yellow-300 w-full justify-center flex rounded sm:w-16 capitalize dark:text-black",
                      item.status === "paid" && "bg-green-400"
                    )}
                  >
                    {item.status}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (step.toLowerCase() === "inactive") {
    return (
      <Card className="flex flex-col text-sm text-center p-4 space-y-6 shadow">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8 py-4">
          <div className="flex justify-start border-b border-gray-500 dark:border-gray-300 pb-1">
            <h3 className="text-xl font-semibold">
              Form Pengajuan Affiliate Partner
            </h3>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5 className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Bagaimana cara anda untuk mempromosikannya?
            </h5>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="flex justify-between items-center w-full dark:bg-gray-800 dark:hover:bg-gray-700"
                  variant={"outline"}
                >
                  {input.type_promot === ""
                    ? "Pilih Opsi..."
                    : input.type_promot}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="xl:w-[672px] w-[400px] p-1">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setInput((prev) => ({
                            ...prev,
                            type_promot:
                              "Saya mempromosikan menggunakan Website",
                          }));
                          setIsOpen(false);
                        }}
                      >
                        Saya mempromosikan menggunakan Website
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setInput((prev) => ({
                            ...prev,
                            type_promot:
                              "Saya mempromosikan menggunakan Sosial Media",
                          }));
                          setIsOpen(false);
                        }}
                      >
                        Saya mempromosikan menggunakan Sosial Media
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setInput((prev) => ({
                            ...prev,
                            type_promot:
                              "Saya mempromosikan menggunakan Advertising",
                          }));
                          setIsOpen(false);
                        }}
                      >
                        Saya mempromosikan menggunakan Advertising
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5>Website yang ingin anda gunakan?</h5>
            <div className="flex flex-col space-y-4">
              {formFields.map((field, index) => (
                <div key={index} className="flex space-x-4">
                  {formFields.length <= 1 ? (
                    <div className="w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md">
                      <Link className="w-5 h-5" />
                    </div>
                  ) : (
                    <TooltipProviderPage text="Hapus link">
                      <Button
                        type="button"
                        onClick={() => removeFormField(index)}
                        className="w-10 h-10 flex-none flex justify-center items-center bg-red-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-red-500"
                      >
                        <Unlink className="w-5 h-5" />
                      </Button>
                    </TooltipProviderPage>
                  )}
                  <div className="w-full relative">
                    <Input
                      value={field}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-20 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-[75px] items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      https://
                    </span>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={(e) => addFormField(e)}
                className="bg-transparent hover:bg-green-100 border border-dashed border-green-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white w-40"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Tambah URL
              </Button>
            </div>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5>Sosial media yang anda gunakan?</h5>
            <div className="flex flex-col gap-2">
              {isInstagram && (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsInstagram(!isInstagram)}
                    className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    <Instagram className="w-5 h-5 group-hover:hidden stroke-1" />
                    <Unlink className="w-5 h-5 group-hover:flex hidden" />
                  </Button>
                  <div className="w-full relative">
                    <Input
                      value={input.ig_link}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          ig_link: e.target.value,
                        }))
                      }
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      @
                    </span>
                  </div>
                </div>
              )}
              {isFacebook && (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsFacebook(!isFacebook)}
                    className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    <Facebook className="w-5 h-5 group-hover:hidden stroke-1" />
                    <Unlink className="w-5 h-5 group-hover:flex hidden" />
                  </Button>
                  <div className="w-full relative">
                    <Input
                      value={input.fb_link}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          fb_link: e.target.value,
                        }))
                      }
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      @
                    </span>
                  </div>
                </div>
              )}
              {isTwitter && (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsTwitter(!isTwitter)}
                    className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    <Twitter className="w-5 h-5 group-hover:hidden stroke-1" />
                    <Unlink className="w-5 h-5 group-hover:flex hidden" />
                  </Button>
                  <div className="w-full relative">
                    <Input
                      value={input.twt_link}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          twt_link: e.target.value,
                        }))
                      }
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      @
                    </span>
                  </div>
                </div>
              )}
              {isYoutube && (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsYoutube(!isYoutube)}
                    className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    <Youtube className="w-5 h-5 group-hover:hidden stroke-1" />
                    <Unlink className="w-5 h-5 group-hover:flex hidden" />
                  </Button>
                  <div className="w-full relative">
                    <Input
                      value={input.yt_link}
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          yt_link: e.target.value,
                        }))
                      }
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      @
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {!isInstagram && (
                <Button
                  type="button"
                  onClick={() => setIsInstagram(!isInstagram)}
                  size={"icon"}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <Instagram className="w-5 h-5 stroke-1" />
                </Button>
              )}
              {!isFacebook && (
                <Button
                  type="button"
                  size={"icon"}
                  onClick={() => setIsFacebook(!isFacebook)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <Facebook className="w-5 h-5 stroke-1" />
                </Button>
              )}
              {!isTwitter && (
                <Button
                  type="button"
                  size={"icon"}
                  onClick={() => setIsTwitter(!isTwitter)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <Twitter className="w-5 h-5 stroke-1" />
                </Button>
              )}
              {!isYoutube && (
                <Button
                  type="button"
                  size={"icon"}
                  onClick={() => setIsYoutube(!isYoutube)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <Youtube className="w-5 h-5 stroke-1" />
                </Button>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="bg-green-400 hover:bg-green-500 dark:text-gray-900 text-gray-900 w-56"
          >
            Ajukan Affiliate Partner
          </Button>
        </form>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col text-sm text-center justify-center items-center p-4 w-full gap-2 h-[50vh] shadow">
      <Loader className="h-7 w-7 animate-spin" />
      <p>Loading...</p>
    </Card>
  );
};
