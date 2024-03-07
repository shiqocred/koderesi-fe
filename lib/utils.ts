import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const data = [
  {
    id: 1,
    kode_resi: "SPX010001020102",
    keterangan: "resi sepatu",
    kode_kurir: "JNE Cargo",
    status: "on progress",
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
    status: "on progress",
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
    kode_kurir: "J&T",
    status: "on progress",
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
    kode_kurir: "J&T",
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
