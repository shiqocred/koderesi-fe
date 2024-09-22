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
import {
  AlertCircle,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  Save,
  ScanSearch,
  Search,
  TextSearch,
  X,
  XCircle,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import qs from "query-string";
import { toast } from "sonner";
import { formatTanggal, formatTanggalWaktu, formatWaktu } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";

interface DataCheckingProps {
  waybill_id: string;
  courier: string;
  shipper: string;
  receiver: string;
  origin_address: string;
  destination_address: string;
  status: string;
  display_status: string;
  manifest: {
    note: string;
    status: string;
    waybill_id: string;
    date_manifest: string;
  }[];
}

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
  const { onOpen } = useModal();
  const token = cookies.get("accessToken");
  const params = useSearchParams();
  const [resi, setResi] = useState<InputProps>({
    resi: params.get("resi") ?? "",
    courier: params.get("courier") ?? "",
  });
  const [dataResi, setDataResi] = useState<DataCheckingProps>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const [courierList, setCourierList] = useState<CourierProps[]>([]);
  const [isError, setIsError] = useState(false);
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

  const handleSetParams = useCallback(
    (r: string, c: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        resi: r,
        courier: c,
      };

      if (!c || c === "") {
        delete updateQuery.courier;
      }
      if (!r || r === "") {
        delete updateQuery.resi;
      }

      const url = qs.stringifyUrl(
        {
          url: "/admin/check-resi",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    handleSetParams(resi.resi, resi.courier);
    cookies.set("update resi", "1");
  };

  const handleGetDetail = async () => {
    const body = {
      waybill_id: resi.resi,
      courier_code: resi.courier,
    };
    try {
      const res = await axios.post(
        `https://koderesi.raventech.my.id/api/superadmin/waybill/check-resi`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resi ditemukan");
      setDataResi(res.data.data);
    } catch (error: any) {
      console.log("[ERROR_GET_DETAIL]:", error);
      setIsError(true);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Resi tidak ditemukan.
                </h5>
                <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                  <li>{error.response.data.error}</li>
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: Infinity,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    }
  };

  useEffect(() => {
    getCourier();
  }, [page, searchValue]);

  useEffect(() => {
    if (cookies.get("update resi")) {
      handleGetDetail();
      return cookies.remove("update resi");
    }
  }, [cookies.get("update resi")]);

  useEffect(() => {
    getCourier();
  }, []);

  return (
    <Card className="p-4 flex flex-col w-full gap-6 h-auto">
      <div className="flex flex-col gap-y-2">
        <Label>Nomor Resi</Label>
        <form
          onSubmit={handleSearch}
          className="flex w-full gap-x-2 items-center"
        >
          <Input
            placeholder="Kode resi..."
            value={resi.resi}
            className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent"
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
          {params.get("resi") && params.get("courier") && (
            <Button
              type="button"
              className="flex-none bg-red-400 hover:bg-red-300 text-black dark:bg-red-500 hover:dark:bg-red-400"
              onClick={(e) => {
                e.preventDefault();
                handleSetParams("", "");
                setResi({
                  resi: "",
                  courier: "",
                });
                setIsError(false);
                setDataResi(undefined);
              }}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </form>
      </div>
      {dataResi?.waybill_id ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <div className=" flex flex-col text-xs md:text-sm bg-gray-50 dark:bg-gray-800 p-2 md:p-4 gap-2 rounded-md h-auto">
              <div className="flex justify-between ">
                <p>Waybill:</p>
                <p className="font-semibold capitalize">
                  {dataResi?.waybill_id}
                </p>
              </div>
              <div className="flex justify-between ">
                <p>Kurir:</p>
                <p>
                  {
                    mapCourier.find((item) => item.value === dataResi?.courier)
                      ?.name
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 p-2 md:p-4 rounded-md h-auto">
              <div>
                <p className="text-xs md:text-sm font-semibold">Pengirim</p>
                <h5 className="capitalize font-semibold md:text-lg text-base">
                  {dataResi?.shipper}
                </h5>
                <p className="text-xs md:text-sm text-gray-500 mt-4">
                  {dataResi?.origin_address}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Separator className="flex-1 dark:bg-gray-300 bg-gray-500" />
                <ArrowDown className="md:w-5 md:h-5 w-4 h-4 text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold">Penerima</p>
                <h5 className="capitalize font-semibold md:text-lg text-base">
                  {dataResi?.receiver}
                </h5>
                <p className="text-xs md:text-sm text-gray-500 mt-4">
                  {dataResi?.destination_address}
                </p>
              </div>
            </div>
            {dataResi?.status === "delivered" && (
              <div className="flex flex-col bg-gray-50 dark:bg-gray-800 p-2 md:p-4 rounded-md h-auto">
                <div>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <PackageCheck className="w-5 h-5 text-green-500" />
                      <p className="font-semibold text-xs md:text-sm">
                        Diterima pada:
                      </p>
                    </div>
                    <p className="text-xs md:text-sm">
                      {dataResi?.manifest.length > 0 &&
                        formatTanggalWaktu(dataResi?.manifest[0].date_manifest)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full lg:w-3/5 sm:text-sm lg:text-base text-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center pb-4">
              <span className="font-semibold text-lg mb-2 md:mb-0">
                Manifest Pengiriman
              </span>
            </div>
            <div className="border rounded-md">
              {dataResi?.manifest.map((item) => (
                <div
                  key={item.date_manifest}
                  className="flex h-full even:bg-gray-50 dark:odd:bg-gray-800/40 dark:even:bg-gray-800"
                >
                  <div className="w-24 md:w-32 flex flex-col pr-2 pl-1 md:pl-2 md:pr-4 border-r py-4 border-gray-500 flex-none text-end text-xs md:text-sm">
                    <p>
                      {item.date_manifest && formatTanggal(item.date_manifest)}
                    </p>
                    <p>
                      {item.date_manifest && formatWaktu(item.date_manifest)}
                    </p>
                  </div>
                  <div className="py-4 flex items-center px-4 justify-between w-full">
                    {item.note}
                    <Button
                      className="flex-none"
                      size={"icon"}
                      onClick={() =>
                        onOpen("save-manifest", "", {
                          note: item.note,
                          status: item.status,
                          waybill_id: item.waybill_id,
                          date_manifest: item.date_manifest,
                        })
                      }
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="w-full flex justify-center h-[300px] items-center text-gray-700 dark:text-gray-400">
          <div className="flex gap-3 items-center flex-col justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100">
              <TextSearch className="w-8 h-8" />
            </div>
            <h5 className="text-lg font-medium">
              Resi yang anda cari tidak ditemukan atau terjadi kesalahan.
            </h5>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center h-[200px] items-center text-gray-600 dark:text-gray-400">
          <div className="flex gap-3 items-center">
            <ScanSearch className="w-8 h-8" />
            <h5 className="text-lg font-semibold">
              Masukan Nomor Resi dan Kurir untuk Mendapatkan hasil.
            </h5>
          </div>
        </div>
      )}
    </Card>
  );
};
