import { Header } from "@/components/header";
import React, { Suspense } from "react";
import TracksClient from "./components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacak Resi",
};

const TracksPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col">
      <Header title="List Resi" description="List semua resi list punyamu" />
      <Suspense fallback={null}>
        <TracksClient />
      </Suspense>
    </div>
  );
};

export default TracksPage;
