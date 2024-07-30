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
  Search,
  CheckCircle2,
  CircleDot,
  XCircle,
  CircleFadingPlus,
  CircleSlash,
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
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";
import { formatDistance, formatDistanceStrict, parse } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactProps {
  id: string;
  ticket: string;
  user_id: string;
  title: string;
  desc: string;
  name: string;
  email: string;
  status: string;
  type: null;
  created_at: string;
  updated_at: string;
}

export const ClientContact = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [reportList, setReportList] = useState<ContactProps[]>();
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const [filter, setFilter] = useState(params.get("f") ?? "");
  const [dataSearch, setDataSearch] = useState("");
  const searchValue = useDebounce(dataSearch);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [isFilter, setIsFilter] = useState(false);

  const handleCurrentId = useCallback(
    (q: string, f: string) => {
      setFilter(f);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        q: q,
        f: f,
      };

      if (!q || q === "") {
        delete updateQuery.q;
      }
      if (!f || f === "") {
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

  const getContactList = async () => {
    try {
      setIsGetList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/support${
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

  useEffect(() => {
    handleCurrentId(searchValue, filter);
    getContactList();
  }, [searchValue]);

  useEffect(() => {
    getContactList();
  }, [params.get("f")]);

  useEffect(() => {
    setIsMounted(true);
    getContactList();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row max-w-7xl w-full mx-auto">
      <div className="w-full lg:1/2">
        <Card className="p-2 md:p-4">
          <div className="flex w-full md:items-center mb-4 gap-3 lg:flex-row flex-col-reverse">
            <div className="w-full relative flex items-center lg:max-w-2xl">
              <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
              {dataSearch && (
                <Button
                  className="p-0 h-6 w-6 peer absolute right-3 text-gray-500"
                  variant={"ghost"}
                  onClick={() => setDataSearch("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Input
                value={dataSearch}
                onChange={(e) => setDataSearch(e.target.value)}
                className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                placeholder="Pencarian menurut judul, tiket dan pengguna..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Popover open={isFilter} onOpenChange={setIsFilter}>
                <PopoverTrigger asChild>
                  <Button className="border-green-400/80 dark:border-green-400/70 border text-black dark:text-white bg-transparent border-dashed hover:bg-transparent hover:dark:bg-transparent flex px-3 hover:border-green-400 dark:hover:border-green-400">
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Status
                    {filter && (
                      <Separator
                        orientation="vertical"
                        className="mx-2 bg-gray-500 dark:bg-gray-300 w-[1.5px]"
                      />
                    )}
                    {filter && (
                      <Badge
                        className={cn(
                          "rounded w-16 px-0 justify-center text-black font-normal capitalize",
                          filter === "closed"
                            ? "bg-yellow-400 hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:bg-yellow-500"
                            : "bg-green-400 hover:bg-green-400 dark:hover:bg-green-400 dark:bg-green-400"
                        )}
                      >
                        {filter === "closed" ? "Closed" : "Open"}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-52" align="start">
                  <Command>
                    <CommandGroup>
                      <CommandList>
                        <CommandItem
                          onSelect={() => {
                            handleCurrentId(dataSearch, "opened");
                            setIsFilter(false);
                          }}
                        >
                          <Checkbox
                            className="w-4 h-4 mr-2"
                            checked={filter === "opened"}
                            onCheckedChange={() => {
                              handleCurrentId(dataSearch, "opened");
                              setIsFilter(false);
                            }}
                          />
                          <CircleDot className="w-4 h-4 mr-2" />
                          Open
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            handleCurrentId(dataSearch, "closed");
                            setIsFilter(false);
                          }}
                        >
                          <Checkbox
                            className="w-4 h-4 mr-2"
                            checked={filter === "closed"}
                            onCheckedChange={() => {
                              handleCurrentId(dataSearch, "closed");
                              setIsFilter(false);
                            }}
                          />
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Closed
                        </CommandItem>
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {filter && (
                <Button
                  variant={"ghost"}
                  className="flex px-3"
                  onClick={() => {
                    handleCurrentId(dataSearch, "");
                  }}
                >
                  Reset
                  <XCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
          <ul className="space-y-2 flex flex-col relative w-full min-h-[160px]">
            {isGetList && (
              <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
              </div>
            )}
            {reportList?.map((item) => (
              <li className="capitalize" key={item.id}>
                <Link
                  href={`/admin/contacts/${item.ticket}`}
                  className="md:py-3 md:px-5 px-3 py-2 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                >
                  <div className="w-full">
                    <div className="flex gap-2 items-start w-full">
                      {item.status === "opened" ? (
                        <CircleDot className="w-5 h-6 md:h-7 text-green-500" />
                      ) : null}
                      {item.status === "closeWithoutPlan" ? (
                        <CircleSlash className="w-5 h-6 md:h-7 text-gray-400" />
                      ) : null}
                      {item.status === "closeWithPlan" ? (
                        <CheckCircle2 className="w-5 h-6 md:h-7 text-indigo-500" />
                      ) : null}
                      <div className="flex flex-col md:flex-row w-full gap-1 md:items-center capitalize">
                        <div className="flex-col w-full flex md:gap-1">
                          <p className="text-base md:text-lg font-medium w-full line-clamp-2 flex-1">
                            {item.title}
                          </p>
                          <p className="text-xs font-light w-full flex-wrap gap-1 flex dark:text-white/70 uppercase">
                            #{item.ticket}
                            <p className="lowercase">dibuka</p>
                            <p className="lowercase">
                              {item.created_at &&
                                formatDistanceStrict(
                                  item.created_at,
                                  new Date(),
                                  {
                                    addSuffix: true,
                                    locale: indonesia,
                                  }
                                )}
                            </p>
                            <p className="lowercase">oleh</p>
                            <p className="capitalize">{item.name}</p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
