import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CheckResiClient } from "./_components/check-resi-client";

const CheckResiPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col h-full">
      <div className="flex w-full md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
        <Link href="/admin/tracks">
          <Button variant={"ghost"} size={"icon"}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">Check Resi</h3>
          <p className="font-light text-sm lg:text-base">
            Check resi untuk pengguna
          </p>
        </div>
      </div>
      <Suspense>
        <CheckResiClient />
      </Suspense>
    </div>
  );
};

export default CheckResiPage;
