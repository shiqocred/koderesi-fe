import React, { Suspense } from "react";
import { CreditsClient } from "./_components/credits-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kredit",
};

const CreditsPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">Kredit</h3>
        <p className="font-light text-sm lg:text-base">
          Kelola kredit pengguna
        </p>
      </div>
      <Suspense>
        <CreditsClient />
      </Suspense>
    </div>
  );
};

export default CreditsPage;
