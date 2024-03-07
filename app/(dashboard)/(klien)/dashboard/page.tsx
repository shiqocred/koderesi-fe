import { ResiCard } from "@/components/resi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

export const data = [
  {
    kode_resi: "SPX010001020102",
    keterangan: "resi sepatu",
    kode_kurir: "JNE Cargo",
    status: "on progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "on progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "J&T",
    status: "on progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "J&T",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
];

const DashboardPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="w-full transition-all flex gap-8">
        <Card className="w-full px-7 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Lacak Resi Anda!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 font-light">
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
        <Card className="w-full px-7 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Kredit Habis?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 font-light">
              Top up kredit anda sekarang juga!
            </p>
          </div>
          <div className="flex items-center">
            <div className="px-6 flex flex-col items-center bg-green-400 h-[50px] justify-center rounded-l-md">
              <h3 className="font-bold text-lg leading-none dark:text-gray-900">
                3500 kredit
              </h3>
              <p className="text-xs text-gray-900">Total kredit anda</p>
            </div>
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
      <div className="w-full transition-all flex gap-4">
        <div className="w-3/12 gap-4 flex flex-col">
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>Total Resi</p>
            <p className="font-bold">5</p>
          </Card>
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>On Progress</p>
            <p className="font-bold">5</p>
          </Card>
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>Delivered</p>
            <p className="font-bold">5</p>
          </Card>
        </div>
        <Card className="w-9/12 p-4 rounded-md flex flex-col gap-y-4">
          {data.map((item) => (
            <ResiCard key={item.kode_resi} {...item} isDashboard></ResiCard>
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
