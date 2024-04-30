"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import qs from "query-string";
import {
  ChevronLeft,
  ChevronRight,
  DatabaseBackup,
  Search,
  TextSelect,
} from "lucide-react";

import { cn, formatRupiah } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import WaitingWithdraw from "./waiting-withdraw";
import RejectedWithdraw from "./rejected-withdraw";
import ApprovedWithdraw from "./approved-withdraw";
import WaitingAffiliate from "./waiting-affiliate";
import ApprovedAffiliate from "./approved-affiliate";
import RejectedAffiliate from "./rejected-affiliate";

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

const AffiliateClient = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [pageA1, setPageA1] = useState<number>(0);
  const [pageA2, setPageA2] = useState<number>(3);
  const [pageW1, setPageW1] = useState<number>(0);
  const [pageW2, setPageW2] = useState<number>(3);
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
  const handlePPA = () => {
    if (pageA1 <= 0) {
      setPageA1(0);
    } else {
      setPageA1(pageA1 - 3);
    }
    if (pageA2 <= 3) {
      setPageA2(3);
    } else {
      setPageA2(pageA2 - 3);
    }
  };
  const handleNPA = () => {
    const lastPage = mapUsers.length;
    if (pageA1 >= lastPage - 3) {
      setPageA1(lastPage - 3);
    } else {
      setPageA1(pageA1 + 3);
    }
    if (pageA2 >= lastPage) {
      setPageA2(lastPage);
    } else {
      setPageA2(pageA2 + 3);
    }
  };
  const handlePPW = () => {
    if (pageW1 <= 0) {
      setPageW1(0);
    } else {
      setPageW1(pageW1 - 3);
    }
    if (pageW2 <= 3) {
      setPageW2(3);
    } else {
      setPageW2(pageW2 - 3);
    }
  };
  const handleNPW = () => {
    const lastPage = mapUsers.length;
    if (pageW1 >= lastPage - 3) {
      setPageW1(lastPage - 3);
    } else {
      setPageW1(pageW1 + 3);
    }
    if (pageW2 >= lastPage) {
      setPageW2(lastPage);
    } else {
      setPageW2(pageW2 + 3);
    }
  };

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
    window.scrollTo({ top: 800, behavior: "smooth" });
  }, [currentA, currentW]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 md:gap-6">
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
            <ul className="lg:mt-2 space-y-2 flex flex-col">
              {mapUsers.slice(pageA1, pageA2).map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white disabled:opacity-100",
                      currentA.id === item.id
                        ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                    )}
                    onClick={() => handleCurrentAffiliateId(item.id)}
                    disabled={currentA.id === item.id}
                  >
                    <div className="flex gap-2 items-center w-full">
                      <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col xl:flex-row w-full gap-1 xl:items-center justify-between">
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

                    <div className="lg:w-[30px] flex-none flex justify-center px-2">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex mt-2 w-full justify-end items-center gap-2">
              <Button
                className="p-0 h-8 w-8 md:h-10 md:w-10 bg-green-400 hover:bg-green-300 text-black"
                onClick={handlePPA}
                disabled={pageA1 === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                className="p-0 h-8 w-8 md:h-10 md:w-10 bg-green-400 hover:bg-green-300 text-black"
                onClick={handleNPA}
                disabled={pageA2 === mapUsers.length}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
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
            <ul className="lg:mt-2 space-y-2 flex flex-col">
              {mapWithdraw.slice(pageW1, pageW2).map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white disabled:opacity-100",
                      currentW.id === item.id
                        ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                    )}
                    onClick={() => handleCurrentWithdrawId(item.id)}
                    disabled={currentW.id === item.id}
                  >
                    <div className="flex gap-2 items-center w-full">
                      <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col xl:flex-row w-full gap-1 xl:items-center justify-between relative">
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
            <div className="flex mt-2 w-full justify-end items-center gap-2">
              <Button
                className="p-0 h-8 w-8 md:h-10 md:w-10 bg-green-400 hover:bg-green-300 text-black"
                onClick={handlePPW}
                disabled={pageW1 === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                className="p-0 h-8 w-8 md:h-10 md:w-10 bg-green-400 hover:bg-green-300 text-black"
                onClick={handleNPW}
                disabled={pageW2 === mapWithdraw.length}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
        <div className="w-full">
          <Card className="p-2 md:p-4 w-full gap-2 md:gap-4 flex-col flex h-auto">
            {/* waiting */}
            {currentA.id !== 0 && currentA.status === "waiting" && (
              <WaitingAffiliate {...currentA} />
            )}
            {/* rejected */}
            {currentA.id !== 0 && currentA.status === "rejected" && (
              <RejectedAffiliate {...currentA} />
            )}
            {/* approved */}
            {currentA.id !== 0 && currentA.status === "approved" && (
              <ApprovedAffiliate {...currentA} />
            )}
            {/* withdraw */}
            {currentW.id !== 0 && currentW.status === "waiting" && (
              <WaitingWithdraw {...currentW} />
            )}
            {currentW.id !== 0 && currentW.status === "approved" && (
              <ApprovedWithdraw {...currentW} />
            )}
            {currentW.id !== 0 && currentW.status === "rejected" && (
              <RejectedWithdraw {...currentW} />
            )}
            {currentW.id === 0 && currentA.id === 0 && (
              <div className="w-full h-[300px] flex items-center justify-center flex-col text-gray-400">
                <TextSelect className="w-16 h-16 " />
                <h3 className="text-2xl font-bold mt-2 text-gray-500">
                  No data viewed.
                </h3>
                <p className="text-sm leading-none">
                  Please, select any data first.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AffiliateClient;
