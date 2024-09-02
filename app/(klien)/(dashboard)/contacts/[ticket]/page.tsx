import React, { Suspense } from "react";
import { ClientContact } from "./_components/client-contact";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Support",
};

const ContactTicketPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <div className="flex w-full border-b border-gray-500 pb-4 items-center gap-2">
        <Link
          href="/contacts"
          className=" w-10 h-10 flex justify-center items-center rounded-md hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex flex-col">
          <h3 className="xl:text-xl text-lg font-bold">Contact Support</h3>
          <p className="font-light text-sm lg:text-base">
            Kelola Pengaduan Pelanggan
          </p>
        </div>
      </div>
      <Suspense>
        <ClientContact />
      </Suspense>
    </div>
  );
};

export default ContactTicketPage;
