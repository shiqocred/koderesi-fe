import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const data = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  id: number;
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
