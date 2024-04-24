"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const CheckResiClient = () => {
  const router = useRouter();
  const [resi, setResi] = useState<string>("");

  const handleSearch = (resi: string) => {
    router.push(`/admin/check-resi/${resi}`);
  };

  return (
    <div className="w-full h-full justify-center items-center max-w-2xl flex mx-auto">
      <div className="flex flex-col items-center w-full gap-y-4 -mt-10">
        <h2 className="text-5xl font-bold">CHECK RESI</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(resi);
          }}
          className="flex w-full gap-x-2 items-center"
        >
          <Input
            placeholder="Kode resi..."
            value={resi}
            onChange={(e) => setResi(e.target.value)}
          />
          <Button type="submit" size={"icon"} className="flex-none">
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
