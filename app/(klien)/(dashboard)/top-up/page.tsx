import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import React from "react";
import { PriceList } from "./components/price-list";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BadgePercent } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top-Up Kredit",
};

const TopUpPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col">
      <PriceList />
    </div>
  );
};

export default TopUpPage;
