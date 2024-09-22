"use client";

import axios from "axios";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardTitle } from "@/components/ui/card";

import { ChartAdmin } from "./_components/chart-admin";
import { TopDashboard } from "./_components/top-dashboard";
import { ResiCurrentCard } from "./_components/resi-current-card";
import { UserCurrentCard } from "./_components/user-current-card";
import { TransactionCurrentCard } from "./_components/transaction-current-card";

export interface TotalDashboard {
  total_user: number;
  total_revenue: number;
  total_waybill: number;
  total_waybill_op: number;
  total_waybill_delivered: number;
}

export interface NewUserProps {
  id: string;
  name: string;
  email: string;
  email_verified_at: boolean | null;
  role: string;
  key: string;
  total_tokens: number;
  phone_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface NewManifestProps {
  id: string;
  note: string;
  status: string;
  user_id: string | null;
  waybill_id: string;
  date_manifest: string;
  created_at: string;
  updated_at: string;
  waybill: {
    id: string;
    waybill: string;
    user_id: string | null;
  };
}

export interface NewTransactionProps {
  id: string;
  user_name: string;
  method_payment: string | null;
  code_transaction: string;
  amount_bill: number;
  amount_credit: number;
  transaction_date: string;
  transaction_time: string;
  status: string;
}

const AdminDashboardpage = () => {
  const [mth, setMth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [total, setTotal] = useState<TotalDashboard>({
    total_user: 0,
    total_revenue: 0,
    total_waybill: 0,
    total_waybill_op: 0,
    total_waybill_delivered: 0,
  });
  const [newUser, setNewUser] = useState<NewUserProps[]>([
    {
      id: "",
      name: "",
      email: "",
      email_verified_at: null,
      role: "",
      key: "",
      total_tokens: 0,
      phone_number: null,
      created_at: "",
      updated_at: "",
    },
  ]);
  const [newManifest, setNewManifest] = useState<NewManifestProps[]>([
    {
      id: "",
      note: "",
      status: "",
      user_id: null,
      waybill_id: "",
      date_manifest: "",
      created_at: "",
      updated_at: "",
      waybill: {
        id: "",
        waybill: "",
        user_id: null,
      },
    },
  ]);
  const [newTransactions, setNewTransactions] = useState<NewTransactionProps[]>(
    [
      {
        id: "",
        user_name: "",
        method_payment: null,
        code_transaction: "",
        amount_bill: 0,
        amount_credit: 0,
        transaction_date: "",
        transaction_time: "",
        status: "",
      },
    ]
  );

  const month = [
    {
      label: "januari",
      value: "jan",
    },
    {
      label: "februari",
      value: "feb",
    },
    {
      label: "maret",
      value: "mar",
    },
    {
      label: "april",
      value: "apr",
    },
    {
      label: "mei",
      value: "mei",
    },
    {
      label: "juni",
      value: "jun",
    },
    {
      label: "juli",
      value: "jul",
    },
    {
      label: "agustus",
      value: "agu",
    },
    {
      label: "september",
      value: "sep",
    },
    {
      label: "oktober",
      value: "okt",
    },
    {
      label: "november",
      value: "nov",
    },
    {
      label: "desember",
      value: "des",
    },
  ];

  const onChangeMonth = (value: "prev" | "next") => {
    if (value === "prev") {
      setMth(mth !== 0 ? mth - 1 : 0);
    } else if (value === "next") {
      setMth(mth !== month.length - 1 ? mth + 1 : month.length - 1);
    }
  };

  const getTotal = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/superadmin/dashboard/total",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotal(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_TOTAL_DASHBOARD]:", error);
    }
  };
  const getNewestUser = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/superadmin/dashboard/newestuser",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewUser(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_NEWUSER_DASHBOARD]:", error);
    }
  };
  const getNewestTransaction = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/superadmin/dashboard/newesttransaction",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTransactions(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_NEWUSER_DASHBOARD]:", error);
    }
  };
  const getNewestWaybill = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/superadmin/dashboard/newestwaybill",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewManifest(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_NEWUSER_DASHBOARD]:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    getTotal();
    getNewestUser();
    getNewestTransaction();
    getNewestWaybill();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <div className="w-full transition-all flex flex-col gap-4">
        <TopDashboard {...total} />
        <Separator className="dark:bg-white bg-gray-500" />
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="w-full xl:w-2/3 lg:w-3/5 ">
            <Card className="pr-2 pt-2 md:p-2 lg:p-4 rounded-md flex flex-col gap-y-4 ">
              <div className="flex justify-between flex-col sm:flex-row items-start px-2 gap-y-2 sm:gap-y-0 sm:items-center">
                <CardTitle>Cash Flow</CardTitle>
                <div className="flex border p-1.5 rounded-md text-sm font-semibold items-center gap-x-2">
                  <Button
                    size={"icon"}
                    className="h-5 w-5 rounded-sm"
                    variant={"ghost"}
                    onClick={() => onChangeMonth("prev")}
                    disabled={mth === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="capitalize w-20 select-none flex items-center justify-center">
                    {month[mth].label}
                  </span>
                  <Button
                    size={"icon"}
                    className="h-5 w-5 rounded-sm"
                    variant={"ghost"}
                    onClick={() => onChangeMonth("next")}
                    disabled={mth === month.length - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="h-[200px] sm:h-[250px] lg:h-[380px] md:h-[300px] xl:h-[464px]">
                <ChartAdmin month={month[mth].value} />
              </div>
            </Card>
          </div>
          <div className="w-full xl:w-1/3 lg:w-2/6 xl:min-h-[546px] ">
            <TransactionCurrentCard
              label="Transaksi Terbaru"
              data={newTransactions}
              href="/admin/transactions"
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="w-full lg:w-1/3">
            <UserCurrentCard
              label="User Terbaru"
              data={newUser}
              href="/admin/users"
            />
          </div>
          <div className="w-full lg:w-2/3">
            <ResiCurrentCard
              label="Manifest Terbaru"
              data={newManifest}
              href="/admin/tracks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardpage;
