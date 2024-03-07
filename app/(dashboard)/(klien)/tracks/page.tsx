"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import React, { useState } from "react";
import { data } from "../dashboard/page";
import { ResiCard } from "@/components/resi-card";

const TracksPage = () => {
  const [filter, setFilter] = useState("semua");
  const [layout, setLayout] = useState("list");
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header title="List Resi" description="List semua resi list punyamu" />
      <Card className="flex flex-col p-4 gap-4">
        <div className="flex gap-4 w-full">
          <div className="w-full relative flex items-center">
            <Input
              className="pl-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              placeholder="Search resi code..."
            />
            <Search className="w-5 h-5 absolute left-3 text-gray-500" />
          </div>
          <div className="flex border-green-200 dark:border-green-200/40 border rounded-md hover:border-green-400 dark:hover:border-green-400">
            <Button
              onClick={() => setFilter("semua")}
              className={cn(
                "w-[100px] text-gray-900 text-xs dark:text-white",
                filter === "semua"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              Semua
            </Button>
            <Button
              onClick={() => setFilter("on progress")}
              className={cn(
                "w-[100px] text-gray-900 text-xs dark:text-white",
                filter === "on progress"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              On Progress
            </Button>
            <Button
              onClick={() => setFilter("delivered")}
              className={cn(
                "w-[100px] text-gray-900 text-xs dark:text-white",
                filter === "delivered"
                  ? "bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  : "bg-transparent hover:bg-green-100 dark:hover:bg-gray-700"
              )}
            >
              Delivered
            </Button>
          </div>
          <div className="flex border-green-200 border rounded-md hover:border-green-400">
            <Button
              onClick={() => setLayout("list")}
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
              onClick={() => setLayout("grid")}
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
        <div
          className={cn(
            "gap-4",
            layout === "list" ? "flex flex-col" : "grid grid-cols-3"
          )}
        >
          {filter === "semua"
            ? data.map((item) => (
                <ResiCard key={item.kode_resi} {...item} layout={layout} />
              ))
            : data
                .filter((item) => item.status === filter)
                .map((item) => (
                  <ResiCard key={item.kode_resi} {...item} layout={layout} />
                ))}
        </div>
      </Card>
    </div>
  );
};

export default TracksPage;
