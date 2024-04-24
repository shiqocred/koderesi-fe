"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ChartCredit } from "./chart-credits";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  PlusCircle,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRupiah, mapNewestTransaction } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";

const mapUsers = [
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
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col xl:flex-row">
      <div className="w-full xl:w-2/5">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          <div className="w-full bg-gray-300 lg:flex justify-center items-center py-2 rounded-sm px-5 hidden">
            <p className="text-sm font-semibold w-full">Pengguna</p>
            <p className="text-sm font-semibold w-[100px] flex-none text-center">
              Kredit
            </p>
            <p className="text-sm font-semibold w-[150px] flex-none text-center">
              Nominal
            </p>
            <p className="text-sm font-semibold w-[50px] flex-none" />
          </div>
          <ul className="lg:pt-2 space-y-2 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Card className="md:py-2 md:px-3 px-2 py-1.5 rounded-sm text-sm flex bg-gray-100 dark:border dark:border-gray-800 justify-between items-center">
                  <div className="w-full">
                    <div className="flex gap-2 items-center w-full">
                      <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col lg:flex-row w-full gap-1">
                        <p className="text-sm font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.nama}
                        </p>
                        <div className="flex gap-4 items-center">
                          <div className="w-[70px] md:w-[100px] flex-none lg:text-center text-xs lg:text-sm">
                            {item.kredit} Kredit
                          </div>
                          <div className="lg:w-[150px] flex-none text-center text-xs lg:text-sm">
                            {formatRupiah(item.cash)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[50px] flex-none flex justify-center">
                    <Button
                      size={"icon"}
                      className=" hover:bg-gray-200 h-6 w-6"
                      variant={"ghost"}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="h-full w-full xl:w-3/5">
        <Card className="flex flex-col p-2 md:p-4 gap-4 h-full w-full">
          <Card className="md:py-2 md:px-3 px-2 py-1.5 rounded-sm text-sm flex bg-gray-200 dark:border dark:border-gray-800 justify-between items-center">
            <div className="w-full">
              <div className="flex gap-x-4 items-center">
                <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                  <Image alt="" src={"/avatar.webp"} fill />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm md:text-base font-semibold">
                    {mapUsers[0].nama}
                  </p>
                  <div className="md:w-[150px] flex-none md:text-center md:text-sm text-xs">
                    {mapUsers[0].kredit} Kredit
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50px] flex-none flex justify-center">
              <Button
                size={"icon"}
                className=" hover:bg-yellow-300 bg-yellow-400 text-black"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          <Button
            className="bg-green-400 hover:bg-green-300 text-black"
            onClick={() => onOpen("add-transaction")}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Transaksi
          </Button>
          <div className="h-full border rounded-md p-0 md:p-4">
            <div className="flex md:justify-between md:items-center px-4 pt-4 gap-2 md:gap-0 md:px-5 mb-4 flex-col md:flex-row items-start">
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
          <div className="h-full border rounded-md p-2 md:p-4 space-y-2">
            <Card className="h-12 px-5 rounded-sm flex bg-gray-200 dark:bg-gray-700/70 justify-center font-semibold capitalize items-center">
              Transaksi - {month[mth].label}
            </Card>
            {mapNewestTransaction
              .filter((item) => item.status === "in")
              .map((item) => (
                <Card
                  key={item.id}
                  className="p-2 md:p-4 capitalize rounded-sm bg-gray-100 dark:bg-gray-700/40 text-xs md:text-sm flex justify-between items-center"
                >
                  <div className="flex items-center">
                    {item.status === "in" ? (
                      <ArrowDownCircle className="md:h-7 md:w-7 h-5 w-5 stroke-[1.5] mr-2 text-green-500" />
                    ) : (
                      <ArrowUpCircle className="md:h-7 md:w-7 h-5 w-5 stroke-[1.5] mr-2 text-red-500" />
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
      </div>
    </div>
  );
};
