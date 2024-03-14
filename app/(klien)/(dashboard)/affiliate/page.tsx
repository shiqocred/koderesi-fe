import { Header } from "@/components/header";
import { Metadata } from "next";
import { AffiliateClient } from "./components/affiliate-client";

export const metadata: Metadata = {
  title: "Affiliate",
};

const AffiliatePage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header
        title="Affiliate Koderesi"
        description="Jadilah partner pemasaran kami!"
      />
      <AffiliateClient />
    </div>
  );
};

export default AffiliatePage;
