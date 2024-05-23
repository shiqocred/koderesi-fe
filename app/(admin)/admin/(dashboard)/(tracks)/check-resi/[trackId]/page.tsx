import React, { Suspense } from "react";
import { CheckResiIdClient } from "./_components/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CheckResiIdPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-6 flex flex-col">
      <div className="flex w-full items-center border-b border-gray-500 pb-4 gap-4">
        <Link href="/admin/check-resi">
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
      <Suspense fallback={null}>
        <CheckResiIdClient />
      </Suspense>
    </div>
  );
};

export default CheckResiIdPage;
