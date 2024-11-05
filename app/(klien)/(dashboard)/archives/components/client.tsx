"use client";

import { DataTable } from "@/components/data-tabel";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { columns } from "./colums";
import { archives, baseUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-localstorage";
import axios from "axios";
import { useCookies } from "next-client-cookies";

export interface ArchiveProps {
  courier: string;
  created_at: string;
  receiver: string;
  destination_address: string;
  display_status: string;
  id: string;
  manifests: {
    created_at: string;
    date_manifest: string;
    id: string;
    note: string;
    status: string;
    updated_at: string;
    user_id: string;
    waybill_id: string;
  }[];
  shipper: string;
  origin_address: string;
  status: string;
  status_loop: string;
  title: string;
  updated_at: string;
  user_id: string;
  waybill: string;
}

export const ArchiveClient = () => {
  const router = useRouter();
  const [dataArchive, setDataArchive] = useState<ArchiveProps[]>([]);

  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const getArchive = async () => {
    try {
      const res = await axios.get(`${baseUrl}/admin/archive`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setDataArchive(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_ARCHIVE]:", error);
    }
  };

  useEffect(() => {
    getArchive();
  }, []);
  return (
    <Card className="flex flex-col text-sm text-center lg:p-4 p-2 shadow">
      <DataTable columns={columns} data={dataArchive} />
    </Card>
  );
};
