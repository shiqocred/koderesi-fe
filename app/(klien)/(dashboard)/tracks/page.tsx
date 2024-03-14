import { Header } from "@/components/header";
import React, { Suspense } from "react";
import TracksClient from "./components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacak Resi",
};

const TracksPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header title="List Resi" description="List semua resi list punyamu" />
      <Suspense fallback={null}>
        <TracksClient />
      </Suspense>
    </div>
  );
};

export default TracksPage;
