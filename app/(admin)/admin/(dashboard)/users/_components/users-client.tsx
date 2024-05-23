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
import { cn, formatTanggalWaktu } from "@/lib/utils";
import axios from "axios";
import {
  Check,
  ChevronDown,
  Edit,
  Eye,
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
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
    (q: string, f: string) => {
      // setFilter(f);
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
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/users",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const getUserList = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/superadmin/pengguna",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserList(res.data.data.data);
    } catch (error) {
      console.log("[ERROR_GET_NEWUSER_DASHBOARD]:", error);
    }
  };

  useEffect(() => {
    handleCurrentId(debounceValue, sort);
  }, [debounceValue, sort]);

  useEffect(() => {
    if (cookies.get("new") === "added") {
      getUserList();
      cookies.remove("new");
    }
  }, [cookies.get("new")]);

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
            placeholder="Search user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-4 w-full md:w-auto">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full md:w-48 capitalize justify-between bg-transparent border-green-200 border dark:border-green-200/40 hover:border-green-400 dark:hover:border-green-400 hover:bg-transparent"
              >
                {sort ? `Menurut ${sort}` : "Urutkan"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        sort === "nama" ? setSort("") : setSort("nama");
                        setOpen(!open);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          sort === "nama" && "opacity-100"
                        )}
                      />
                      Filter by name
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        sort === "tanggal" ? setSort("") : setSort("tanggal");
                        setOpen(!open);
                      }}
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          sort === "tanggal" && "opacity-100"
                        )}
                      />
                      Filter by tanggal
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
      <Card className="p-2 md:p-4 bg-transparent border">
        <div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 lg:flex justify-center items-center h-14 rounded-sm px-5 hidden">
            <p className="text-base font-semibold w-full">Pengguna</p>
            <p className="text-base font-semibold w-[200px] flex-none text-center">
              WhatsApp
            </p>
            <p className="text-base font-semibold w-[150px] text-center flex-none">
              Tanggal
            </p>
            <p className="text-base font-semibold w-[100px] flex-none" />
          </div>
          <ul className="lg:pt-4 gap-4 flex flex-col">
            {userList.map((item) => (
              <li className="capitalize" key={item.id}>
                <Card className="lg:py-3 lg:px-5 md:py-2 p-2 rounded-md md:rounded-sm text-sm flex bg-gray-100 dark:bg-gray-700/40 flex-col md:flex-row md:items-center">
                  <div className="w-full">
                    <div className="flex gap-2 md:gap-4 items-center flex-row">
                      <div className="w-10 aspect-square md:w-12 md:h-12 overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col w-full overflow-hidden text-ellipsis xl:flex-row xl:items-center">
                        <p className="text-base font-semibold xl:w-[250px]">
                          {item.name}
                        </p>
                        <p className="md:text-sm font-light lowercase text-ellipsis overflow-hidden w-full xl:w-auto text-xs">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start lg:items-center pt-2 md:pt-0 mt-2 md:mt-0 md:ml-2 lg:ml-0 w-full md:w-[300px] lg:w-auto gap-2 border-t border-gray-400 dark:border-gray-600 md:border-none">
                    <div className="flex justify-between w-full flex-col lg:flex-row lg:items-center gap-1 pl-2 border-l-2 border-gray-700 dark:border-gray-500 md:border-none">
                      <div className="w-auto lg:w-[200px] flex-none lg:text-center text-xs">
                        {item.phone_number ? (
                          item.phone_number
                        ) : (
                          <p className="italic text-xs text-gray-700 px-2 bg-gray-200 dark:bg-gray-700/80 dark:text-white rounded py-0.5">
                            WhatsApp not yet
                          </p>
                        )}
                      </div>
                      <div className="w-auto lg:w-[150px] flex-none lg:text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {item.created_at && formatTanggalWaktu(item.created_at)}
                      </div>
                    </div>
                    <div className="w-auto lg:w-[100px] flex-none flex justify-center ">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="p-0 h-8 w-8 lg:w-10 lg:h-10 border-gray-400 dark:border-gray-600 border"
                            variant={"ghost"}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[150px]" align="end">
                          <Command>
                            <CommandGroup>
                              <CommandList>
                                <CommandItem
                                  onSelect={() => onOpen("edit-user", item.id)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </CommandItem>
                              </CommandList>
                              <CommandList>
                                <CommandItem
                                  className="text-red-400 aria-selected:text-red-500"
                                  onSelect={() =>
                                    onOpen("delete-user", item.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus
                                </CommandItem>
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Card>
  );
};
