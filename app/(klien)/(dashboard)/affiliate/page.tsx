import { Header } from "@/components/header";
import { Metadata } from "next";
import { AffiliateClient } from "./components/affiliate-client";

export const metadata: Metadata = {
  title: "Affiliate",
};

const AffiliatePage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col h-full">
      <Header
        title="Affiliate Koderesi"
        description="Jadilah partner pemasaran kami!"
      />
      <AffiliateClient />
    </div>
  );
};

export default AffiliatePage;
