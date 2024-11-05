"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useModal } from "@/hooks/use-modal";
import { baseUrl, cn, formatTanggalWaktu } from "@/lib/utils";
import axios from "axios";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DatabaseBackupIcon,
  Edit,
  Eye,
  Filter,
  ListFilter,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { useDebounce } from "@/hooks/use-debounce";
import UserCard from "./user-card";

export interface UserListProps {
  created_at: string;
  email: string;
  email_verified_at: boolean | null;
  id: string;
  key: string;
  name: string;
  phone_number: string | null;
  profile: null;
  role: string;
  total_tokens: number;
  updated_at: string;
}

export const UsersClient = () => {
  const { onOpen } = useModal();
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState(params.get("s") ?? "date");
  const [filter, setFilter] = useState(params.get("f") ?? "");
  const debounceValue = useDebounce(search);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [page, setPage] = useState({
    current: parseFloat(params.get("q") ?? "1") ?? 1,
    last: 1,
    prev: 1,
    next: 1,
    total: 1,
  });

  const [userList, setUserList] = useState<UserListProps[]>([
    {
      created_at: "",
      email: "",
      email_verified_at: null,
      id: "",
      key: "",
      name: "",
      phone_number: null,
      profile: null,
      role: "",
      total_tokens: 0,
      updated_at: "",
    },
  ]);

  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const handleCurrentId = useCallback(
    (q: string, s: string, f: string, page: number) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        q: q,
        s: s,
        f: f,
        page: page,
      };

      if (!q || q === "") {
        delete updateQuery.q;
      }
      if (!s || s === "") {
        delete updateQuery.s;
      }
      if (!f || f === "") {
        delete updateQuery.f;
      }
      if (!page || page === 0) {
        delete updateQuery.page;
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/users",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url, { scroll: false });
    },
    [params, router]
  );

  const getUserList = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/superadmin/pengguna${
          debounceValue !== ""
            ? search !== ""
              ? "?q=" + debounceValue
                ? search
                : ""
              : ""
            : ""
        }${
          sort !== ""
            ? debounceValue === "" || search === ""
              ? "?filter=" + sort
              : "&filter=" + sort
            : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setUserList(data.data);
      setPage({
        current: data.current_page,
        last: data.last_page,
        prev: data.links[0].active && data.links[0].label,
        next:
          data.links[data.data.length - 1].active &&
          data.links[data.data.length - 1].label,
        total: data.total,
      });
    } catch (error) {
      console.log("[ERROR_GET_NEWUSER_DASHBOARD]:", error);
    }
  };

  useEffect(() => {
    handleCurrentId(debounceValue, sort, filter, page.current);
  }, [debounceValue, sort]);

  useEffect(() => {
    if (cookies.get("new")) {
      getUserList();
      cookies.remove("new");
    }
  }, [cookies.get("new")]);

  useEffect(() => {
    getUserList();
  }, [params.get("q"), params.get("f")]);

  useEffect(() => {
    setIsMounted(true);
    getUserList();
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <Card className="flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div className="flex gap-2 md:gap-4 w-full flex-col md:flex-row">
        <div className="w-full relative flex items-center">
          <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
          <Input
            className="pl-10 flex-1 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
            placeholder="Pencarian username atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-4 w-full md:w-auto">
          <Popover open={openFilter} onOpenChange={setOpenFilter}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="capitalize justify-between bg-transparent border-green-200 border dark:border-green-200/40 hover:border-green-400 dark:hover:border-green-400 hover:bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setFilter("");
                        setOpenFilter(!openFilter);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          filter === "" && "opacity-100"
                        )}
                      />
                      Default
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setFilter("affiliate");
                        setOpenFilter(!openFilter);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          filter === "affiliate" && "opacity-100"
                        )}
                      />
                      Affiliate
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="capitalize justify-between bg-transparent border-green-200 border dark:border-green-200/40 hover:border-green-400 dark:hover:border-green-400 hover:bg-transparent"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Urutkan
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSort("name");
                        setOpen(!open);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          sort === "name" && "opacity-100"
                        )}
                      />
                      Menurut nama
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setSort("date");
                        setOpen(!open);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          sort === "date" && "opacity-100"
                        )}
                      />
                      Menurut tanggal
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            className="bg-green-400 text-black hover:bg-green-300 p-0 w-10 lg:px-4 lg:w-auto flex-none"
            onClick={() => onOpen("add-user")}
          >
            <UserPlus className="w-4 h-4 lg:mr-2" />
            <p className="hidden lg:block">Tambah Pengguna</p>
          </Button>
        </div>
      </div>
      {userList.length ? (
        <Card className="p-2 md:p-4 bg-transparent border">
          <ul className="lg:pt-4 gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userList.map((item) => (
              <UserCard {...item} key={item.id} />
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="border border-green-200 dark:border-green-200/40 flex flex-col gap-2 text-gray-500 dark:text-gray-700 justify-center min-h-[200px] items-center text-lg lg:text-xl font-bold">
          <DatabaseBackupIcon className="lg:w-14 lg:h-14 h-10 w-10" />
          No Data Found.
        </Card>
      )}
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-5 items-center">
          <p className="text-sm">Total User: {page.total}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-sm">
            Page {page.current} of {page.last}
          </p>
          <div className="flex items-center gap-2">
            <Button
              className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
              onClick={() =>
                handleCurrentId(debounceValue, sort, filter, page.prev)
              }
              disabled={page.prev === page.current}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
              onClick={() =>
                handleCurrentId(debounceValue, sort, filter, page.next)
              }
              disabled={page.next === page.current}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
