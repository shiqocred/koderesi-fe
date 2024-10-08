import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import React from "react";
import { Metadata } from "next";
import Promotion from "./components/promotion";

export const metadata: Metadata = {
  title: "Top-Up Kredit",
};

const TopUpPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col">
      <Header
        title="Kredit Koderesi"
        description="Top up untuk menjadi advance"
        isAccount
        href="/top-up"
      />
      <Card className="flex flex-col text-sm text-center p-4 shadow">
        <div className="w-full flex justify-center pt-2 pb-8 xl:py-10">
          <div className="flex w-full flex-col max-w-xl xl:max-w-4xl gap-2 xl:gap-4">
            <h2 className="text-xl sm:text-3xl xl:text-5xl font-black uppercase text-green-400 leading-tight">
              LEBIH BANYAK{" "}
              <span className="text-gray-900 dark:text-white">
                PROMO MENANTIMU!!!
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base xl:text-xl text-gray-500 dark:text-gray-300">
              Segera jangan sampai promo-promo ini terlewat.
            </p>
          </div>
        </div>
        <Promotion />
      </Card>
    </div>
  );
};

export default TopUpPage;
