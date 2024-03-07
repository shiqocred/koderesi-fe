"use client";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface ResiCardProps {
  kode_resi: string;
  keterangan: string;
  kode_kurir: string;
  shipper: { nama: string; origin: string };
  receiver: { nama: string; destination: string };
  last_manifest?: {
    manifest: string;
    city: string;
    date: string;
    waktu: string;
  };
}

export const ResiCard = ({
  kode_resi,
  keterangan,
  kode_kurir,
  shipper,
  receiver,
  last_manifest,
}: ResiCardProps) => {
  return (
    <Card className="border border-green-200 p-4 space-y-4 text-sm">
      <span className="px-2 py-1 bg-green-200 rounded-sm text-xs text-gray-900">
        {receiver.nama} / {keterangan}
      </span>
      <div className="flex justify-between">
        <div className="flex gap-16">
          <div>
            <h3>{kode_resi}</h3>
            <p className="text-xs text-gray-500">{kode_kurir}</p>
          </div>
          <div>
            <p>{shipper.nama + " (" + shipper.origin + ")"}</p>
            <Separator className="bg-gray-500" />
            <p>{receiver.nama + " (" + receiver.destination + ")"}</p>
          </div>
          <div>
            <div>{last_manifest?.manifest + " " + last_manifest?.city}</div>
            <Separator className="bg-gray-500" />
            <div>{last_manifest?.date + " - " + last_manifest?.waktu}</div>
          </div>
        </div>
        <div className="flex">
          <div>status</div>
          <div>more</div>
        </div>
      </div>
    </Card>
  );
};
