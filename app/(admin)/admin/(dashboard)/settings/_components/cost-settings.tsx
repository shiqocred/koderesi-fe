"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal";
import { baseUrl, cn } from "@/lib/utils";
import axios from "axios";
import { Save } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export const CostSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [waybill, setWaybill] = useState({
    search: 0,
    cek: 0,
  });

  const handleGetCost = async () => {
    try {
      const res = await axios.get(`${baseUrl}/superadmin/credit`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setWaybill(res.data.data);
    } catch (error) {
      console.log("[ERROR_COST_GET]:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetCost();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-8 bg-transparent border-gray-500 border flex-col">
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold">Pengaturan Biaya Kredit</h2>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div className="space-y-0.5 md:space-y-1 relative w-full">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                waybill.search.toString().length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-light"
              )}
            >
              Pencarian Waybill
            </Label>
            <Input
              value={waybill.search}
              onChange={(e) =>
                setWaybill((prev) => ({
                  ...prev,
                  search: parseFloat(e.target.value),
                }))
              }
              type="number"
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
            />
          </div>
          <div className="space-y-0.5 md:space-y-1 relative w-full">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                waybill.cek.toString().length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-light"
              )}
            >
              Pengecekan Manifest
            </Label>
            <Input
              value={waybill.cek}
              onChange={(e) =>
                setWaybill((prev) => ({
                  ...prev,
                  cek: parseFloat(e.target.value),
                }))
              }
              type="number"
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => onOpen("edit-cost", waybill)}
            className="bg-green-400/80 hover:bg-green-400 text-black"
          >
            <Save className="h-4 w-4 mr-2" />
            Simpan
          </Button>
        </div>
      </div>
    </Card>
  );
};
