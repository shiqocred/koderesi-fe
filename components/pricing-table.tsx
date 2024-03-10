import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const PricingTable = () => {
  return (
    <div className="rounded-md border dark:border-gray-300/40 w-full">
      <Table>
        <TableHeader className="group">
          <TableRow className="bg-gray-300 group-hover:bg-gray-400/70 dark:bg-gray-700 dark:group-hover:bg-gray-600/70">
            <TableHead
              rowSpan={2}
              className="text-gray-900 dark:text-white pl-10"
            >
              Kredit
            </TableHead>
            <TableHead
              rowSpan={2}
              className="text-gray-900 dark:text-white  text-center border-l border-gray-200"
            >
              Perincian
            </TableHead>
            <TableHead
              colSpan={3}
              className="text-gray-900 dark:text-white text-center border-b border-l border-l-gray-200 border-b-gray-200"
            >
              Harga
            </TableHead>
          </TableRow>
          <TableRow className="bg-gray-300 group-hover:bg-gray-400/70 dark:bg-gray-700 dark:group-hover:bg-gray-600/70 ">
            <TableHead className="text-gray-900 dark:text-white  text-center border-gray-200 border-l">
              Sekali Beli
            </TableHead>
            <TableHead className="text-gray-900 dark:text-white  text-center border-gray-200 border-x">
              Bulanan
            </TableHead>
            <TableHead className="text-gray-900 dark:text-white  text-center border-gray-200">
              Tahunan
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="even:bg-gray-50 border-none hover:bg-gray-100 dark:even:bg-gray-800/70 dark:hover:bg-gray-700/40">
            <TableCell className="pl-10 text-start">100</TableCell>
            <TableCell>350/kredit</TableCell>
            <TableCell className="border-l">
              {formatRupiah(35000)}{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell className="border-x">
              {formatRupiah(11550)}/bulan{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell>
              {formatRupiah(110880)}/tahun{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800/70 dark:hover:bg-gray-700/40 border-yellow-400 border shadow-md shadow-yellow-300/20">
            <TableCell className="text-start pl-10">
              500
              <Badge className="bg-yellow-400 text-gray-900 font-normal ml-4 px-4 hover:bg-yellow-300">
                populer
              </Badge>
            </TableCell>
            <TableCell>330/kredit</TableCell>
            <TableCell className="border-l">
              {formatRupiah(165000)}{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell className="border-x">
              {formatRupiah(54450)}/bulan{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell>
              {formatRupiah(522720)}/tahun{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="even:bg-gray-50 border-none hover:bg-gray-100 dark:even:bg-gray-800/70 dark:hover:bg-gray-700/40">
            <TableCell className="pl-10 text-start">1000</TableCell>
            <TableCell>300/kredit</TableCell>
            <TableCell className="border-l">
              {formatRupiah(300000)}{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell className="border-x">
              {formatRupiah(99000)}/bulan{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell>
              {formatRupiah(950400)}/tahun{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="even:bg-gray-50 border-none hover:bg-gray-100 dark:even:bg-gray-800/70 dark:hover:bg-gray-700/40">
            <TableCell className="pl-10 text-start">5000</TableCell>
            <TableCell>290/kredit</TableCell>
            <TableCell className="border-l">
              {formatRupiah(1450000)}{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell className="border-x">
              {formatRupiah(478500)}/bulan{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
            <TableCell>
              {formatRupiah(4593600)}/tahun{" "}
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-green-400 hover:text-green-500 px-4 h-8 underline"
              >
                Beli
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
