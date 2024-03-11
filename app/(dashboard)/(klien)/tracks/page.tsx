import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, data } from "@/lib/utils";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import React, { Suspense, useCallback, useState } from "react";
import { ResiCard } from "@/components/resi-card";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import TracksClient from "./components/client";

const TracksPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header title="List Resi" description="List semua resi list punyamu" />
      <Suspense fallback={null}>
        <TracksClient />
      </Suspense>
    </div>
  );
};

export default TracksPage;
