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

  useEffect(() => {
    handleCurrentId(searchValue, filter);
    getReportList();
  }, [searchValue]);

  useEffect(() => {
    getReportList();
  }, [params.get("f")]);

  useEffect(() => {
    setIsMounted(true);
    getReportList();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col lg:flex-row max-w-7xl w-full mx-auto">
      <div className="w-full lg:1/2">
        <Card className="p-2 md:p-4 min-h-[200px] relative">
          {isGetList && (
            <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
              <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
            </div>
          )}
          <div className="flex justify-between w-full items-center mb-4 gap-3">
            <div className="w-full relative flex items-center">
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
            <Popover onOpenChange={setIsFilter} open={isFilter}>
              <PopoverTrigger asChild>
                <Button className="p-0 w-8 h-8 bg-transparent md:hidden hover:bg-transparent border border-black/80 text-black hover:border-black dark:border-white/50 dark:hover:border-white dark:text-white flex-none">
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
                          filter === "closed"
                            ? handleCurrentId("", "")
                            : handleCurrentId("", "closed");
                        }}
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 mr-2 opacity-0",
                            params.get("f") === "closed" && "opacity-100"
                          )}
                        />
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Closed
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setIsFilter(false);
                          filter === "open"
                            ? handleCurrentId("", "")
                            : handleCurrentId("", "open");
                        }}
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 mr-2 opacity-0",
                            params.get("f") === "open" && "opacity-100"
                          )}
                        />
                        <CircleDot className="w-4 h-4 mr-2" />
                        Open
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
                  "text-xs md:text-sm h-10 bg-transparent text-black border flex items-center border-green-300 hover:bg-transparent hover:border-green-400 hover:text-green-800 dark:text-white hover:dark:text-green-300",
                  filter === "closed" &&
                    "bg-green-300 hover:bg-green-400 hover:text-black dark:text-black dark:hover:text-black"
                )}
                onClick={() =>
                  filter === "closed"
                    ? handleCurrentId("", "")
                    : handleCurrentId("", "closed")
                }
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Closed
              </Button>
              <Button
                className={cn(
                  "text-xs md:text-sm h-10 bg-transparent text-black border border-yellow-300 hover:bg-transparent hover:border-yellow-400 hover:text-yellow-800 dark:text-white hover:dark:text-yellow-300",
                  filter === "open" &&
                    "bg-yellow-300 hover:bg-yellow-400 hover:text-black dark:text-black dark:hover:text-black"
                )}
                size={"sm"}
                onClick={() =>
                  filter === "open"
                    ? handleCurrentId("", "")
                    : handleCurrentId("", "open")
                }
              >
                <CircleDot className="w-4 h-4 mr-2" />
                Open
              </Button>
            </div>
          </div>
          <ul className="space-y-2 flex flex-col">
            {reportList?.map((item) => (
              <li className="capitalize" key={item.id}>
                <Link
                  href={`/admin/contacts/${item.id}`}
                  className="md:py-3 md:px-5 px-3 py-2 rounded-sm text-xs md:text-sm flex gap-1 justify-between md:items-center w-full text-start text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-700/70 dark:hover:bg-gray-700/70"
                >
                  <div className="w-full">
                    <div className="flex gap-2 items-start w-full">
                      <CircleDot className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="flex flex-col md:flex-row w-full gap-1 md:items-center capitalize">
                        <div className="flex-col w-full flex md:gap-1">
                          <p className="text-base md:text-lg font-medium w-full line-clamp-2 flex-1">
                            {item.title}
                          </p>
                          <p className="text-xs font-light w-full flex-wrap gap-1 flex dark:text-white/70 lowercase">
                            #33601
                            <p>dibuka</p>
                            {item.created_at &&
                              formatDistanceStrict(
                                item.created_at,
                                new Date(),
                                {
                                  addSuffix: true,
                                  locale: indonesia,
                                }
                              )}
                            <p>oleh</p>
                            {item.user.name}
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
