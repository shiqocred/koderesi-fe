import React, { Suspense } from "react";
import AffiliateClient from "./_components/affiliate-client";

const AffiliatePage = () => {
  return (
    <div className="p-4 pb-8 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">Affiliate</h3>
        <p className="font-light text-sm lg:text-base">
          Kelola affiliate pengguna
        </p>
      </div>
      <Suspense>
        <AffiliateClient />
      </Suspense>
    </div>
  );
};

export default AffiliatePage;
