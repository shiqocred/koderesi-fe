"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, data } from "@/lib/utils";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ResiCard } from "@/components/resi-card";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const TracksPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") ?? "");
  const [filter, setFilter] = useState(params.get("sort") ?? "semua");
  const [layout, setLayout] = useState(params.get("view") ?? "list");

  const handleClickLayout = useCallback(
    (l: string) => {
      setLayout(l);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        view: l,
      };

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
  const handleClickSort = useCallback(
    (f: string) => {
      setFilter(f);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        sort: f,
      };

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
  const handleChange = useCallback(
    (s: string) => {
      setSearch(s);
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        search: s,
      };

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
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header title="List Resi" description="List semua resi list punyamu" />
      <Card className="flex flex-col p-4 gap-4">
        <div className="flex gap-4 w-full flex-col lg:flex-row">
          <div className="w-full relative flex items-center">
            <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
            <Input
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search resi code..."
            />
          </div>
          <div className="flex lg:w-auto w-full gap-4">
            <div className="flex w-full lg:w-auto border-green-200 dark:border-green-200/40 border rounded-md hover:border-green-400 dark:hover:border-green-400">
              <Button
                onClick={() => handleClickSort("semua")}
                className={cn(
                  "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white",
                  filter === "semua"
                    ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
                )}
              >
                Semua
              </Button>
              <Button
                onClick={() => handleClickSort("on_progress")}
                className={cn(
                  "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white",
                  filter === "on_progress"
                    ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
                )}
              >
                On Progress
              </Button>
              <Button
                onClick={() => handleClickSort("delivered")}
                className={cn(
                  "w-full lg:w-[100px] text-gray-900 text-xs dark:text-white",
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
                onClick={() => handleClickLayout("list")}
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
                onClick={() => handleClickLayout("grid")}
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
        <div
          className={cn(
            "gap-4",
            layout === "list"
              ? "flex flex-col"
              : "md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col"
          )}
        >
          {filter === "semua"
            ? search === ""
              ? data.map((item) => (
                  <ResiCard key={item.id} {...item} layout={layout} />
                ))
              : data
                  .filter((item) =>
                    item.kode_resi
                      .toLowerCase()
                      .includes(params.get("search")?.toLowerCase() ?? "")
                  )
                  .map((item) => (
                    <ResiCard key={item.id} {...item} layout={layout} />
                  ))
            : search === ""
            ? data
                .filter((item) => item.status === filter)
                .map((item) => (
                  <ResiCard key={item.id} {...item} layout={layout} />
                ))
            : data
                .filter((item) =>
                  item.kode_resi
                    .toLowerCase()
                    .includes(params.get("search")?.toLowerCase() ?? "")
                )
                .filter((item) => item.status === filter)
                .map((item) => (
                  <ResiCard key={item.id} {...item} layout={layout} />
                ))}
        </div>
      </Card>
    </div>
  );
};

export default TracksPage;
