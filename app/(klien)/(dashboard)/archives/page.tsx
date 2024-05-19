import { Header } from "@/components/header";
import { Metadata } from "next";
import { ArchiveClient } from "./components/client";

export const metadata: Metadata = {
  title: "Arsip Resi",
};

const ArchivesPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col">
      <Header
        title="List Arsip Resi"
        description="Simpan resi yang tidak terpakai"
      />
      <ArchiveClient />
    </div>
  );
};

export default ArchivesPage;
