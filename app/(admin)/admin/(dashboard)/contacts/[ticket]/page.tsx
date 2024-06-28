import React, { Suspense } from "react";
import { ClientContact } from "./_components/client-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support",
};

const ContactTicketPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 dark:bg-black">
      <div className="flex w-full border-b border-gray-500 pb-4 flex-col items-start">
        <h3 className="xl:text-xl text-lg font-bold">Contact Support</h3>
        <p className="font-light text-sm lg:text-base">
          Kelola Pengaduan Pelanggan
        </p>
      </div>
      <Suspense>
        <ClientContact />
      </Suspense>
    </div>
  );
};

export default ContactTicketPage;
