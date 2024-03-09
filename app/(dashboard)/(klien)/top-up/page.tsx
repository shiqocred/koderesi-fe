import { Header } from "@/components/header";
import { PricingTable } from "@/components/pricing-table";
import { Card } from "@/components/ui/card";
import React from "react";

const TopUpPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header
        title="Kredit Koderesi"
        description="Top up untuk menjadi advance"
      />
      <Card className="flex flex-col text-sm text-center p-4 divide-y">
        <div className="w-full flex justify-center py-10">
          <div className="flex w-full flex-col max-w-4xl  gap-4">
            <h2 className="text-5xl font-bold uppercase text-green-400">
              Pilih Paket Kredit Yang Paling{" "}
              <span className="text-gray-900 dark:text-white">
                Tepat Untuk Anda
              </span>
            </h2>
            <p className="font-medium text-xl text-gray-500 dark:text-gray-300">
              Pilihlah dengan fokus pada kebutuhan dan preferensi anda.
            </p>
          </div>
        </div>
        <PricingTable />
      </Card>
    </div>
  );
};

export default TopUpPage;
