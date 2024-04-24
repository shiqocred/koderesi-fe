import { DataTable } from "@/components/data-tabel";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { archives } from "@/lib/utils";
import { columns } from "./components/colums";
import { Metadata } from "next";

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
      <Card className="flex flex-col text-sm text-center p-4 divide-y">
        <DataTable columns={columns} data={archives} />
      </Card>
    </div>
  );
};

export default ArchivesPage;
