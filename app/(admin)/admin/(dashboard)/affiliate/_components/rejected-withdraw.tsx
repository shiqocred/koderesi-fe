import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, formatRupiah } from "@/lib/utils";
import { Edit, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DataProps {
  id: number;
  nama: string;
  status: string;
  cash: number;
}

const RejectedWithdraw = (data: DataProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
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
      <Card className="flex flex-col px-3 py-1.5 md:px-4 md:py-2 gap-2 md:gap-4 bg-gray-100 dark:border dark:border-gray-700/70 text-xs md:text-sm ">
        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
          <Input
            value="Terindikasi bermasalah, silahkan hubungi CS"
            className="border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 disabled:opacity-100"
            disabled={!isEdited}
          />
          {!isEdited ? (
            <Button
              className="bg-yellow-300 hover:bg-yellow-200 text-black flex-none md:p-0 w-full md:w-10"
              onClick={() => setIsEdited(!isEdited)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              className="bg-green-400 hover:bg-green-300 text-black flex-none"
              size={"icon"}
              onClick={() => setIsEdited(!isEdited)}
            >
              <Save className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};
export default RejectedWithdraw;
