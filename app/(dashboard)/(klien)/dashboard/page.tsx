import { ResiCard } from "@/components/resi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Rocket } from "lucide-react";
import React from "react";

const data = [
  {
    kode_resi: "SPX010001020102",
    keterangan: "resi sepatu",
    kode_kurir: "JNE Cargo",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 februari",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 februari",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "J&T",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 februari",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 februari",
      waktu: "13.00",
    },
  },
  {
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "J&T",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 februari",
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
            <p className="text-sm text-gray-500">Silahkan masukan resi anda</p>
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
            <p className="text-sm text-gray-500">
              Top up kredit anda sekarang juga!
            </p>
          </div>
          <div className="flex items-center">
            <div className="px-6 flex flex-col items-center bg-green-400 h-[50px] justify-center rounded-l-md">
              <h3 className="font-bold text-sm dark:text-gray-900">
                3500 kredit
              </h3>
              <p className="text-xs text-white">Total kredit anda</p>
            </div>
            <Button
              className="w-16 h-16 border border-green-400 rounded-md text-green-400 hover:text-green-400 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
              variant={"outline"}
            >
              <Rocket className="w-6 h-6" />
            </Button>
          </div>
        </Card>
      </div>
      <Separator className="dark:bg-white bg-gray-500" />
      <div className="w-full transition-all flex gap-4">
        <div className="w-3/12 gap-4 flex flex-col">
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>Total Resi</p>
            <p className="font-bold text-lg">5</p>
          </Card>
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>On Progress</p>
            <p className="font-bold text-lg">5</p>
          </Card>
          <Card className="w-full h-16 items-center flex px-6 justify-between">
            <p>Delivered</p>
            <p className="font-bold text-lg">5</p>
          </Card>
        </div>
        <Card className="w-9/12 p-4 rounded-md space-y-4">
          {data.map((item) => (
            <ResiCard key={item.kode_resi} {...item}></ResiCard>
          ))}
          <Button className="bg-green-400 hover:bg-green-500 text-gray-900">
            Lebih banyak...
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;