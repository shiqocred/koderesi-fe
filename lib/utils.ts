import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as formatDateFns } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { ExternalToast, toast } from "sonner";

export const formatNumber = (number: number) => {
  const formatter = new Intl.NumberFormat("id-ID"); // Atur kode bahasa dan negara sesuai kebutuhan Anda
  return formatter.format(number);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatWaktu = (tanggal: string) => {
  return (
    !isNaN(new Date(tanggal).getTime()) &&
    formatDateFns(new Date(tanggal), "HH:mm", {
      locale: indonesia,
    })
  );
};
export const formatTanggal = (tanggal: string) => {
  return !isNaN(new Date(tanggal).getTime())
    ? formatDateFns(new Date(tanggal), "dd MMM yyyy", {
        locale: indonesia,
      }).toString()
    : "";
};
export const formatTanggalWaktu = (tanggal: string) => {
  return (
    !isNaN(new Date(tanggal).getTime()) &&
    formatDateFns(new Date(tanggal), "dd MMM yyyy - HH:mm", {
      locale: indonesia,
    })
  );
};

export function formatRupiah(rupiah: number) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(rupiah);
}

export const optionToast: ExternalToast = {
  duration: 30000,
  classNames: {
    toast:
      "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
  },
};

// Fungsi sederhana untuk memformat nomor telepon
const formatPhoneNumber = (phoneNumber: number): string => {
  return phoneNumber.toString().replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
};

export default formatPhoneNumber;

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

export const mapNewestTransaction = [
  {
    id: 4459076962,
    tanggal: "feb 2, 13.00",
    price: 694991,
    status: "in",
  },
  {
    id: 5122705183,
    tanggal: "feb 2, 13.00",
    price: 295304,
    status: "in",
  },
  {
    id: 3040271073,
    tanggal: "feb 2, 13.00",
    price: 551682,
    status: "out",
  },
  {
    id: 5438822853,
    tanggal: "feb 2, 13.00",
    price: 710425,
    status: "in",
  },
];

export const month = [
  {
    label: "januari",
    value: "jan",
  },
  {
    label: "februari",
    value: "feb",
  },
  {
    label: "maret",
    value: "mar",
  },
  {
    label: "april",
    value: "apr",
  },
  {
    label: "mei",
    value: "mei",
  },
  {
    label: "juni",
    value: "jun",
  },
  {
    label: "juli",
    value: "jul",
  },
  {
    label: "agustus",
    value: "agu",
  },
  {
    label: "september",
    value: "sep",
  },
  {
    label: "oktober",
    value: "okt",
  },
  {
    label: "november",
    value: "nov",
  },
  {
    label: "desember",
    value: "des",
  },
];

export const formatThousand = (value: number): string => {
  if (value >= 1000) {
    const formattedValue = value / 1000;
    const formattedString =
      formattedValue % 1 === 0
        ? formattedValue.toFixed(0)
        : formattedValue.toFixed(1);
    return `${formattedString} K`;
  }
  return value.toString();
};

export const generateRandomHex = () => {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
};
