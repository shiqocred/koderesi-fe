"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent } from "@/components/ui/popover";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { PopoverTrigger } from "@radix-ui/react-popover";
import React, { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarIcon,
  Check,
  ChevronDown,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { cn, formatTanggal } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import { DetailProps } from "../../components/detail-client";
import { DateTimePicker } from "./date-time-picker";
import { format } from "date-fns";

const EditClient = () => {
  const { trackId } = useParams();
  const [dataDetail, setDataDetail] = useState<DetailProps>({
    id: "",
    waybill: "",
    title: "",
    courier: "",
    shipper: "",
    receiver: "",
    origin_address: "",
    destination_address: "",
    status: "",
    display_status: "",
    user: {
      id: "",
      name: "",
    },
    status_loop: "",
    created_at: "",
    updated_at: "",
    manifests: [
      {
        id: "",
        note: "",
        status: "",
        user_id: "",
        waybill_id: "",
        date_manifest: "",
        created_at: "",
        updated_at: "",
      },
    ],
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isUpdatingManifest, setIsUpdatingManifest] = useState<boolean>(true);
  const { onOpen } = useModal();
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const getResiDetail = async () => {
    setIsUpdating(true);
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/waybill/show/${trackId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataDetail(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_DETAIL_RESI]:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleUpdateData = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      waybill: dataDetail.waybill,
      courier: dataDetail.courier,
      shipper: dataDetail.shipper,
      receiver: dataDetail.receiver,
      origin_address: dataDetail.origin_address,
      destination_address: dataDetail.destination_address,
      status: dataDetail.status,
      title: dataDetail.title,
      status_loop: dataDetail.status_loop,
    };

    setIsUpdatingManifest(true);
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/waybill/update/${trackId}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Data Resi Diperbarui");
      cookies.set("new", "1");
    } catch (error: any) {
      console.log("[ERROR_UPDATE_DETAIL_RESI]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Data Resi gagal diperbarui.
                </h5>
                {error.response.data.error && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.error}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    } finally {
      setIsUpdatingManifest(false);
    }
  };

  const handleUpdateManifest = async (e: FormEvent, i: number, id: string) => {
    e.preventDefault();
    const data = {
      note: dataDetail.manifests[i].note,
      date_manifest: dataDetail.manifests[i].date_manifest,
    };
    setIsUpdatingManifest(true);
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/manifest/update/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsUpdatingManifest(true);
      toast.success("Manifest Resi Diperbarui");
      cookies.set("new", "1");
    } catch (error: any) {
      console.log("[ERROR_UPDATE_MANIFEST_RESI]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Manifest resi gagal diperbarui.
                </h5>
                {error.response.data.message && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.message}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    } finally {
      setIsUpdatingManifest(false);
    }
  };

  const handleChangeDateManifest = (index: number, dateFormated: string) => {
    setDataDetail((prevData) => {
      const newManifests = [...prevData.manifests];
      newManifests[index] = {
        ...newManifests[index],
        date_manifest: dateFormated,
      };

      return {
        ...prevData,
        manifests: newManifests,
      };
    });
  };

  useEffect(() => {
    setIsUpdating(true);
    if (cookies.get("new")) {
      getResiDetail();
    }
  }, [cookies.get("new")]);

  useEffect(() => {
    getResiDetail();
  }, []);
  return (
    <div>
      <div className="flex justify-between pb-4 border-b items-end md:items-center">
        <div className="flex items-center">
          <Link href={`/admin/tracks/${trackId}`} className="hidden md:flex">
            <Button size={"icon"} variant={"ghost"} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex">
              <Link
                href={`/admin/tracks/${trackId}`}
                className="md:hidden flex"
              >
                <Button variant={"ghost"} className="mr-2 p-0 h-auto">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm md:text-base">Edit Resi</p>
            </div>
            <div className="flex sm:gap-4 sm:items-center flex-col sm:flex-row items-start">
              <h2 className="text-2xl md:text-4xl font-bold">
                {dataDetail?.waybill}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant={"destructive"}
            className="w-8 h-8 md:h-10 md:w-auto p-0 md:px-4 md:py-2"
            onClick={(e) => {
              e.preventDefault();
              onOpen("delete-resi", dataDetail.id);
            }}
            disabled={!dataDetail.id || dataDetail.id === ""}
          >
            <Trash2 className="w-4 h-4 md:mr-2" />
            <p className="hidden md:flex">Hapus</p>
          </Button>
        </div>
      </div>
      <Card className="p-4 flex flex-col w-full gap-6 h-full relative">
        {isUpdating && (
          <div className="w-full h-full flex justify-center items-center bg-gray-700/40 absolute top-0 left-0 z-10 rounded-md backdrop-blur-sm">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}
        <div className="flex items-center bg-gray-200 dark:bg-gray-800 w-full py-2 px-3 rounded-md gap-x-4">
          <div className="w-10 h-10 relative overflow-hidden rounded">
            <Image src={"/avatar.webp"} fill alt="" />
          </div>
          <div className="font-semibold flex flex-col md:flex-row md:gap-2">
            <p className="text-xs font-normal md:text-base md:font-semibold">
              {dataDetail?.user?.name}
            </p>
            <p className="hidden md:flex">/</p>
            <p className="capitalize">{dataDetail?.title}</p>
          </div>
        </div>
        <div className="flex w-full h-full flex-col lg:flex-row">
          <form
            onSubmit={handleUpdateData}
            className="flex flex-col w-full border-b pb-4 mb-4 lg:mb-0 lg:pb-0 lg:border-r lg:border-b-0 lg:pr-6 mr-6 border-gray-400 dark:border-gray-300/40"
          >
            <h3 className="font-semibold mb-2">Data Resi</h3>
            <Accordion
              type="multiple"
              className="w-full gap-2 md:gap-4 flex flex-col"
            >
              <AccordionItem value="status" className="border px-3 rounded-md">
                <AccordionTrigger className="px-1 md:px-2 py-3 md:py-4">
                  Informasi
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 md:gap-4 pt-2">
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Kode Resi</Label>
                    <Input
                      value={dataDetail.waybill}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          waybill: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Judul</Label>
                    <Input
                      value={dataDetail.title}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Kurir</Label>
                    <Input
                      value={dataDetail.courier}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          courier: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Status resi</Label>
                    <Popover onOpenChange={setIsStatusOpen} open={isStatusOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="justify-between bg-transparent dark:bg-transparent capitalize"
                        >
                          {dataDetail.status}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-1">
                        <Command>
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                <CommandItem
                                  onSelect={() => {
                                    setDataDetail((prev) => ({
                                      ...prev,
                                      status: "on-progress",
                                    }));
                                    setIsStatusOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "w-4 h-4 mr-2",
                                      dataDetail.status === "on-progress"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  On Progress
                                </CommandItem>
                                <CommandItem
                                  onSelect={() => {
                                    setDataDetail((prev) => ({
                                      ...prev,
                                      status: "delivered",
                                    }));
                                    setIsStatusOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "w-4 h-4 mr-2",
                                      dataDetail.status === "delivered"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Delivered
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="pengirim"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-1 md:px-2 py-3 md:py-4">
                  Pengirim
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 md:gap-4 pt-2">
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Nama</Label>
                    <Input
                      value={dataDetail.shipper}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          origin: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Alamat</Label>
                    <Textarea
                      className="bg-transparent dark:bg-transparent"
                      value={dataDetail.origin_address}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          origin_address: e.target.value,
                        }))
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="penerima"
                className="border px-3 rounded-md"
              >
                <AccordionTrigger className="px-1 md:px-2 py-3 md:py-4">
                  Penerima
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 md:gap-4 pt-2">
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Nama</Label>
                    <Input
                      value={dataDetail.receiver}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          receiver: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="px-1 md:px-2 flex flex-col gap-y-2">
                    <Label>Alamat</Label>
                    <Textarea
                      className="bg-transparent dark:bg-transparent"
                      value={dataDetail.destination_address}
                      onChange={(e) =>
                        setDataDetail((prev) => ({
                          ...prev,
                          destination_address: e.target.value,
                        }))
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end gap-x-2 mt-4">
              <Button
                type="submit"
                className="bg-green-400 hover:bg-green-500 text-black"
              >
                Simpan
              </Button>
            </div>
          </form>
          <div className="flex flex-col w-full">
            <h3 className="font-semibold mb-2">Timeline Manifest</h3>
            <Accordion
              type="single"
              collapsible
              className="w-full gap-2 md:gap-4 flex flex-col"
            >
              {dataDetail.manifests.map((item, index) => (
                <AccordionItem
                  value={`manifest #${index + 1}`}
                  className="border px-3 rounded-md"
                  key={item.id}
                >
                  <AccordionTrigger className="px-1 md:px-2 py-3 md:py-4">
                    Manifest #{index + 1}
                  </AccordionTrigger>
                  <AccordionContent>
                    <form
                      onSubmit={(e) => handleUpdateManifest(e, index, item.id)}
                      className="flex flex-col gap-2 md:gap-4 pt-2"
                    >
                      <div className="px-1 md:px-2 flex flex-col gap-y-2">
                        <Label>Manifest</Label>
                        <Input
                          value={dataDetail.manifests[index].note}
                          onChange={(e) =>
                            setDataDetail((prevData) => {
                              const newManifests = [...prevData.manifests];
                              newManifests[index] = {
                                ...newManifests[index],
                                note: e.target.value,
                              };

                              return {
                                ...prevData,
                                manifests: newManifests,
                              };
                            })
                          }
                        />
                      </div>
                      <DateTimePicker
                        value={item.date_manifest}
                        setDateManifest={(e) =>
                          handleChangeDateManifest(index, e)
                        }
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            onOpen("delete-manifest", item.id);
                          }}
                          type="button"
                          variant={"destructive"}
                        >
                          Hapus
                        </Button>
                        <Button
                          type="submit"
                          className="bg-green-400 hover:bg-green-300 text-black"
                        >
                          Simpan
                        </Button>
                      </div>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditClient;
