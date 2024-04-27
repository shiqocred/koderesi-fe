import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn, formatRupiah } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface DataProps {
  id: number;
  nama: string;
  cash: number;
  status: string;
}

const WaitingWithdraw = (data: DataProps) => {
  return (
    <>
      <Card className="flex items-center px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70">
        <div className="h-10 aspect-square overflow-hidden rounded relative flex-none">
          <Image alt="" src={"/avatar.webp"} fill />
        </div>
        <div className="flex md:items-center gap-1 flex-col md:flex-row md:gap-4 w-full justify-between">
          <p className="font-semibold">{data.nama}</p>
          <div className="flex items-center">
            <div
              className={cn(
                "w-[80px] flex-none text-center text-xs lg:text-sm py-0.5 md:py-1 rounded-sm text-black",
                data.status === "waiting" && "bg-yellow-300",
                data.status === "approved" && "bg-green-300",
                data.status === "rejected" && "bg-red-300"
              )}
            >
              {data.status}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nominal withdraw</p>
        <p>{formatRupiah(data.cash)}</p>
      </Card>
      <Card className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm h-10 md:h-14">
        <p className="font-semibold">Nomor DANA</p>
        <p>0888-8888-8888</p>
      </Card>
      <Card className="flex items-center flex-col px-3 py-1.5 md:p-4 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-sm">
        <Label className="text-xs md:text-sm">Update status</Label>
        <div className="flex gap-2 md:gap-4 w-full flex-col-reverse md:flex-row">
          <Button className="w-full bg-red-500 hover:bg-red-400 text-black">
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-400 text-black">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      </Card>
    </>
  );
};

export default WaitingWithdraw;
