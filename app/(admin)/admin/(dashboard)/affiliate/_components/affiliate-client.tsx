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

import { useCookies } from "next-client-cookies";
import axios from "axios";
import DetailAffiliate from "./detail-affiliate";
import { ScrollArea } from "@/components/ui/scroll-area";
import DetailWithdraw from "./detail-withdraw";

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
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [currentReq, setCurrentReq] = useState<any>();
  const [affiliateReqList, setAffiliateReqList] = useState<any[]>([]);
  const [currentWd, setCurrentWd] = useState<any>();
  const [affiliateWdList, setAffiliateWdList] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();

  const getAffiliateReqList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAffiliateReqList(res.data.data.data ?? []);
    } catch (error) {
      console.log("[ERROR_GET_AFFILIATE_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

  const getDetailReqAffiliate = async (dataId: string) => {
    try {
      setIsUpdating(true);
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
    } catch (error) {
      console.log("[ERROR_GET_AFFILIATE_REQ_DETAIL]:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const getAffiliateWdList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/withdrawList`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAffiliateWdList(res.data.data.data ?? []);
    } catch (error) {
      console.log("[ERROR_GET_AFFILIATE_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

  console.log(affiliateWdList);

  const getDetailWdAffiliate = async (dataId: string) => {
    try {
      setIsUpdating(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/withdrawDetail/${dataId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentWd(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_AFFILIATE_REQ_DETAIL]:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCurrentAffiliateId = useCallback(
    (ca: string, cw: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        ca: ca,
        cw: cw,
      };

      if (!ca || ca === "") {
        delete updateQuery.ca;
      }

      if (!cw || cw === "") {
        delete updateQuery.cw;
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/affiliate",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url, { scroll: false });
    },
    [params, router]
  );

  useEffect(() => {
    if (params.get("ca")) {
      getDetailReqAffiliate(params.get("ca") ?? "");
    } else if (params.get("cw")) {
      getDetailWdAffiliate(params.get("cw") ?? "");
    }
  }, [params.get("ca"), params.get("cw")]);

  useEffect(() => {
    if (cookies.get("affiliateReq")) {
      if (params.get("ca")) {
        getAffiliateReqList();
        getDetailReqAffiliate(params.get("ca") ?? "");
        console.log("affreq", "ca", true);
      } else if (params.get("cw")) {
        getAffiliateWdList();
        getDetailWdAffiliate(params.get("cw") ?? "");
        console.log("affreq", "cw", true);
      }

      console.log("affreq", true);
      return cookies.remove("affiliateReq");
    }
  }, [params.get("ca"), params.get("cw"), cookies.get("affiliateReq")]);

  useEffect(() => {
    getAffiliateReqList();
    getAffiliateWdList();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col">
      <Card className="flex justify-between h-10 text-sm lg:text-base md:h-14 items-center px-3 md:px-5 shadow border border-gray-100">
        <p>Total Affiliate</p>
        <p>10</p>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 md:gap-6 ">
        <div className="w-full relative h-full">
          <div className="flex flex-col gap-4 md:gap-6 w-full sticky top-5">
            <Card className="p-2 md:p-4 w-full shadow border border-gray-100">
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
              <ScrollArea className="h-[166px]">
                <ul className="lg:mt-2 space-y-2 flex flex-col">
                  {affiliateReqList.map((item) => (
                    <li className="capitalize" key={item.id}>
                      <Button
                        className={cn(
                          "py-3 px-5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white disabled:opacity-100",
                          params.get("ca") === item.id
                            ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                        )}
                        onClick={() => handleCurrentAffiliateId(item.id, "")}
                        disabled={params.get("ca") === item.id}
                      >
                        <div className="flex w-full gap-1 items-center justify-between">
                          <div className="w-full">
                            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.name}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-[80px] flex-none text-center text-xs lg:text-sm py-1 rounded-sm text-black",
                              item.is_affiliate === "pending" &&
                                "bg-yellow-300",
                              item.is_affiliate === "approved" &&
                                "bg-green-300",
                              item.is_affiliate === "rejected" && "bg-red-300"
                            )}
                          >
                            {item.is_affiliate}
                          </div>
                        </div>

                        <div className="lg:w-[30px] flex-none flex justify-center px-2">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </Card>
            <Card className="p-2 md:p-4 w-full shadow border border-gray-100">
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
              <ScrollArea className="h-[202px]">
                <ul className="lg:mt-2 space-y-2 flex flex-col">
                  {affiliateWdList.map((item) => (
                    <li className="capitalize" key={item.id}>
                      <Button
                        className={cn(
                          "py-3 px-5 rounded-sm text-xs md:text-sm flex h-auto gap-1 justify-between md:items-center w-full text-start text-black dark:text-white disabled:opacity-100",
                          params.get("cw") === item.id
                            ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                        )}
                        onClick={() => handleCurrentAffiliateId("", item.id)}
                        disabled={params.get("cw") === item.id}
                      >
                        <div className="flex flex-row w-full gap-1 items-center justify-between relative">
                          <div className="w-full items-center">
                            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.name}
                            </p>
                            <div className="w-[80px] flex-nonen text-xs lg:text-sm">
                              {formatRupiah(item.amount)}
                            </div>
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
                        <div className="lg:w-[30px] flex-none flex justify-center px-2">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </Card>
          </div>
        </div>
        <div className="w-full">
          <Card className="p-2 md:p-4 w-full gap-2 md:gap-4 flex-col flex h-auto shadow border border-gray-100">
            {params.get("ca") && currentReq && (
              <DetailAffiliate
                id={currentReq.id}
                nama={currentReq.name}
                status={currentReq.status}
                url={currentReq.url}
                reason={currentReq.reason}
                referral_code={currentReq.referral_code}
              />
            )}
            {params.get("cw") && currentWd && (
              <DetailWithdraw
                id={currentWd.id}
                nama={currentWd.user_name}
                status={currentWd.status}
                date={currentWd.withdraw_date}
                time={currentWd.withdraw_time}
                method={currentWd.withdraw_method}
                transactionNumber={currentWd.transaction_number}
                reason={currentWd.reason}
                cash={currentWd.amount}
                numberPhone={currentWd.target_number}
              />
            )}
            {!params.get("ca") && !params.get("cw") && (
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
