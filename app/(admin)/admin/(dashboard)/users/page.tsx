import React, { Suspense } from "react";
import { UsersClient } from "./_components/users-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Pengguna",
};

const UsersPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">List Pengguna</h3>
        <p className="font-light text-sm lg:text-base">
          List semua pengguna koderesi
        </p>
      </div>
      <Suspense>
        <UsersClient />
      </Suspense>
    </div>
  );
};

export default UsersPage;
