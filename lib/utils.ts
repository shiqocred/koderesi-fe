import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(rupiah: number) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(rupiah);
}

export const data: ArchiveDataProps[] = [
  {
    id: "61c5b925-9272-4be4-b790-2da0d925c2b0",
    kode_resi: "SPX010001020102",
    keterangan: "resi sepatu",
    kode_kurir: "jne cargo",
    status: "on_progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "80e7ebfd-1c25-49cc-a1c4-f48ff3a7a19d",
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "on_progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "e70d4714-42f6-41ab-b625-9c3c43f1a1c5",
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "j&t",
    status: "on_progress",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "e2a0001a-1b5b-4e9e-b58c-0123469a9460",
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "aadc4262-111e-422f-92a8-c57b8a39f858",
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "j&t",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
];

export type ArchiveDataProps = {
  id: string;
  kode_resi: string;
  keterangan: string;
  kode_kurir: string;
  status: string;
  shipper: { nama: string; origin: string };
  receiver: { nama: string; destination: string };
  last_manifest: {
    manifest: string;
    city: string;
    date: string;
    waktu: string;
  };
};

export const archives: ArchiveDataProps[] = [
  {
    id: "61c5b925-9272-4be4-b790-2da0d925c2b0",
    kode_resi: "SPX010001020102",
    keterangan: "resi sepatu",
    kode_kurir: "jne cargo",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "80e7ebfd-1c25-49cc-a1c4-f48ff3a7a19d",
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "e70d4714-42f6-41ab-b625-9c3c43f1a1c5",
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "j&t",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "e2a0001a-1b5b-4e9e-b58c-0123469a9460",
    kode_resi: "SPX3200202323",
    keterangan: "resi televisi",
    kode_kurir: "shopee express",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
  {
    id: "aadc4262-111e-422f-92a8-c57b8a39f858",
    kode_resi: "JT02291201219",
    keterangan: "resi pakaian",
    kode_kurir: "j&t",
    status: "delivered",
    shipper: { nama: "ahmad fulan", origin: "jakarta" },
    receiver: { nama: "azizi", destination: "surabaya" },
    last_manifest: {
      manifest: "on transit",
      city: "solo",
      date: "3 feb",
      waktu: "13.00",
    },
  },
];

export const couriers = [
  {
    label: "J&T",
    value: "j&t",
  },
  {
    label: "shopee express",
    value: "shopee express",
  },
  {
    label: "JNE Cargo",
    value: "jne cargo",
  },
];
