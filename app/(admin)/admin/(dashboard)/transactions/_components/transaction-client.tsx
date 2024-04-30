"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ChartCredit } from "./chart-credits";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
  TextSelect,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn, formatRupiah, mapNewestTransaction } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface UsersProps {
  id: number;
  nama: string;
  kredit: number;
  cash: number;
}

const mapUsers: UsersProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    kredit: 1659,
    cash: 300000,
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    kredit: 1829,
    cash: 400000,
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    kredit: 2418,
    cash: 300000,
  },
  {
    id: 58203384204,
    nama: "Ara Breitenberg",
    kredit: 913,
    cash: 400000,
  },
  {
    id: 58203384205,
    nama: "Corrine Stark",
    kredit: 2089,
    cash: 300000,
  },
  {
    id: 58203384206,
    nama: "Johnpaul Waelchi",
    kredit: 984,
    cash: 500000,
  },
];

export const CreditsClient = () => {
  const [current, setCurrent] = useState<UsersProps>({
    id: 0,
    nama: "",
    kredit: 0,
    cash: 0,
  });
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { onOpen } = useModal();
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

  const handleCurrentId = useCallback(
    (id: number) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        currentId: id,
      };

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

  useEffect(() => {
    if (params.get("currentId")) {
      const currentUser = mapUsers.find(
        (item) => item.id === parseFloat(params.get("currentId") ?? "0")
      );
      setCurrent({
        id: currentUser?.id ?? 0,
        nama: currentUser?.nama ?? "",
        kredit: currentUser?.kredit ?? 0,
        cash: currentUser?.cash ?? 0,
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
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row">
      <div className="w-full lg:1/2 xl:w-2/5 lg:flex-1">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          <ul className="space-y-2 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Button
                  className={cn(
                    "md:py-2 md:px-5 px-2 py-1.5 h-14 md:h-20 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white",
                    current.id === item.id
                      ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                  )}
                  onClick={() => handleCurrentId(item.id)}
                >
                  <div className="w-full">
                    <div className="flex gap-2 items-center w-full">
                      <div className="h-10 md:h-14 aspect-square overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col xl:flex-row w-full gap-1">
                        <p className="text-sm md:text-base font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                          {item.nama}
                        </p>
                        <div className="flex gap-4 items-center">
                          <div className="w-[70px] xl:w-[80px] flex-none xl:text-center text-xs lg:text-sm">
                            {item.kredit} Kredit
                          </div>
                          <div className="xl:w-[100px] flex-none text-center text-xs lg:text-sm">
                            {formatRupiah(item.cash)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[30px] flex-none flex justify-center">
                    <Button
                      size={"icon"}
                      className=" hover:bg-gray-200 h-6 w-6"
                      variant={"ghost"}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="h-full w-full lg:1/2 xl:w-3/5 lg:flex-1">
        {current.id !== 0 ? (
          <Card className="flex flex-col p-2 md:p-4 gap-4 h-full w-full">
            <Card className="md:py-2 md:px-3 px-2 py-1.5 rounded-sm text-sm flex bg-gray-200 dark:border dark:border-gray-700/70 justify-between items-center">
              <div className="w-full">
                <div className="flex gap-x-4 items-center">
                  <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex flex-col xl:flex-row xl:justify-between w-full gap-1">
                    <p className="text-sm md:text-base font-semibold">
                      {current.nama}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="xl:w-[150px] md:w-[80px] flex-none xl:text-center md:text-sm text-xs">
                        {current.kredit} Kredit
                      </div>
                      <div className="xl:w-[150px] md:w-[100px] flex-none xl:text-center md:text-sm text-xs">
                        {formatRupiah(current.cash)}
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
              <div className="xl:h-[350px] md:h-[300px] h-[200px]">
                <ChartCredit month={month[mth].value} />
              </div>
            </div>
            <div className="h-full border dark:border-gray-700/70 rounded-md p-2 md:p-4 space-y-2">
              <Card className="h-12 px-5 rounded-sm flex bg-gray-200 dark:bg-gray-700/70 justify-center font-semibold capitalize items-center">
                Transaksi - {month[mth].label}
              </Card>
              {mapNewestTransaction
                .filter((item) => item.status === "in")
                .map((item) => (
                  <Card
                    key={item.id}
                    className="p-2 md:p-3 lg:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      {item.status === "in" ? (
                        <ArrowDownCircle className="lg:h-7 lg:w-7 h-5 w-5 stroke-[1.5] mr-2 text-green-500" />
                      ) : (
                        <ArrowUpCircle className="lg:h-7 lg:w-7 h-5 w-5 stroke-[1.5] mr-2 text-red-500" />
                      )}
                      <div>
                        <div className="font-semibold">{item.id}</div>
                        <div className="text-xs">{item.tanggal}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                      {formatRupiah(item.price)}
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
