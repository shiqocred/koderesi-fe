import { ResiCard } from "@/components/resi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { data } from "@/lib/utils";
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="w-full transition-all flex flex-col md:flex-row gap-4 xl:gap-8">
        <Card className="w-full lg:w-2/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-xl font-bold">Lacak Resi Anda!</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
              Silahkan masukan resi anda
            </p>
          </div>
          <Button
            className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
            variant={"outline"}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </Card>
        <Card className="w-full lg:w-3/5 xl:w-full px-4 py-2 xl:px-7 xl:py-4 flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-xl font-bold">Kredit Habis?</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 font-light">
              Top up kredit anda sekarang juga!
            </p>
          </div>
          <div className="flex items-center">
            {/* <div className="px-6 flex flex-col items-center bg-green-400 h-[50px] justify-center rounded-l-md">
              <h3 className="font-bold text-lg leading-none dark:text-gray-900">
                3500 kredit
              </h3>
              <p className="text-xs text-gray-900">Total kredit anda</p>
            </div> */}
            <Link href={"/top-up"}>
              <Button
                className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                variant={"outline"}
              >
                <Rocket className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      <Separator className="dark:bg-white bg-gray-500" />
      <div className="w-full transition-all flex flex-col md:flex-row gap-4">
        <div className="lg:w-4/12 xl:w-3/12 gap-4 flex md:flex-col flex-wrap">
          <Card className="w-full text-sm h-16 items-center flex px-6 justify-between">
            <p>Total Resi</p>
            <p className="font-bold">5</p>
          </Card>
          <Card className="w-full text-sm h-16 flex-1 items-center flex px-6 justify-between">
            <p>On Progress</p>
            <p className="font-bold">5</p>
          </Card>
          <Card className="w-full text-sm h-16 flex-1 items-center flex px-6 justify-between">
            <p>Delivered</p>
            <p className="font-bold">5</p>
          </Card>
        </div>
        <Card className="lg:w-8/12 xl:w-9/12 p-4 rounded-md flex flex-col gap-y-4">
          {data.map((item) => (
            <ResiCard key={item.id} {...item} isDashboard></ResiCard>
          ))}
          <Link href="/tracks">
            <Button className="bg-green-400 hover:bg-green-500 text-gray-900 text-xs">
              Lebih banyak...
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
