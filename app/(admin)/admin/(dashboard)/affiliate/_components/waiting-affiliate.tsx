import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface DataProps {
  id: number;
  nama: string;
  status: string;
}

const WaitingAffiliate = (data: DataProps) => {
  const { onOpen } = useModal();
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
      <div className="flex w-full gap-4">
        <Button
          className="w-full bg-red-500 hover:bg-red-400 text-black"
          onClick={() => onOpen("reject-affiliate")}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject
        </Button>
        <Button
          className="w-full bg-green-500 hover:bg-green-400 text-black"
          onClick={() => onOpen("approve-affiliate")}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Approve
        </Button>
      </div>
    </>
  );
};

export default WaitingAffiliate;
