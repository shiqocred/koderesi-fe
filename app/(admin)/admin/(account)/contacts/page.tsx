import { LogoExpandIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { Suspense } from "react";
import { ClientContact } from "./_components/client-contact";
import Link from "next/link";
import { TopNav } from "./_components/top-nav";

const ContactPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col">
      <TopNav />
      <Suspense>
        <ClientContact />
      </Suspense>
    </div>
  );
};

export default ContactPage;
