"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Send,
  TextSelect,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface ContactProps {
  id: number;
  nama: string;
  status: string;
  title: string;
  message: string;
}

const mapContact: ContactProps[] = [
  {
    id: 58203384201,
    nama: "Amie Bechtelar",
    status: "unreplied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
  {
    id: 58203384202,
    nama: "Maximillia Breitenberg",
    status: "replied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
  {
    id: 58203384203,
    nama: "Chasity Hoeger",
    status: "replied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
  {
    id: 58203384204,
    nama: "Ara Breitenberg",
    status: "replied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
  {
    id: 58203384205,
    nama: "Corrine Stark",
    status: "replied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
  {
    id: 58203384206,
    nama: "Johnpaul Waelchi",
    status: "replied",
    title: "Kesalahan Nomor Resi",
    message: "Kesalahan Nomor Resi",
  },
];

export const ClientContact = () => {
  const [current, setCurrent] = useState<ContactProps>({
    id: 0,
    nama: "",
    status: "",
    title: "",
    message: "",
  });
  const [pageW1, setPageW1] = useState<number>(0);
  const [pageW2, setPageW2] = useState<number>(3);
  const [isMounted, setIsMounted] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

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
    const lastPage = mapContact.length;
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
          url: "/admin/contacts",
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
      const currentUser = mapContact.find(
        (item) => item.id === parseFloat(params.get("currentId") ?? "0")
      );
      setCurrent({
        id: currentUser?.id ?? 0,
        nama: currentUser?.nama ?? "",
        status: currentUser?.status ?? "",
        title: currentUser?.title ?? "",
        message: currentUser?.message ?? "",
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
      <div className="w-full lg:1/2">
        <Card className="p-2 md:p-4">
          <div className="w-full relative flex items-center mb-4">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search user name..."
            />
          </div>
          <ul className="space-y-2 flex flex-col">
            {mapContact.slice(pageW1, pageW2).map((item) => (
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
                        <div
                          className={cn(
                            "w-[70px] xl:w-[100px] flex-none text-center text-xs lg:text-sm rounded md:py-1 items-center text-black",
                            item.status === "replied" && "bg-green-400",
                            item.status === "unreplied" && "bg-yellow-300"
                          )}
                        >
                          {item.status}
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
              disabled={pageW2 === mapContact.length}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
      <div className="w-full lg:1/2 ">
        {current.id !== 0 ? (
          <Card className="p-2 md:p-4 gap-4 flex flex-col">
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
                    <div
                      className={cn(
                        "w-[70px] xl:w-[100px] flex-none text-center text-xs lg:text-sm rounded py-1 items-center text-black",
                        current.status === "replied" && "bg-green-400",
                        current.status === "unreplied" && "bg-yellow-300"
                      )}
                    >
                      {current.status}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex w-full flex-col gap-1">
              <Label className="text-xs md:text-sm">Judul</Label>
              <Input
                value={current.title}
                disabled
                className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label className="text-xs md:text-sm">Pesan</Label>
              <Textarea
                value={current.message}
                disabled
                className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
              />
            </div>
            <Button className="bg-green-400 hover:bg-green-300 text-black">
              <Send className="w-4 h-4 mr-2" />
              Update status
            </Button>
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
