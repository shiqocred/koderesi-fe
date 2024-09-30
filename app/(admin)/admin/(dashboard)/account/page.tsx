import React, { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ButtonLogout } from "./_components/button-logout";
import { ClientSettings } from "./_components/client-settings";

export const metadata: Metadata = {
  title: "Account Support",
};

const AccountPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <div className="flex w-full border-b border-gray-500 pb-4 justify-between items-center">
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">Pengaturan Akun</h3>
          <p className="font-light text-sm lg:text-base">
            Kelola Pengaturan Akun anda
          </p>
        </div>
        <ButtonLogout />
      </div>
      <Suspense>
        <ClientSettings />
      </Suspense>
    </div>
  );
};

export default AccountPage;
