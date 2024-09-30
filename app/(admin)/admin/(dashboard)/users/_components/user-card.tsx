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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useModal } from "@/hooks/use-modal";
import { cn, formatRupiah, formatTanggalWaktu, optionToast } from "@/lib/utils";
import axios from "axios";
import {
  ArrowDownCircle,
  ArrowUpRightFromSquare,
  ChevronLeft,
  ChevronRight,
  Edit,
  Facebook,
  HeartHandshake,
  Instagram,
  MoreHorizontal,
  Trash2,
  Twitter,
  XCircle,
  Youtube,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import React, { useState } from "react";
import { ChartAffiliate } from "../../affiliate/_components/chart-affiliate";
import { toast } from "sonner";
import { ToastError } from "@/components/toast-error";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IncomeProps {
  id: number;
  nama: string;
  tanggal: string;
  cash: number;
  status: string;
}

const mapIncome: IncomeProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    tanggal: "3 Des 2024 - 18.00",
    cash: 30000,
    status: "in",
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    tanggal: "3 Des 2024 - 18.00",
    cash: 20000,
    status: "in",
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    tanggal: "3 Des 2024 - 18.00",
    cash: 30000,
    status: "in",
  },
];

const UserCard = (item: any) => {
  const [mth, setMth] = useState<number>(0);
  const { onOpen } = useModal();

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

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [currentReq, setCurrentReq] = useState<any>();

  const [isOpen, setIsOpen] = useState(false);

  const getDetailReqAffiliate = async (dataId: string) => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/show/${dataId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentReq(res.data.data);
    } catch (error: any) {
      console.log("[ERROR_GET_AFFILIATE_REQ_DETAIL]:", error);
      toast.custom(
        (t) => <ToastError label="Something went wrong" error={error} t={t} />,
        optionToast
      );
    }
  };
  return (
    <li className="capitalize" key={item.id}>
      <Card className="p-2 md:p-3 rounded-md text-sm flex bg-transparent dark:bg-transparent border dark:border-gray-600 flex-col group hover:dark:border-gray-400 border-gray-400 hover:border-gray-700">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 md:gap-4 items-center flex-row">
            <div className="w-10 aspect-square md:w-12 md:h-12 overflow-hidden rounded relative flex-none">
              <Image alt="" src={"/avatar.webp"} fill />
            </div>
            <div className="flex flex-col w-full overflow-hidden text-ellipsis">
              <p className="text-base font-semibold">{item.name}</p>
              <p className="md:text-sm font-light lowercase text-ellipsis overflow-hidden w-full text-xs">
                {item.email}
              </p>
            </div>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-6 h-6 rounded-full items-center justify-center bg-green-500",
                  item.affiliate?.status === "approved" ? "flex" : "hidden"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  getDetailReqAffiliate(item.affiliate?.id_affiliate);
                  setIsOpen(true);
                }}
              >
                <HeartHandshake className="w-4 h-4 fill-yellow-400 stroke-black stroke-1" />
              </button>
            </SheetTrigger>
            <SheetContent className="min-w-[40vw]">
              <SheetHeader>
                <SheetTitle>Detail Affiliate</SheetTitle>
              </SheetHeader>
              <div className="h-full w-full flex items-center">
                <ScrollArea className="h-[90vh] w-full">
                  <div className="flex w-full gap-4 flex-col">
                    <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 border shadow rounded">
                      <div className="flex items-center gap-1 md:gap-4 w-full justify-between">
                        <p className="font-semibold">{currentReq?.name}</p>
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black bg-green-300"
                            )}
                          >
                            {currentReq?.status}
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
                      <p className="text-base font-semibold">Promosi:</p>
                      <div className="text-sm border-l-4 border-black pl-2">
                        {currentReq?.reason}
                      </div>
                    </Card>
                    <Card className="flex px-3 py-1.5 md:px-4 md:py-2 gap-2 bg-gray-100 dark:border dark:border-gray-700/70 flex-col shadow border rounded dark:border-gray-600">
                      <p className="text-base font-semibold">Website url:</p>
                      <ul className="text-sm relative *:pl-4">
                        {currentReq?.url.website.map((item: any) => (
                          <li
                            key={item}
                            className="py-2 border-b first:border-t border-gray-500 dark:border-gray-700 justify-between flex items-center"
                          >
                            <p>- {item}</p>
                            <Link href={`https://${item}`} target="_blank">
                              <ArrowUpRightFromSquare className="w-3 h-3" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    {(currentReq?.url.ig ||
                      currentReq?.url.fb ||
                      currentReq?.url.x ||
                      currentReq?.url.yt) && (
                      <div className="w-full flex flex-col gap-3">
                        {(currentReq?.url.ig || currentReq?.url.fb) && (
                          <div className="grid w-full grid-cols-2 gap-3">
                            {currentReq?.url.ig && (
                              <Card
                                className={cn(
                                  "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                                  !currentReq?.url.fb
                                    ? "col-span-2"
                                    : "col-span-2 lg:col-span-1"
                                )}
                              >
                                <Instagram className="w-6 h-6 mx-3" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-black h-[70%]"
                                />
                                <div className="flex w-full justify-between items-center px-3 overflow-hidden gap-3">
                                  <p className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                                    {currentReq?.url.ig}
                                  </p>
                                  <Link
                                    href={`https://www.instagram.com/${currentReq?.url.ig}`}
                                    target="_blank"
                                    className="flex-none"
                                  >
                                    <ArrowUpRightFromSquare className="w-3 h-3" />
                                  </Link>
                                </div>
                              </Card>
                            )}
                            {currentReq?.url.fb && (
                              <Card
                                className={cn(
                                  "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                                  !currentReq?.url.ig
                                    ? "col-span-2"
                                    : "col-span-2 lg:col-span-1"
                                )}
                              >
                                <Facebook className="w-6 h-6 mx-3" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-black h-[70%]"
                                />
                                <div className="flex w-full justify-between items-center px-3 overflow-hidden gap-3">
                                  <p className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                                    {currentReq?.url.fb}
                                  </p>
                                  <Link
                                    href={`https://www.facebook.com/${currentReq?.url.fb}`}
                                    target="_blank"
                                    className="flex-none"
                                  >
                                    <ArrowUpRightFromSquare className="w-3 h-3" />
                                  </Link>
                                </div>
                              </Card>
                            )}
                          </div>
                        )}
                        {(currentReq?.url.x || currentReq?.url.yt) && (
                          <div className="grid grid-cols-2 gap-3">
                            {currentReq?.url.x && (
                              <Card
                                className={cn(
                                  "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                                  !currentReq?.url.yt
                                    ? "col-span-2"
                                    : "col-span-2 lg:col-span-1"
                                )}
                              >
                                <Twitter className="w-6 h-6 mx-3" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-black h-[70%]"
                                />
                                <div className="flex w-full justify-between items-center px-3 overflow-hidden gap-3">
                                  <p className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                                    {currentReq?.url.yt}
                                  </p>
                                  <Link
                                    href={`https://www.youtube.com/@${currentReq?.url.yt}`}
                                    target="_blank"
                                    className="flex-none"
                                  >
                                    <ArrowUpRightFromSquare className="w-3 h-3" />
                                  </Link>
                                </div>
                              </Card>
                            )}
                            {currentReq?.url.yt && (
                              <Card
                                className={cn(
                                  "w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600",
                                  !currentReq?.url.x
                                    ? "col-span-2"
                                    : "col-span-2 lg:col-span-1"
                                )}
                              >
                                <Youtube className="w-6 h-6 mx-3" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-black h-[70%]"
                                />
                                <div className="flex w-full justify-between items-center px-3 overflow-hidden gap-3">
                                  <p className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                                    {currentReq?.url.x}
                                  </p>
                                  <Link
                                    href={`https://x.com/${currentReq?.url.x}`}
                                    target="_blank"
                                    className="flex-none"
                                  >
                                    <ArrowUpRightFromSquare className="w-3 h-3" />
                                  </Link>
                                </div>
                              </Card>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {(!currentReq?.url.ig ||
                      !currentReq?.url.fb ||
                      !currentReq?.url.x ||
                      !currentReq?.url.yt) && (
                      <div className="w-full flex gap-3">
                        {!currentReq?.url.ig && (
                          <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                            <Instagram className="w-5 h-5" />
                            <div className="absolute w-full h-full justify-center items-center flex">
                              <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                            </div>
                          </Card>
                        )}
                        {!currentReq?.url.fb && (
                          <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                            <Facebook className="w-5 h-5" />
                            <div className="absolute w-full h-full justify-center items-center flex">
                              <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                            </div>
                          </Card>
                        )}
                        {!currentReq?.url.x && (
                          <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                            <Twitter className="w-5 h-5" />
                            <div className="absolute w-full h-full justify-center items-center flex">
                              <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                            </div>
                          </Card>
                        )}
                        {!currentReq?.url.yt && (
                          <Card className="w-full h-10 bg-gray-100 relative justify-center items-center flex shadow border rounded dark:border-gray-600">
                            <Youtube className="w-5 h-5" />
                            <div className="absolute w-full h-full justify-center items-center flex">
                              <div className="w-[1.5px] h-7 rotate-45 bg-black ring-[1px] ring-white rounded-full dark:bg-white dark:ring-black" />
                            </div>
                          </Card>
                        )}
                      </div>
                    )}
                    <div className="flex w-full flex-col gap-1">
                      <Label className="text-xs md:text-sm">
                        Affiliate Code
                      </Label>
                      <Input
                        value={currentReq?.referral_code}
                        disabled
                        className="disabled:opacity-100 uppercase tracking-[5px] font-bold text-center text-sm md:text-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                      />
                    </div>
                    <div className="h-full border dark:border-gray-700/70 rounded-md p-0 md:p-4">
                      <div className="flex md:justify-between md:items-center px-4 pt-4 gap-2 md:gap-0 md:px-5 mb-4 flex-col md:flex-row items-start">
                        <CardTitle>Income Flow</CardTitle>
                        <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                          <Button
                            className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                            variant={"ghost"}
                            onClick={() => onChangeMonth("prev")}
                            disabled={mth === 0}
                          >
                            <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                          </Button>
                          <span className="capitalize md:w-20 w-14 select-none flex items-center justify-center text-xs md:text-sm">
                            {month[mth].label}
                          </span>
                          <Button
                            className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                            variant={"ghost"}
                            onClick={() => onChangeMonth("next")}
                            disabled={mth === month.length - 1}
                          >
                            <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="xl:h-[250px] md:h-[230px] h-[200px]">
                        <ChartAffiliate month={month[mth].value} />
                      </div>
                    </div>
                    <div className="h-full border dark:border-gray-700/70 rounded-md p-2 md:p-4 space-y-2">
                      <Card className="h-12 px-5 rounded-sm flex bg-gray-200 dark:bg-gray-700/70 justify-center font-semibold capitalize items-center">
                        Income - {month[mth].label}
                      </Card>
                      {mapIncome.map((item) => (
                        <Card
                          key={item.id}
                          className="p-2 md:p-3 lg:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <ArrowDownCircle className="lg:h-7 lg:w-7 h-5 w-5 stroke-[1.5] mr-2 text-green-500" />
                            <div>
                              <div className="font-semibold">{item.nama}</div>
                              <div className="text-xs">{item.tanggal}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end font-semibold">
                            {formatRupiah(item.cash)}
                          </div>
                        </Card>
                      ))}
                      <div className="w-full">
                        <Button
                          className="w-full mt-2"
                          variant={"destructive"}
                          onClick={() => onOpen("reject-affiliate")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Stop Akses
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center pt-2 md:pt-4 mt-2 md:mt-4 w-full gap-2 md:gap-4 border-t border-gray-400 group-hover:border-gray-700 dark:border-gray-600 group-hover:dark:border-gray-400">
          <div className="flex justify-between w-full flex-col gap-1 pl-2 border-l-2 border-gray-700 dark:border-gray-500 md:gap-2">
            <div className="w-auto flex-none text-xs">
              {item.phone_number ? (
                item.phone_number
              ) : (
                <p className="italic text-xs text-gray-700 px-2 bg-gray-200 dark:bg-gray-700/80 dark:text-white rounded py-0.5">
                  WhatsApp not yet
                </p>
              )}
            </div>
            <div className="w-auto flex-none text-xs md:text-sm text-gray-500 dark:text-gray-200">
              {item.created_at && formatTanggalWaktu(item.created_at)}
            </div>
          </div>
          <div className="w-auto flex-none flex justify-center ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="p-0 h-8 w-8 lg:w-10 lg:h-10 border-gray-400 dark:border-gray-600 border"
                  variant={"ghost"}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[150px]" align="end">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() => onOpen("edit-user", item.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </CommandItem>
                    </CommandList>
                    <CommandList>
                      <CommandItem
                        className="text-red-400 aria-selected:text-red-500"
                        onSelect={() => onOpen("delete-user", item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default UserCard;
