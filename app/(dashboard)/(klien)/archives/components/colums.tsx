"use client";

import { ArchiveDataProps, cn, couriers } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ArchiveDataProps>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">No</div>,
  },
  {
    accessorKey: "kode_resi",
    header: () => <div className="text-center">Kode Resi</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.kode_resi}</div>
    ),
  },
  {
    accessorKey: "kode_kurir",
    header: () => <div className="text-center">Kurir</div>,
    cell: ({ row }) => {
      const kurir = couriers.find(
        (kurir) => kurir.value === row.getValue("kode_kurir")
      );

      if (!kurir) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{kurir.label}</span>
        </div>
      );
    },
    filterFn: (row, id, label) => {
      return label.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "last_manifest",
    header: () => <div className="text-center">Manifest</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.last_manifest.manifest +
          " " +
          row.original.last_manifest.city}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: () => <div className="text-center">Waktu</div>,
    cell: ({ row }) =>
      row.original.last_manifest.date +
      " - " +
      row.original.last_manifest.waktu,
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
    cell: ({ row }) => (
      <button
        type="button"
        aria-label="more"
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-gray-500 text-gray-500 dark:bg-gray-700 dark:text-gray-200"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
    ),
  },
];
