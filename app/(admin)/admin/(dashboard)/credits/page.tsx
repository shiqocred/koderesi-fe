import React from "react";
import { CreditsClient } from "./_components/credits-client";

const CreditsPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">Kredit</h3>
        <p className="font-light text-sm lg:text-base">
          Kelola kredit pengguna
        </p>
      </div>
      <CreditsClient />
    </div>
  );
};

export default CreditsPage;