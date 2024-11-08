"use client";

import axios from "axios";
import qs from "query-string";
import { useCookies } from "next-client-cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  X,
  Loader2,
  Search,
  CheckCircle2,
  CircleDot,
  CircleFadingPlus,
  XCircle,
  CircleSlash,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { baseUrl, cn } from "@/lib/utils";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface SupportListProps {
  id: string;
  ticket_code: string;
  title: string;
  description: string;
  status: string;
}

export const ClientContact = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const [filter, setFilter] = useState(params.get("f") ?? "");
  const [dataSearch, setDataSearch] = useState("");
  const searchValue = useDebounce(dataSearch);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [isFilter, setIsFilter] = useState(false);
  const [data, setData] = useState<SupportListProps[] | undefined>(undefined);

  const handleGetTickets = async () => {
    setIsGetList(true);
    try {
      const res = await axios.get(
        `${baseUrl}/superadmin/support${
          filter && searchValue ? "?f=" + filter + "&q=" + searchValue : ""
        }${filter && !searchValue ? "?f=" + filter : ""}${
          !filter && searchValue ? "?q=" + searchValue : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_TICKET_LIST]:", error);
    } finally {
      setIsGetList(false);
    }
  };

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

  useEffect(() => {
    handleCurrentId(searchValue, filter);
    handleGetTickets();
  }, [searchValue, filter]);

  useEffect(() => {
    handleGetTickets();
  }, [searchValue, filter]);

  useEffect(() => {
    handleGetTickets();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row max-w-7xl w-full mx-auto">
      <div className="w-full lg:1/2">
        <Card className="p-2 md:p-4 min-h-[200px]">
          <div className="flex justify-between w-full items-center mb-4 gap-3 lg:flex-row flex-col-reverse">
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
            <div className="flex items-center  justify-between gap-3 w-full">
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
                            filter === "close" &&
                              "bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500 dark:bg-gray-500",
                            filter === "open" &&
                              "bg-green-400 hover:bg-green-400 dark:hover:bg-green-400 dark:bg-green-400",
                            filter === "solve" &&
                              "bg-indigo-400 hover:bg-indigo-400 dark:hover:bg-indigo-400 dark:bg-indigo-400"
                          )}
                        >
                          {filter === "close" && "Close"}
                          {filter === "open" && "Open"}
                          {filter === "solve" && "Solve"}
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
                              handleCurrentId(dataSearch, "open");
                              setIsFilter(false);
                            }}
                          >
                            <Checkbox
                              className="w-4 h-4 mr-2"
                              checked={filter === "open"}
                              onCheckedChange={() => {
                                handleCurrentId(dataSearch, "open");
                                setIsFilter(false);
                              }}
                            />
                            <CircleDot className="w-4 h-4 mr-2 text-green-500" />
                            Open
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              handleCurrentId(dataSearch, "solve");
                              setIsFilter(false);
                            }}
                          >
                            <Checkbox
                              className="w-4 h-4 mr-2"
                              checked={filter === "solve"}
                              onCheckedChange={() => {
                                handleCurrentId(dataSearch, "solve");
                                setIsFilter(false);
                              }}
                            />
                            <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" />
                            Solve
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              handleCurrentId(dataSearch, "close");
                              setIsFilter(false);
                            }}
                          >
                            <Checkbox
                              className="w-4 h-4 mr-2"
                              checked={filter === "close"}
                              onCheckedChange={() => {
                                handleCurrentId(dataSearch, "close");
                                setIsFilter(false);
                              }}
                            />
                            <CircleSlash className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-300" />
                            Close
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
          </div>
          <ul className="space-y-2 flex flex-col relative w-full h-full">
            {isGetList && (
              <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
              </div>
            )}
            {data && data.length > 0 ? (
              data?.map((item) => (
                <li key={item.id} className="capitalize">
                  <Link
                    href={`/admin/contacts/${item.ticket_code}`}
                    className="md:py-3 md:px-5 px-3 py-2 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                  >
                    <div className="w-full">
                      <div className="flex gap-2 items-start w-full">
                        {item.status === "open" && (
                          <CircleDot className="w-5 h-5 text-green-500 mt-0.5" />
                        )}
                        {item.status === "close" && (
                          <CircleSlash className="w-5 h-5 mt-0.5 text-gray-400 dark:text-gray-300" />
                        )}
                        {item.status === "solve" && (
                          <CheckCircle2 className="w-5 h-5 mt-0.5 text-indigo-500" />
                        )}
                        <div className="flex flex-col md:flex-row w-full gap-1 md:items-center capitalize">
                          <div className="flex-col w-full flex md:gap-1">
                            <p className="text-base md:text-lg font-medium w-full line-clamp-2 flex-1">
                              {item.title}
                            </p>
                            <p className="text-xs font-light w-full flex-wrap gap-1 flex dark:text-white/70 lowercase">
                              <span className="uppercase">
                                #{item.ticket_code}
                              </span>
                              <p>dibuka</p>
                              <p>3 hari yang lalu</p>
                              <p>oleh</p>
                              <p>Ali</p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="md:py-6 md:px-5 px-3 py-4 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-center text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70">
                Data Not Found
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};
