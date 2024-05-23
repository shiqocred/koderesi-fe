"use client";

import axios from "axios";
import qs from "query-string";
import Image from "next/image";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import {
  X,
  Send,
  Loader2,
  TextSelect,
  ChevronRight,
  ClipboardList,
  ListFilter,
  Check,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatTanggalWaktu } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface ContactProps {
  id: string;
  user_id: string;
  title: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone_number: string | null;
  };
}

export const ClientContact = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [current, setCurrent] = useState<ContactProps>();
  const [reportList, setReportList] = useState<ContactProps[]>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<boolean>(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const [filter, setFilter] = useState(params.get("f") ?? "");
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [isFilter, setIsFilter] = useState(false);

  const handleCurrentId = useCallback(
    (id: string, f: string, b: boolean) => {
      setFilter(f);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        currentId: id,
        f: f,
      };

      if (!id || id === "") {
        delete updateQuery.currentId;
      }
      if (!f || f === "" || (b && params?.get("f") === f)) {
        delete updateQuery.f;
        setFilter("");
      }

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

  const getReportList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/contact${
          filter !== "" ? "?f=" + filter : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReportList(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

  const handleUpdateStatus = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsStatus(true);
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/contact/update/${
          params.get("currentId") ?? ""
        }`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Status berhasil diubah");
      router.refresh();
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_DETAIL]:", error);
      toast.success("Status gagal diubah");
    } finally {
      setIsStatus(false);
    }
  };

  const getReportDetail = async (dataId: string) => {
    try {
      setIsUpdating(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/contact/show/${dataId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrent(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_TRANSACTION_DETAIL]:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getReportList();
  }, [params.get("f")]);
  useEffect(() => {
    if (isStatus) {
      setTimeout(() => {
        getReportList();
        getReportDetail(params.get("currentId") ?? "");
      }, 1000);
    }
  }, [isStatus]);

  useEffect(() => {
    if (params.get("currentId")) {
      getReportDetail(params.get("currentId") ?? "");
    } else {
      setCurrent(undefined);
    }
  }, [params.get("currentId")]);

  useEffect(() => {
    setIsMounted(true);
    getReportList();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row">
      <div className="w-full lg:1/2">
        <Card className="p-2 md:p-4 min-h-[200px] relative">
          {isGetList && (
            <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
              <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
            </div>
          )}
          <div className="flex justify-between w-full items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <div className="h-8 w-8 rounded-full border flex items-center justify-center mr-2 border-black dark:border-white flex-none">
                <ClipboardList className="w-4 h-4" />
              </div>
              Contact List
            </h2>
            <Popover onOpenChange={setIsFilter} open={isFilter}>
              <PopoverTrigger asChild>
                <Button className="p-0 w-8 h-8 bg-transparent md:hidden hover:bg-transparent border border-black/80 text-black hover:border-black dark:border-white/50 dark:hover:border-white dark:text-white">
                  <ListFilter className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[150px]" align="end">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() => {
                          setIsFilter(false);
                          handleCurrentId(current?.id ?? "", "replied", true);
                        }}
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 mr-2 opacity-0",
                            params.get("f") === "replied" && "opacity-100"
                          )}
                        />
                        Replied
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setIsFilter(false);
                          handleCurrentId(current?.id ?? "", "unreplied", true);
                        }}
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 mr-2 opacity-0",
                            params.get("f") === "unreplied" && "opacity-100"
                          )}
                        />
                        Unreplied
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="md:flex items-center gap-3 hidden">
              <Button
                size={"sm"}
                className={cn(
                  "text-xs md:text-sm h-8 md:h-9 bg-transparent text-black border border-green-300 hover:bg-transparent hover:border-green-400 hover:text-green-800 dark:text-white hover:dark:text-green-300",
                  filter === "replied" &&
                    "bg-green-300 hover:bg-green-400 hover:text-black dark:text-black dark:hover:text-black"
                )}
                onClick={() =>
                  handleCurrentId(current?.id ?? "", "replied", true)
                }
              >
                Replied
              </Button>
              <Button
                className={cn(
                  "text-xs md:text-sm h-8 md:h-9 bg-transparent text-black border border-yellow-300 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-800 dark:text-white hover:dark:text-yellow-300",
                  filter === "unreplied" &&
                    "bg-yellow-300 hover:bg-yellow-400 hover:text-black dark:text-black dark:hover:text-black"
                )}
                size={"sm"}
                onClick={() =>
                  handleCurrentId(current?.id ?? "", "unreplied", true)
                }
              >
                Unreplied
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "w-[70px] py-1 rounded-full bg-green-100 text-xs hidden justify-center mb-4",
              params.get("f") === "replied" && "flex"
            )}
          >
            <p>Replied</p>
          </div>
          <div
            className={cn(
              "w-[90px] py-1 rounded-full bg-yellow-100 text-xs justify-center mb-4 hidden",
              params.get("f") === "unreplied" && "flex"
            )}
          >
            <p>Unreplied</p>
          </div>
          <ul className="space-y-2 flex flex-col">
            {reportList?.map((item) => (
              <li className="capitalize" key={item.id}>
                <Button
                  className={cn(
                    "md:py-2 md:px-5 px-2 py-1.5 h-14 md:h-20 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white",
                    current?.id === item.id
                      ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/70 dark:border dark:border-gray-700/40 dark:hover:bg-gray-700/40"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                  )}
                  onClick={() =>
                    current?.id !== item.id &&
                    handleCurrentId(item.id, filter, false)
                  }
                >
                  <div className="w-full">
                    <div className="flex gap-2 items-center w-full">
                      <span className="relative flex h-3 w-3 mx-2 md:hidden">
                        <span
                          className={cn(
                            "animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75",
                            item.status === "replied"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          )}
                        ></span>
                        <span
                          className={cn(
                            "relative inline-flex rounded-full h-3 w-3 bg-yellow-400",
                            item.status === "replied"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          )}
                        ></span>
                      </span>
                      <div className="flex flex-col md:flex-row w-full md:gap-1 md:items-center  capitalize">
                        <div className="flex-col w-full flex md:gap-1">
                          <p className="text-base md:text-lg font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                            {item.title}
                          </p>
                          <p className="text-xs font-light w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1 gap-2 flex dark:text-white/70">
                            {item.user.name}
                            <p>|</p>
                            {formatTanggalWaktu(item.created_at)}
                          </p>
                        </div>
                        <div>
                          <div
                            className={cn(
                              "w-[70px] xl:w-[100px] hidden md:block flex-none text-center text-xs lg:text-sm rounded md:py-1 items-center text-black",
                              item.status === "replied" && "bg-green-400",
                              item.status === "unreplied" && "bg-yellow-300"
                            )}
                          >
                            {item.status}
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
                        current?.id === item.id &&
                          handleCurrentId("", filter, false);
                      }}
                    >
                      {current?.id === item.id ? (
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
        </Card>
      </div>
      <div className="w-full">
        <div className="w-full relative">
          {isUpdating && (
            <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
              <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
            </div>
          )}
          {current ? (
            <Card className="p-2 md:p-4 gap-4 flex flex-col">
              <Card className="relative md:py-2 md:px-3 px-2 py-1.5 rounded-sm text-sm flex bg-gray-200 dark:border dark:border-gray-700/70 justify-between items-center capitalize">
                <div className="flex gap-x-4 items-center w-full">
                  <div className="w-10 h-10 overflow-hidden rounded relative flex-none">
                    <Image
                      alt=""
                      src={"/avatar.webp"}
                      fill
                      className="pointer-events-none"
                    />
                  </div>
                  <div className="flex justify-between w-full gap-1 items-center h-full">
                    <div className="flex-col w-full flex md:gap-1">
                      <p className="text-base md:text-lg font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                        {current?.title}
                      </p>
                      <p className="text-xs font-light w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1 gap-2 flex dark:text-white/70">
                        {current?.user.name}
                        <p>|</p>
                        {formatTanggalWaktu(
                          current?.created_at ?? new Date().toString()
                        )}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "h-[52px] rounded-r absolute right-0 w-2 md:hidden",
                        current?.status === "replied"
                          ? "bg-green-400"
                          : "bg-yellow-300"
                      )}
                    />
                    <div>
                      <div
                        className={cn(
                          "w-[70px] xl:w-[100px] hidden md:block flex-none text-center text-xs lg:text-sm rounded py-1 items-center text-black",
                          current?.status === "replied" && "bg-green-400",
                          current?.status === "unreplied" && "bg-yellow-300"
                        )}
                      >
                        {current?.status}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-xs md:text-sm">Judul</Label>
                <Input
                  value={current?.title}
                  disabled
                  className="disabled:opacity-100 disabled:cursor-default focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-xs md:text-sm">Pesan</Label>
                <Textarea
                  value={current?.message}
                  disabled
                  className="disabled:opacity-100 disabled:cursor-default focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
                />
              </div>
              <Button
                className="bg-green-400 hover:bg-green-300 text-black"
                onClick={handleUpdateStatus}
                disabled={isStatus}
              >
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
    </div>
  );
};
