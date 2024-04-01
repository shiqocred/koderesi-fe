"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ChartCredit } from "./chart-credits";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mapUsers = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    kredit: 1659,
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    kredit: 1829,
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    kredit: 2418,
  },
  {
    id: 58203384204,
    nama: "Ara Breitenberg",
    kredit: 913,
  },
  {
    id: 58203384205,
    nama: "Corrine Stark",
    kredit: 2089,
  },
  {
    id: 58203384206,
    nama: "Johnpaul Waelchi",
    kredit: 984,
  },
];

export const CreditsClient = () => {
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
    <div className="p-4 flex h-full gap-6">
      <div className=" w-2/5">
        <Card className="p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          <div className="w-full bg-gray-300 flex justify-center items-center py-2 rounded-sm px-5">
            <p className="text-sm font-semibold w-full">Pengguna</p>
            <p className="text-sm font-semibold w-[150px] flex-none text-center">
              Kredit
            </p>
            <p className="text-sm font-semibold w-[50px] flex-none" />
          </div>
          <ul className="pt-2 space-y-2 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Card className="py-2 px-5 rounded-sm text-sm flex bg-gray-100 justify-between items-center">
                  <div className="w-full">
                    <div className="flex gap-x-2 items-center">
                      <div className="w-8 h-8 overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">{item.nama}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[150px] flex-none text-center text-sm">
                    {item.kredit}
                  </div>
                  <div className="w-[50px] flex-none flex justify-center">
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
      <div className="h-full w-3/5">
        <Card className="flex flex-col p-4 gap-4 h-full w-full">
          <Card className="py-2 px-5 rounded-sm text-sm flex bg-gray-200 justify-between items-center">
            <div className="w-full">
              <div className="flex gap-x-4 items-center">
                <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                  <Image alt="" src={"/avatar.webp"} fill />
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-semibold">{mapUsers[0].nama}</p>
                </div>
              </div>
            </div>
            <div className="w-[150px] flex-none text-center">
              {mapUsers[0].kredit} Kredit
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
          <div className="h-full border rounded-md p-4">
            <div className="flex justify-between items-center px-5 mb-4">
              <CardTitle>Kredit Flow</CardTitle>
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
            <div className="h-[350px]">
              <ChartCredit month={month[mth].value} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
