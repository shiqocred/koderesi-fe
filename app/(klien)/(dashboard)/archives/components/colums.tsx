"use client";

import { cn, formatTanggalWaktu } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveRestore, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ArchiveProps } from "./client";
import { mapCourier } from "@/components/modals/add-resi-modal";
import { Button } from "@/components/ui/button";
import { TooltipProviderPage } from "@/providers/tooltip-provider-page";
import { useModal } from "@/hooks/use-modal";
import { ArchiveButton } from "./archive-button";

export const columns: ColumnDef<ArchiveProps>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "waybill",
    header: () => <div className="text-center">Kode Resi</div>,
    cell: ({ row }) => (
      <Link href={`/archives/${row.original.id}`}>
        <div className="text-left hover:underline">{row.original.waybill}</div>
      </Link>
    ),
  },
  {
    accessorKey: "courier",
    header: () => <div className="text-center">Kurir</div>,
    cell: ({ row }) => {
      const kurir = mapCourier.find(
        (kurir) => kurir.value === row.original.courier
      );

      if (!kurir) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{kurir.name}</span>
        </div>
      );
    },
    filterFn: (row, id, label) => {
      return label.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "manifests.note",
    header: () => <div className="text-center">Manifest</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.manifests[0].note}</div>
    ),
  },
  {
    accessorKey: "manifests.date_manifest",
    header: () => <div className="text-center">Waktu</div>,
    cell: ({ row }) =>
      formatTanggalWaktu(row.original.manifests[0].date_manifest),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded px-3 py-0.5 dark:text-gray-900",
          row.original.status === "delivered" ? "bg-green-400" : "bg-red-300"
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <ArchiveButton id={row.original.id} />,
  },
];
