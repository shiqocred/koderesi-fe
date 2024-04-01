"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ArchiveDataProps, archives, cn, data } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ArrowLeft, ChevronDown, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditClient = () => {
  const { trackId } = useParams();
  const [dataDetail, setDataDetail] = useState<ArchiveDataProps | undefined>();

  useEffect(() => {
    const dataArchive = archives.find((item) => item.id === trackId);
    if (dataArchive !== undefined) setDataDetail(dataArchive);
    const dataResi = data.find((item) => item.id === trackId);
    if (dataResi !== undefined) setDataDetail(dataResi);
  }, [trackId]);
  return (
    <>
      <div className="flex justify-between pb-4 border-b items-end md:items-center">
        <div className="flex items-center">
          <Link href={`/admin/tracks/${trackId}`}>
            <Button size={"icon"} variant={"ghost"} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <p className="text-sm md:text-base mb-4 md:mb-0">Edit Resi</p>
            <div className="flex sm:gap-4 sm:items-center flex-col sm:flex-row items-start">
              <h2 className="text-2xl md:text-4xl font-bold">
                {dataDetail?.kode_resi}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant={"destructive"}
            className="w-8 h-8 md:h-10 md:w-auto p-0 md:px-4 md:py-2"
          >
            <Trash2 className="w-4 h-4 md:mr-2" />
            <p className="hidden md:flex">Hapus</p>
          </Button>
        </div>
      </div>
      <Card className="p-4 flex flex-col w-full gap-6 h-full">
        <div className="flex items-center bg-gray-200 w-full py-2 px-3 rounded-md gap-x-4">
          <div className="w-10 h-10 relative overflow-hidden rounded">
            <Image src={"/avatar.webp"} fill alt="" />
          </div>
          <div className="font-semibold">
            Ahmad Fulan / {dataDetail?.keterangan}
          </div>
        </div>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full border-r pr-6 mr-6 border-gray-900">
            <h3 className="font-semibold mb-2">Data Resi</h3>
            <Accordion type="multiple" className="w-full gap-y-4 flex flex-col">
              <AccordionItem
                value="pengirim"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-2">Pengirim</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Nama</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Alamat</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Kota</Label>
                    <Input />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="penerima"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-2">Penerima</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Nama</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Alamat</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Kota</Label>
                    <Input />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="status" className="border px-3 rounded-md">
                <AccordionTrigger className="px-2">Status</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Status resi</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="justify-between">
                          status
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-1">
                        <Command>
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                <CommandItem>on progress</CommandItem>
                                <CommandItem>delivered</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Nama penerima</Label>
                    <Input />
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Tanggal</Label>
                      <Input />
                    </div>
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Waktu</Label>
                      <Input />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end gap-x-2 mt-4">
              <Button className="bg-green-400 hover:bg-green-500 text-black">
                Simpan
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="font-semibold mb-2">Timeline Manifest</h3>
            <Accordion
              type="single"
              collapsible
              className="w-full gap-y-4 flex flex-col"
            >
              <AccordionItem
                value="manifest #1"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-2">
                  Manifest #1
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Manifest</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Kota</Label>
                    <Input />
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Tanggal</Label>
                      <Input />
                    </div>
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Waktu</Label>
                      <Input />
                    </div>
                  </div>
                  <div className="flex justify-end gap-x-2">
                    <Button variant={"destructive"}>Hapus</Button>
                    <Button className="bg-green-400 hover:bg-green-300 text-black">
                      Simpan
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="manifest #2"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-2">
                  Manifest #2
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Manifest</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Kota</Label>
                    <Input />
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Tanggal</Label>
                      <Input />
                    </div>
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Waktu</Label>
                      <Input />
                    </div>
                  </div>
                  <div className="flex justify-end gap-x-2">
                    <Button variant={"destructive"}>Hapus</Button>
                    <Button className="bg-green-400 hover:bg-green-300 text-black">
                      Simpan
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="manifest #3"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-2">
                  Manifest #3
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Manifest</Label>
                    <Input />
                  </div>
                  <div className="px-2 flex flex-col gap-y-2">
                    <Label>Kota</Label>
                    <Input />
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Tanggal</Label>
                      <Input />
                    </div>
                    <div className="px-2 flex flex-col gap-y-2 w-full">
                      <Label>Waktu</Label>
                      <Input />
                    </div>
                  </div>
                  <div className="flex justify-end gap-x-2">
                    <Button variant={"destructive"}>Hapus</Button>
                    <Button className="bg-green-400 hover:bg-green-300 text-black">
                      Simpan
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Card>
    </>
  );
};

export default EditClient;
