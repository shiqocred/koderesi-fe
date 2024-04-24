"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ChartCredit } from "./chart-credits";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Save, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface UsersProps {
  id: number;
  nama: string;
  kredit: number;
}

const mapUsers: UsersProps[] = [
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
  const [current, setCurrent] = useState<UsersProps>({
    id: 0,
    nama: "",
    kredit: 0,
  });
  const [currentId, setCurrentId] = useState<number>(0);
  const [editedKredit, setEditedKredit] = useState<boolean>(false);
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
      setCurrentId(id);
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
          url: "/admin/credits",
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
    <div className="flex h-full gap-2 md:gap-6 flex-col xl:flex-row">
      <div className="w-full xl:w-2/5">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          <div className="w-full bg-gray-300 justify-center items-center py-2 rounded-sm px-5 hidden md:flex">
            <p className="text-sm font-semibold w-full">Pengguna</p>
            <p className="text-sm font-semibold w-[150px] flex-none text-center hidden lg:block">
              Kredit
            </p>
            <p className="text-sm font-semibold w-[50px] flex-none hidden lg:block" />
          </div>
          <ul className="md:pt-2 space-y-2 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Button
                  className={cn(
                    "md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex  gap-1 justify-between items-center w-full text-black",
                    current.id === item.id
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  )}
                  onClick={() => handleCurrentId(item.id)}
                >
                  <div className="w-full">
                    <div className="flex gap-x-2 items-center">
                      <div className="w-8 h-8 overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col">
                        <p>{item.nama}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[80px] lg:w-auto justify-between items-center">
                    <div className="w-auto lg:w-[150px] flex-none text-center">
                      {item.kredit}
                    </div>
                    <div className="w-auto lg:w-[50px] flex-none flex justify-center">
                      <Button
                        size={"icon"}
                        className=" hover:bg-gray-200 h-6 w-6"
                        variant={"ghost"}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="h-full w-full xl:w-3/5">
        {current.id !== 0 ? (
          <Card className="flex flex-col p-2 md:p-4 gap-4 h-full w-full">
            <Card className="md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-xs md:text-sm flex bg-gray-200 justify-between items-center w-full">
              <div className="w-full">
                <div className="flex gap-x-4 items-center">
                  <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                    <Image alt="" src={"/avatar.webp"} fill />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center w-full md:gap-6 pr-4">
                    <p className="text-sm md:text-base font-semibold flex-none">
                      {current.nama}
                    </p>
                    {!editedKredit ? (
                      <div className="w-auto md:w-[150px] flex-none ">
                        {current.kredit} Kredit
                      </div>
                    ) : (
                      <Input
                        type="number"
                        className="h-9 px-2"
                        value={current.kredit}
                        onChange={(e) =>
                          setCurrent((prev) => ({
                            ...prev,
                            kredit: parseFloat(e.target.value),
                          }))
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[50px] flex-none flex justify-center">
                <Button
                  size={"icon"}
                  className={cn(
                    "text-black",
                    !editedKredit
                      ? "hover:bg-yellow-300 bg-yellow-400"
                      : "hover:bg-green-300 bg-green-400"
                  )}
                  onClick={() => setEditedKredit(!editedKredit)}
                >
                  {!editedKredit ? (
                    <Edit className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>
            <div className="h-full border rounded-md">
              <div className="flex md:justify-between md:items-center px-4 pt-4 gap-2 md:gap-0 md:px-5 mb-4 flex-col md:flex-row items-start">
                <CardTitle>Kredit Flow</CardTitle>
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
          </Card>
        ) : (
          <Card className="md:py-2 md:px-5 px-2 py-1.5 rounded-sm text-sm flex bg-gray-200 justify-between items-center w-full">
            No data viewed
          </Card>
        )}
      </div>
    </div>
  );
};
