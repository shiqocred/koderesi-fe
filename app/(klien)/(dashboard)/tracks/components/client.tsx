"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  DatabaseBackupIcon,
  LayoutGrid,
  LayoutList,
  Loader2,
  Search,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ResiCard } from "@/components/resi-card";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useDebounce } from "@/hooks/use-debounce";

interface ListResiProps {
  id: string;
  title: string;
  waybill: string;
  status: string;
  courier: string;
  shipper: string;
  receiver: string;
  origin_address: string;
  destination_address: string;
  manifests: {
    id: string;
    waybill_id: string;
    note: string;
    status: string;
    date_manifest: string;
  }[];
}

const TracksAdminClient = () => {
  const router = useRouter();
  const params = useSearchParams();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [listResi, setListResi] = useState<ListResiProps[]>([]);

  const [search, setSearch] = useState(params.get("search") ?? "");
  const [filter, setFilter] = useState(params.get("filter") ?? "semua");
  const [layout, setLayout] = useState(params.get("view") ?? "list");
  const [dataSearch, setDataSearch] = useState("");
  const searchValue = useDebounce(dataSearch);
  const [page, setPage] = useState({
    current: parseFloat(params.get("q") ?? "1") ?? 1,
    last: 1,
    prev: 1,
    next: 1,
    total: 1,
  });
  const [isUpdateList, setIsUpdateList] = useState<boolean>(false);

  const getResiList = async () => {
    try {
      setIsUpdateList(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/admin/waybill?filter=${
          filter === "on_progress"
            ? "?f=on-progress"
            : filter === "delivered"
            ? "?f=delivered"
            : ""
        }&q=${search}&page=${page.current}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setListResi(data.data);
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
    } finally {
      setIsUpdateList(false);
    }
  };

  const handleSetParams = useCallback(
    (f: string, s: string, l: string, p: number) => {
      setSearch(s);
      setLayout(l);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        view: l,
        filter: f,
        search: s,
        page: p,
      };

      if (!s) {
        delete updateQuery.search;
      }
      if (!f || f === "semua") {
        delete updateQuery.filter;
      }
      if (!l || l === "list") {
        delete updateQuery.view;
      }
      if (!p || p === 0) {
        delete updateQuery.page;
      }

      const url = qs.stringifyUrl(
        {
          url: "/tracks",
          query: updateQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  useEffect(() => {
    handleSetParams(filter, searchValue, layout, page.current);
  }, [searchValue]);

  useEffect(() => {
    getResiList();
  }, [params.get("search"), params.get("filter")]);

  useEffect(() => {
    getResiList();
    handleSetParams(
      params.get("filter") ?? "",
      params.get("search") ?? "",
      params.get("view") ?? "list",
      parseFloat(params.get("page") ?? "1") ?? 1
    );
    setDataSearch(params.get("search") ?? "");
  }, []);
  return (
    <Card className="flex flex-col p-2 md:p-4 gap-4 shadow">
      <div className="flex gap-4 w-full flex-col lg:flex-row">
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
            placeholder="Search resi code..."
          />
        </div>
        <div className="flex lg:w-auto w-full gap-4">
          <div className="flex w-full lg:w-auto border-green-200 dark:border-green-200/40 border rounded-md hover:border-green-400 dark:hover:border-green-400">
            <Button
              onClick={(e) => {
                handleSetParams("semua", search, layout, page.current);
                setFilter("semua");
              }}
              className={cn(
                "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white h-8 md:h-10",
                filter === "semua"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              Semua
            </Button>
            <Button
              onClick={(e) => {
                handleSetParams("on_progress", search, layout, page.current);
                setFilter("on_progress");
              }}
              className={cn(
                "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white h-8 md:h-10",
                filter === "on_progress"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              On Progress
            </Button>
            <Button
              onClick={(e) => {
                handleSetParams("delivered", search, layout, page.current);
                setFilter("delivered");
              }}
              className={cn(
                "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white h-8 md:h-10",
                filter === "delivered"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              Delivered
            </Button>
          </div>
          <div className="md:flex hidden border-green-200 border rounded-md hover:border-green-400">
            <Button
              onClick={(e) => {
                handleSetParams(filter, search, "list", page.current);
                setLayout("list");
              }}
              className={cn(
                "w-10 text-xs p-0",
                layout === "list"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              <LayoutList className="w-4 h-4 text-gray-900 dark:text-white" />
            </Button>
            <Button
              onClick={(e) => {
                handleSetParams(filter, search, "grid", page.current);
                setLayout("grid");
              }}
              className={cn(
                "w-10 text-xs p-0",
                layout === "grid"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              <LayoutGrid className="w-4 h-4 text-gray-900 dark:text-white" />
            </Button>
          </div>
        </div>
      </div>
      {listResi.length ? (
        <div
          className={cn(
            "gap-4 relative",
            layout === "list"
              ? "flex flex-col"
              : "md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col"
          )}
        >
          {isUpdateList && (
            <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
              <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
            </div>
          )}
          {listResi.map((item) => (
            <ResiCard
              key={item.id}
              id={item.id}
              keterangan={item.title}
              kode_kurir={item.courier}
              kode_resi={item.waybill}
              receiver={item.receiver}
              shipper={item.shipper}
              status={item.status}
              last_manifest={{
                manifest: item.manifests[0].note,
                date: item.manifests[0].date_manifest,
              }}
              layout={layout}
            />
          ))}
        </div>
      ) : (
        <Card className="border border-green-200 dark:border-green-200/40 flex flex-col gap-2 text-gray-500 dark:text-gray-700 justify-center min-h-[200px] items-center text-lg lg:text-xl font-bold">
          <DatabaseBackupIcon className="lg:w-14 lg:h-14 h-10 w-10" />
          No Data Found.
        </Card>
      )}
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-5 items-center">
          <p className="text-sm">Total Waybill: {page.total}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-sm">
            Page {page.current} of {page.last}
          </p>
          <div className="flex items-center gap-2">
            <Button
              className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
              onClick={() =>
                handleSetParams(filter, searchValue, layout, page.prev)
              }
              disabled={page.prev === page.current}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className="p-0 h-9 w-9 bg-green-400/80 hover:bg-green-400 text-black"
              onClick={() =>
                handleSetParams(filter, searchValue, layout, page.next)
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

export default TracksAdminClient;
