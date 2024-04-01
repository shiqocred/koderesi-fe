import React from "react";
import { UsersClient } from "./_components/users-client";

const UsersPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">List Pengguna</h3>
        <p className="font-light text-sm lg:text-base">
          List semua pengguna koderesi
        </p>
      </div>
      <UsersClient />
    </div>
  );
};

export default UsersPage;
