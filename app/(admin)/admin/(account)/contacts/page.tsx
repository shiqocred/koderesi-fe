import React, { Suspense } from "react";
import { ClientContact } from "./_components/client-contact";
import { TopNav } from "./_components/top-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support",
};

const ContactPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col bg-gray-50 min-h-screen h-full dark:bg-black">
      <TopNav />
      <Suspense>
        <ClientContact />
      </Suspense>
    </div>
  );
};

export default ContactPage;
