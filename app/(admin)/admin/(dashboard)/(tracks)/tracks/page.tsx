import { Header } from "@/components/header";
import React, { Suspense } from "react";
import TracksClient from "./_components/client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lacak Resi",
};

const TracksPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="flex w-full justify-between md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">List Resi</h3>
          <p className="font-light text-sm lg:text-base">
            List semua resi pengguna
          </p>
        </div>
        <Link href={"/admin/check-resi"}>
          <Button className="bg-green-400 hover:bg-green-500 text-black">
            <Search className="w-4 h-4 mr-2" />
            Check Resi
          </Button>
        </Link>
      </div>
      <Suspense>
        <TracksClient />
      </Suspense>
    </div>
  );
};

export default TracksPage;
