"use client";

import { mapCourier } from "@/components/modals/add-resi-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "axios";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface CourierProps {
  courier_code: string;
  courier_name: string;
}
interface MetaDataProps {
  current_page: number;
  last_page: number;
}

interface InputProps {
  resi: string;
  courier: string;
}

export const CheckResiClient = () => {
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [resi, setResi] = useState<InputProps>({
    resi: "",
    courier: "",
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const [courierList, setCourierList] = useState<CourierProps[]>([]);
  const [metadata, setMetadata] = useState<MetaDataProps>({
    current_page: 0,
    last_page: 0,
  });
  const [isCourierOpen, setIsCourierOpen] = useState(false);

  const getCourier = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/list-courier?page=${page}&q=${searchValue}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setCourierList(data.data);
      setMetadata({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (error: any) {
      console.log("[ERROR_GET_COURIER]:", error);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/admin/check-resi/${resi.resi}?courier=${resi.courier}`);
  };

  useEffect(() => {
    getCourier();
  }, [page, searchValue]);
  useEffect(() => {
    getCourier();
  }, []);

  return (
    <div className="w-full h-full justify-center items-center max-w-2xl flex mx-auto">
      <div className="flex flex-col items-center w-full gap-y-4 -mt-10">
        <h2 className="text-5xl font-bold">CHECK RESI</h2>
        <form
          onSubmit={handleSearch}
          className="flex w-full gap-x-2 items-center"
        >
          <Input
            placeholder="Kode resi..."
            value={resi.resi}
            className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
            onChange={(e) =>
              setResi((prev) => ({ ...prev, resi: e.target.value }))
            }
          />
          <Popover open={isCourierOpen} onOpenChange={setIsCourierOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className="w-[150px] flex-none justify-between bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border text-black dark:text-white border-green-200 hover:border-green-400 dark:border-green-200/40 dark:hover:border-green-400"
              >
                {resi.courier === ""
                  ? "Pilih kurir..."
                  : mapCourier.find((item) => item.value === resi.courier)?.name
                  ? mapCourier.find((item) => item.value === resi.courier)?.name
                  : "Pilih kurir..."}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[200px]">
              <Command>
                <CommandGroup>
                  <div className="relative mb-1">
                    <Input
                      className="p-0 h-8 pl-8 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                      autoFocus
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                    <Search className="w-4 h-4 absolute top-2 left-2" />
                  </div>
                  <CommandSeparator className="mb-1" />
                  <CommandList>
                    {courierList.map((item) => (
                      <CommandItem
                        key={item.courier_name}
                        onSelect={() => {
                          setIsCourierOpen(false);
                          setResi((prev) => ({
                            ...prev,
                            courier: item.courier_code,
                          }));
                        }}
                      >
                        {item.courier_name}
                      </CommandItem>
                    ))}
                  </CommandList>
                  <CommandSeparator className="mt-1" />
                  <div className="flex justify-between mt-2 items-center">
                    <Button
                      className="p-0 h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => prev - 1);
                      }}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="h-8 px-3 flex items-center justify-center text-xs">
                      Page {metadata.current_page} of {metadata.last_page}
                    </div>
                    <Button
                      className="p-0 h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => prev + 1);
                      }}
                      disabled={page === metadata.last_page}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            type="submit"
            size={"icon"}
            className="flex-none bg-green-400 hover:bg-green-300 text-black dark:bg-green-500 hover:dark:bg-green-400"
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
