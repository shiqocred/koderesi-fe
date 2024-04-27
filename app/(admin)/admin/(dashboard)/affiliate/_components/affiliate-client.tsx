"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, formatRupiah } from "@/lib/utils";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Save,
  Search,
  Send,
  Undo2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { ChartAffiliate } from "./chart-affiliate";
import { useModal } from "@/hooks/use-modal";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface UsersProps {
  id: number;
  nama: string;
  status: string;
}

const mapUsers: UsersProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    status: "waiting",
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    status: "approved",
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    status: "rejected",
  },
  {
    id: 58203384204,
    nama: "Ara Breitenberg",
    status: "rejected",
  },
  {
    id: 58203384205,
    nama: "Corrine Stark",
    status: "approved",
  },
  {
    id: 58203384206,
    nama: "Johnpaul Waelchi",
    status: "approved",
  },
];
interface WithdrawProps {
  id: number;
  nama: string;
  cash: number;
  status: string;
}

const mapWithdraw: WithdrawProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    cash: 30000,
    status: "waiting",
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    cash: 30000,
    status: "approved",
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    cash: 30000,
    status: "rejected",
  },
  {
    id: 58203384204,
    nama: "Ara Breitenberg",
    cash: 30000,
    status: "rejected",
  },
  {
    id: 58203384205,
    nama: "Corrine Stark",
    cash: 30000,
    status: "approved",
  },
  {
    id: 58203384206,
    nama: "Johnpaul Waelchi",
    cash: 30000,
    status: "approved",
  },
];

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

const AffiliateClient = () => {
  const [mth, setMth] = useState<number>(0);
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isEditedA, setIsEditedA] = useState<boolean>(false);
  const [isEditedW, setIsEditedW] = useState<boolean>(false);
  const [currentA, setCurrentA] = useState<UsersProps>({
    id: 0,
    nama: "",
    status: "",
  });
  const [currentW, setCurrentW] = useState<WithdrawProps>({
    id: 0,
    nama: "",
    cash: 0,
    status: "",
  });
  const params = useSearchParams();
  const router = useRouter();

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

  const handleCurrentAffiliateId = useCallback(
    (id: number) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        ca: id,
      };

      delete updateQuery.cw;

      const url = qs.stringifyUrl(
        {
          url: "/admin/affiliate",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );
  const handleCurrentWithdrawId = useCallback(
    (id: number) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        cw: id,
      };

      delete updateQuery.ca;

      const url = qs.stringifyUrl(
        {
          url: "/admin/affiliate",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  useEffect(() => {
    if (params.get("ca")) {
      const currentUser = mapUsers.find(
        (item) => item.id === parseFloat(params.get("ca") ?? "0")
      );
      setCurrentA({
        id: currentUser?.id ?? 0,
        nama: currentUser?.nama ?? "",
        status: currentUser?.status ?? "",
      });
      setCurrentW({
        id: 0,
        nama: "",
        cash: 0,
        status: "",
      });
    } else if (params.get("cw")) {
      const currentUser = mapWithdraw.find(
        (item) => item.id === parseFloat(params.get("cw") ?? "0")
      );
      setCurrentA({
        id: 0,
        nama: "",
        status: "",
      });
      setCurrentW({
        id: currentUser?.id ?? 0,
        nama: currentUser?.nama ?? "",
        cash: currentUser?.cash ?? 0,
        status: currentUser?.status ?? "",
      });
    }
  }, [params]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col">
      <Card className="flex justify-between h-10 text-sm lg:text-base md:h-14 items-center px-3 md:px-5">
        <p>Total Affiliate</p>
        <p>10</p>
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 md:gap-6">
        <div className="flex flex-col gap-4 md:gap-6 w-full">
          <Card className="p-2 md:p-4 w-full">
            <div className="w-full relative flex items-center mb-4">
              <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
              <Input
                className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                placeholder="Search user name..."
              />
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 lg:flex justify-center items-center h-10 text-sm font-semibold rounded-sm px-5 hidden">
              Pengajuan Affiliate Program
            </div>
            <ul className="lg:mt-2 space-y-2 flex flex-col h-[190px] overflow-y-scroll">
              {mapUsers.map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white",
                      currentA.id === item.id
                        ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                    )}
                    onClick={() => handleCurrentAffiliateId(item.id)}
                  >
                    <div className="w-full">
                      <div className="flex gap-2 items-center w-full">
                        <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                          <Image alt="" src={"/avatar.webp"} fill />
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-1 md:items-center justify-between">
                          <div className="w-full">
                            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.nama}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-[80px] flex-none text-center text-xs lg:text-sm py-1 rounded-sm text-black",
                              item.status === "waiting" && "bg-yellow-300",
                              item.status === "approved" && "bg-green-300",
                              item.status === "rejected" && "bg-red-300"
                            )}
                          >
                            {item.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-[30px] flex-none flex justify-center px-2">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-2 md:p-4 w-full">
            <div className="w-full relative flex items-center mb-4">
              <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
              <Input
                className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                placeholder="Search user name..."
              />
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 lg:flex justify-center items-center h-10 text-sm font-semibold rounded-sm px-5 hidden">
              Pengajuan Withdraw
            </div>
            <ul className="lg:mt-2 space-y-2 flex flex-col h-[190px] overflow-y-scroll">
              {mapWithdraw.map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white",
                      currentW.id === item.id
                        ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                    )}
                    onClick={() => handleCurrentWithdrawId(item.id)}
                  >
                    <div className="flex gap-2 items-center w-full">
                      <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col md:flex-row w-full gap-1 md:items-center justify-between relative">
                        <div className="w-full">
                          <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.nama}
                          </p>
                        </div>
                        <div className="flex md:gap-6 items-center">
                          <div className="w-[80px] flex-none text-center text-xs lg:text-sm">
                            {formatRupiah(item.cash)}
                          </div>
                          <div
                            className={cn(
                              "w-[80px] flex-none text-center text-xs lg:text-sm py-1 rounded-sm text-black",
                              item.status === "waiting" && "bg-yellow-300",
                              item.status === "approved" && "bg-green-300",
                              item.status === "rejected" && "bg-red-300"
                            )}
                          >
                            {item.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[30px] flex-none flex justify-center px-2">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="w-full" id="content">
          <Card className="p-2 md:p-4 w-full gap-2 md:gap-4 flex-col flex h-auto">
            {/* waiting */}
            {currentA.id !== 0 && currentA.status === "waiting" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentA.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentA.status === "waiting" && "bg-yellow-300",
                          currentA.status === "approved" && "bg-green-300",
                          currentA.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentA.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex w-full gap-4">
                  <Button className="w-full bg-red-500 hover:bg-red-400 text-black">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-400 text-black">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </>
            )}
            {/* rejected */}
            {currentA.id !== 0 && currentA.status === "rejected" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentA.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentA.status === "waiting" && "bg-yellow-300",
                          currentA.status === "approved" && "bg-green-300",
                          currentA.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentA.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex w-full gap-4">
                  <Input
                    value="Akun anda terdeteksi melakukan pelanggaran"
                    disabled={!isEditedA}
                    className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                  />
                  {!isEditedA ? (
                    <Button
                      className="bg-yellow-300 hover:bg-yellow-200 text-black flex-none"
                      size={"icon"}
                      onClick={() => setIsEditedA(!isEditedW)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-400 hover:bg-green-300 text-black flex-none"
                      size={"icon"}
                      onClick={() => setIsEditedA(!isEditedW)}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </>
            )}
            {/* approved */}
            {currentA.id !== 0 && currentA.status === "approved" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentA.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentA.status === "waiting" && "bg-yellow-300",
                          currentA.status === "approved" && "bg-green-300",
                          currentA.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentA.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex w-full flex-col gap-1">
                  <Label className="text-xs md:text-sm">Affiliate Code</Label>
                  <Input
                    value="FUNBIGSALE"
                    disabled
                    className="disabled:opacity-100 tracking-[5px] font-bold text-center text-sm md:text-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
                </div>
              </>
            )}
            {/* withdraw */}
            {currentW.id !== 0 && currentW.status === "waiting" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentW.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentW.status === "waiting" && "bg-yellow-300",
                          currentW.status === "approved" && "bg-green-300",
                          currentW.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentW.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nominal withdraw</p>
                  <p>{formatRupiah(300000)}</p>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nomor DANA</p>
                  <p>0888-8888-8888</p>
                </Card>
                <Card className="flex items-center flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-sm">
                  <Label className="text-xs md:text-sm">Update status</Label>
                  <div className="flex gap-2 md:gap-4 w-full flex-col-reverse md:flex-row">
                    <Button className="w-full bg-red-500 hover:bg-red-400 text-black">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button className="w-full bg-green-500 hover:bg-green-400 text-black">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </Card>
              </>
            )}
            {currentW.id !== 0 && currentW.status === "approved" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentW.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentW.status === "waiting" && "bg-yellow-300",
                          currentW.status === "approved" && "bg-green-300",
                          currentW.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentW.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nominal withdraw</p>
                  <p>{formatRupiah(300000)}</p>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nomor DANA</p>
                  <p>0888-8888-8888</p>
                </Card>
                <Card className="flex flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm ">
                  <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
                    <div className="flex flex-col gap-1 w-full">
                      <Label>Nomor Transaksi</Label>
                      <Input
                        value="325529134832"
                        className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <Label>Withdraw via</Label>
                      <Input
                        value="DANA"
                        className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
                    <div className="flex flex-col gap-1 w-full">
                      <Label>Tanggal</Label>
                      <Input
                        value="23 Des 2024"
                        className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <Label>Waktu</Label>
                      <Input
                        value="13:22:21"
                        className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                        disabled
                      />
                    </div>
                  </div>
                </Card>
              </>
            )}
            {currentW.id !== 0 && currentW.status === "rejected" && (
              <>
                <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
                  <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
                    <p className="font-semibold">{currentW.nama}</p>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                          currentW.status === "waiting" && "bg-yellow-300",
                          currentW.status === "approved" && "bg-green-300",
                          currentW.status === "rejected" && "bg-red-300"
                        )}
                      >
                        {currentW.status}
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nominal withdraw</p>
                  <p>{formatRupiah(300000)}</p>
                </Card>
                <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
                  <p className="font-semibold">Nomor DANA</p>
                  <p>0888-8888-8888</p>
                </Card>
                <Card className="flex flex-col px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm ">
                  <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
                    <Input
                      value="Terindikasi bermasalah, silahkan hubungi CS"
                      className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
                      disabled={!isEditedA}
                    />
                    {!isEditedW ? (
                      <Button
                        className="bg-yellow-300 hover:bg-yellow-200 text-black flex-none md:p-0 w-full md:w-10"
                        onClick={() => setIsEditedW(!isEditedW)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        className="bg-green-400 hover:bg-green-300 text-black flex-none"
                        size={"icon"}
                        onClick={() => setIsEditedW(!isEditedW)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AffiliateClient;
