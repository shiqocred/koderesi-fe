import { Header } from "@/components/header";
import React, { Suspense } from "react";
import TracksClient from "./_components/client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Lacak Resi",
};

const TracksPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col">
      <div className="flex w-full justify-between items-center border-b border-gray-500 pb-4 gap-4">
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">List Resi</h3>
          <p className="font-light text-sm lg:text-base">
            List semua resi pengguna
          </p>
        </div>
        <Link href={"/admin/check-resi"}>
          <Button className="bg-green-400 hover:bg-green-500 text-black h-10 w-10 p-0 sm:px-4 sm:py-2 sm:w-auto">
            <Search className="w-4 h-4 sm:mr-2" />
            <p className="hidden sm:block">Check Resi</p>
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 md:gap-6">
        <Card className="flex w-full lg:px-5 lg:py-4 px-3 py-2 justify-between items-center  text-sm lg:text-base">
          <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
            </span>
            <p className="hidden sm:block">Semua</p>
          </div>
          <p>10</p>
        </Card>
        <Card className="flex w-full lg:px-5 lg:py-4 px-3 py-2 justify-between items-center  text-sm lg:text-base">
          <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
            <p className="hidden sm:block">On Progress</p>
          </div>
          <p>10</p>
        </Card>
        <Card className="flex w-full lg:px-5 lg:py-4 px-3 py-2 justify-between items-center  text-sm lg:text-base">
          <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
            <p className="hidden sm:block">Delivered</p>
          </div>
          <p>10</p>
        </Card>
      </div>
      <Suspense>
        <TracksClient />
      </Suspense>
    </div>
  );
};

export default TracksPage;
