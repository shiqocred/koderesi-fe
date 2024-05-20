"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ChartTransaction } from "./chart-transaction";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PlusCircle,
  Search,
  TextSelect,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn, formatNumber, formatRupiah, month } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDebounce } from "@/hooks/use-debounce";
import { useCookies } from "next-client-cookies";

interface UsersProps {
  id: string;
  name: string;
  total_tokens: number;
  transaction: number;
}

interface TransactionsMapProps {
  id: string;
  methode_payment: string;
  code_transaction: string;
  amount_bill: number;
  amount_credit: number;
  transaction_date: string;
  transaction_time: string;
  status: string;
}

interface selectedDateProps {
  month: number;
  year: number;
}

interface firstLastDateProps {
  first_month: number;
  last_month: number;
  first_year: number;
  last_year: number;
}

export interface selectedBarDataProps {
  date: number;
  total: number;
}

export const CreditsClient = () => {
  const { onOpen } = useModal();
  const [selectedBar, setSelectedBar] = useState<selectedDateProps>({
    month: 1,
    year: new Date().getFullYear(),
  });
  const [firstLast, setFirstLast] = useState<firstLastDateProps>();
  const [selectedBarData, setSelectedBarData] = useState<
    selectedBarDataProps[]
  >([]);
  const [current, setCurrent] = useState<UsersProps>({
    id: "",
    name: "",
    total_tokens: 0,
    transaction: 0,
  });
  const [trasactionList, setTrasactionList] = useState<UsersProps[]>([]);
  const [trasactionMapList, setTrasactionMapList] = useState<
    TransactionsMapProps[]
  >([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const [isUpdatingBar, setIsUpdatingBar] = useState<boolean>(false);
  const [search, setSearch] = useState(params.get("q") ?? "");
  const searchValue = useDebounce(search);

  const handleCurrentId = useCallback(
    (id: string, q: string) => {
      setSearch(q);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        currentId: id,
        q: q,
      };

      if (!id || id === "") {
        delete updateQuery.currentId;
      }
      if (!q || q === "") {
        delete updateQuery.q;
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/transactions",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const getTransactionList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/transaksi${
          searchValue !== ""
            ? search !== ""
              ? "?q=" + searchValue ?? search
              : ""
            : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrasactionList(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

  const getDetailTransaction = async (dataId: string) => {
    try {
      setIsUpdating(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/transaksi/${dataId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setCurrent({
        id: data.detail.id,
        name: data.detail.name,
        total_tokens: data.detail.total_tokens,
        transaction: data.total_transaction_amount,
      });
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_DETAIL]:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getBarTransaction = async (dataId: string, method: string) => {
    const currentMonth = selectedBar.month;
    const currentYear = selectedBar.year;
    const prevMonth = currentMonth <= 1 ? 12 : currentMonth - 1;
    const nextMonth = currentMonth >= 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth >= 12 ? currentYear + 1 : currentYear;
    const prevYear = currentMonth <= 1 ? currentYear - 1 : currentYear;
    try {
      setIsUpdatingBar(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/transaksi/bar/${dataId}${
          method === "prev" ? "?m=" + prevMonth + "&y=" + prevYear : ""
        }${method === "next" ? "?m=" + nextMonth + "&y=" + nextYear : ""}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = res.data.data;
      setTrasactionMapList(response.transactions);
      setSelectedBar({
        month: parseFloat(response.selected_month.date.month),
        year: parseFloat(response.selected_month.date.year),
      });
      setSelectedBarData(response.bar);
      setFirstLast({
        first_month: parseFloat(response.month.first_month.month),
        last_month: parseFloat(response.month.last_month.month),
        first_year: parseFloat(response.month.first_month.year),
        last_year: parseFloat(response.month.last_month.year),
      });
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_BAR]:", error);
    } finally {
      setIsUpdatingBar(false);
    }
  };

  useEffect(() => {
    handleCurrentId(params.get("currentId") ?? "", searchValue);
  }, [searchValue]);
  useEffect(() => {
    getTransactionList();
  }, [params.get("q")]);

  useEffect(() => {
    if (params.get("currentId")) {
      getDetailTransaction(params.get("currentId") ?? "");
      getBarTransaction(params.get("currentId") ?? "", "");
    } else {
      setCurrent({ id: "", name: "", total_tokens: 0, transaction: 0 });
    }
  }, [params.get("currentId")]);

  useEffect(() => {
    getTransactionList();
    handleCurrentId(params.get("currentId") ?? "", params.get("q") ?? "");
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row">
      <div className="w-full lg:1/2 xl:w-2/5 lg:flex-1">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          {trasactionList.length !== 0 ? (
            <ul className="md:pt-2 space-y-2 flex flex-col relative w-full h-auto">
              {isGetList && (
                <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                </div>
              )}
              {trasactionList.map((item) => (
                <li className="capitalize" key={item.id}>
                  <Button
                    className={cn(
                      "md:py-2 md:px-5 px-2 py-1.5 h-14 md:h-20 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white",
                      current.id === item.id
                        ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                    )}
                    onClick={() =>
                      current.id !== item.id && handleCurrentId(item.id, search)
                    }
                  >
                    <div className="w-full">
                      <div className="flex gap-2 items-center w-full">
                        <div className="h-10 md:h-14 aspect-square overflow-hidden rounded relative flex-none">
                          <Image alt="" src={"/avatar.webp"} fill />
                        </div>
                        <div className="flex flex-col xl:flex-row w-full gap-1">
                          <p className="text-sm md:text-base font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1 capitalize">
                            {item.name}
                          </p>
                          <div className="flex gap-4 items-center">
                            <div className="w-[70px] xl:w-[80px] flex-none xl:text-center text-xs lg:text-sm">
                              {formatNumber(item.total_tokens)} Kredit
                            </div>
                            <div className="xl:w-[150px] flex-none text-center text-xs lg:text-sm">
                              {formatRupiah(item.transaction)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-auto lg:w-[50px] flex-none flex justify-center">
                      <Button
                        size={"icon"}
                        className=" hover:bg-gray-200 dark:hover:bg-gray-700 h-6 w-6"
                        variant={"ghost"}
                        onClick={() => {
                          current.id === item.id && handleCurrentId("", search);
                        }}
                      >
                        {current.id === item.id ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="md:pt-2 space-y-2 flex flex-col relative w-full">
              {isGetList && (
                <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                </div>
              )}
              <div className="w-full h-[220px] flex items-center justify-center flex-col text-gray-400">
                <TextSelect className="md:w-16 md:h-16 w-12 h-12" />
                <h3 className="text-lg md:text-2xl font-bold mt-2 text-gray-500">
                  No data listed.
                </h3>
                <p className="text-xs md:text-sm leading-none">
                  Please, include any data or correct params.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="h-full w-full lg:w-1/2 xl:w-3/5 lg:flex-1 relative">
        {isUpdating && (
          <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
            <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
          </div>
        )}
        {current.id !== "" ? (
          <Card className="flex flex-col p-2 md:p-4 gap-4 h-full w-full">
            <Card className="md:py-2 md:px-3 px-2 py-1.5 rounded-sm text-sm flex bg-gray-200 dark:border dark:border-gray-700/70 justify-between items-center">
              <div className="w-full">
                <div className="flex gap-x-4 items-center">
                  <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex flex-col xl:flex-row xl:justify-between w-full gap-1">
                    <p className="text-sm md:text-base font-semibold capitalize">
                      {current.name}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="xl:w-[150px] md:w-[80px] flex-none xl:text-center md:text-sm text-xs">
                        {formatNumber(current.total_tokens)} Kredit
                      </div>
                      <div className="xl:w-[150px] md:w-[100px] flex-none xl:text-center md:text-sm text-xs">
                        {formatRupiah(current.transaction)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Button
              className="bg-green-400 hover:bg-green-300 text-black"
              onClick={() => onOpen("add-transaction")}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Tambah Transaksi
            </Button>
            <div className="h-full border dark:border-gray-700/70 rounded-md p-0 xl:p-4">
              <div className="flex xl:justify-between xl:items-center px-4 pt-4 gap-2 xl:gap-0 md:px-5 mb-4 flex-col xl:flex-row items-start">
                <CardTitle>Transaksi Flow</CardTitle>
                <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                  <Button
                    className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                    variant={"ghost"}
                    onClick={() => getBarTransaction(current.id, "prev")}
                    disabled={
                      selectedBar.month === firstLast?.first_month &&
                      selectedBar.year === firstLast.first_year
                    }
                  >
                    <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                  <span className="capitalize md:w-36 w-full select-none flex items-center justify-center text-xs md:text-sm">
                    {month[selectedBar.month - 1].label +
                      " - " +
                      selectedBar.year}
                  </span>
                  <Button
                    className="md:h-5 md:w-5 rounded-sm p-0 w-4 h-4"
                    variant={"ghost"}
                    onClick={() => getBarTransaction(current.id, "next")}
                    disabled={
                      selectedBar.month === firstLast?.last_month &&
                      selectedBar.year === firstLast.last_year
                    }
                  >
                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                </div>
              </div>
              <div className="xl:h-[350px] md:h-[300px] h-[200px] relative">
                {!isUpdating && isUpdatingBar && (
                  <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
                  </div>
                )}
                <ChartTransaction
                  month={month[selectedBar.month - 1].value}
                  initialData={selectedBarData}
                />
              </div>
            </div>
            <div className="h-full border dark:border-gray-700/70 rounded-md p-2 md:p-4 space-y-2">
              <Card className="h-12 px-5 rounded-sm flex bg-gray-200 dark:bg-gray-700/70 justify-center font-semibold capitalize items-center">
                Transaksi -{" "}
                {month[selectedBar.month - 1].label + " " + selectedBar.year}
              </Card>
              {trasactionMapList.length === 0 && (
                <Card className="p-2 md:p-3 lg:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-center items-center text-gray-500 dark:text-gray-200/70">
                  Tidak ada transaksi bulan{" "}
                  {month[selectedBar.month - 1].label + " " + selectedBar.year}
                </Card>
              )}
              {trasactionMapList.map((item) => (
                <Card
                  key={item.id}
                  className="p-2 md:p-3 lg:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <ArrowDownCircle className="lg:h-7 lg:w-7 h-5 w-5 stroke-[1.5] mr-2 text-green-500" />
                    <div>
                      <div className="font-semibold">
                        {item.code_transaction}-{item.methode_payment}
                      </div>
                      <div className="text-xs">{item.transaction_date}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end font-semibold">
                    {formatRupiah(item.amount_bill)}
                    <div className="flex gap-1 items-center text-[10px] leading-none font-light text-gray-500 dark:text-gray-200/70">
                      <p>+</p>
                      <p>{formatNumber(item.amount_credit)}</p>
                      <p>Kredit</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-sm flex justify-between items-center w-full">
            <div className="w-full h-[300px] flex items-center justify-center flex-col text-gray-400">
              <TextSelect className="md:w-16 md:h-16 w-12 h-12" />
              <h3 className="text-lg md:text-2xl font-bold mt-2 text-gray-500">
                No data viewed.
              </h3>
              <p className="text-xs md:text-sm leading-none">
                Please, select any data first.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
