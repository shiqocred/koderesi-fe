"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  CircleSlash,
  Edit3,
  Images,
  MessageSquare,
  Plus,
  RefreshCcwDot,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BubbleChat, ChatProps } from "./bubble-chat";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";

const chats: ChatProps[] = [
  {
    type: "chat",
    id: "1",
    name: "ali",
    date: "3 hari yang lalu",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio temporibus fuga numquam repellat corrupti adipisci soluta quo dolor veniam non!",
    isOwner: false,
    isEdited: true,
    status: undefined,
    attachment: [
      "https://images.unsplash.com/photo-1718046348910-32ccf22f37bb?q=80&w=3057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "chat",
    id: "2",
    name: "admin",
    date: "3 hari yang lalu",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio temporibus fuga numquam repellat corrupti adipisci soluta quo dolor veniam non!",
    isOwner: true,
    isEdited: false,
    status: undefined,
    attachment: [
      "https://images.unsplash.com/photo-1718115257239-7246f434a7b0?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1718046254386-b909f19b76d7?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "chat",
    id: "22",
    name: "ali",
    date: "3 hari yang lalu",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio temporibus fuga numquam repellat corrupti adipisci soluta quo dolor veniam non!",
    isOwner: false,
    isEdited: false,
    status: undefined,
    attachment: [],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "notif",
    id: "3",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "deleted",
    attachment: [],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "notif",
    id: "4",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "editedLabel",
    attachment: [],
    addedLabel: [
      {
        name: "bug",
        color: "#000000",
      },
    ],
    deletedLabel: [],
  },
  {
    type: "notif",
    id: "5",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "editedLabel",
    attachment: [],
    addedLabel: [
      {
        name: "dsds",
        color: "#ff0000",
      },
    ],
    deletedLabel: [
      {
        name: "bug",
        color: "#000000",
      },
    ],
  },
  {
    type: "notif",
    id: "6",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "reopen",
    attachment: [],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "notif",
    id: "7",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "closeWithoutPlan",
    attachment: [],
    addedLabel: [],
    deletedLabel: [],
  },
  {
    type: "notif",
    id: "8",
    name: "admin",
    date: "3 hari yang lalu",
    isi: undefined,
    isOwner: false,
    isEdited: false,
    status: "closeWithPlan",
    attachment: [],
    addedLabel: [],
    deletedLabel: [],
  },
];

interface ClientContactProps {
  id: string;
  ticket: string;
  user_id: string;
  title: string;
  name: string;
  email: string;
  status: string;
  first_chat: string;
  last_chat: string;
  label_tags: any[];
  support_chat: any[];
}

export const ClientContact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isGetDetail, setIsGetDetail] = useState(false);
  const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
  const [detailTicket, setDetailTicket] = useState<ClientContactProps>();
  const [changeStatus, setChangeStatus] = useState("reopen");
  const { onOpen } = useModal();
  const { ticket } = useParams();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const [input, setInput] = useState<FileList | null>(null);
  const [isExpand, setIsExpand] = useState(false);

  const getDetailContact = async () => {
    try {
      setIsGetDetail(true);
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/support/show/${ticket}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetailTicket(res.data.data);
    } catch (error) {
      console.log("[ERROR_GET_DETAIL_CONTACT]:", error);
    } finally {
      setIsGetDetail(false);
    }
  };
  const updateStatusTicket = async (value: string) => {
    const body = {
      status: value,
    };
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/support/update/${detailTicket?.id}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Status Diperbarui");
      cookies.set("updated", "updated");
    } catch (error) {
      console.log("[ERROR_UPDATE_STATUS_CONTACT]:", error);
    }
  };

  useEffect(() => {
    getDetailContact();
    cookies.remove("updated");
  }, [cookies.get("updated")]);

  useEffect(() => {
    if (detailTicket?.status && detailTicket.status === "opened") {
      setChangeStatus("closeWithPlan");
    }
    if (
      detailTicket?.status &&
      (detailTicket.status === "closeWithPlan" ||
        detailTicket.status === "closeWithoutPlan")
    ) {
      setChangeStatus("reopen");
    }
  }, [detailTicket]);

  useEffect(() => {
    setIsMounted(true);
    getDetailContact();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-6 flex-col w-full max-w-7xl mx-auto">
      <div className="flex flex-col">
        <div className="flex md:justify-between md:items-center gap-2 flex-col-reverse md:flex-row">
          <h1 className="text-xl md:text-3xl text-black dark:text-white flex flex-wrap gap-1">
            <span>{detailTicket?.title}</span>
            <span className="text-gray-500 dark:text-gray-400">
              #{detailTicket?.ticket}
            </span>
            <Badge className="px-2 py-1 bg-green-400 hover:bg-green-400 text-black font-medium flex md:hidden">
              <CircleDot className="w-4 h-4 mr-2" />
              Open
            </Badge>
          </h1>
          <div className="flex items-center gap-2">
            <Button
              className="h-8 text-xs md:text-sm bg-transparent hover:bg-transparent text-black hover:text-black border border-gray-500 hover:border-black hover:underline dark:text-white dark:hover:border-white dark:border-gray-400"
              onClick={() => onOpen("edit-ticket")}
            >
              <Edit3 className="md:w-4 md:h-4 w-3 h-3 mr-1 md:mr-2" />
              Edit
            </Button>
            <Button
              className="h-8 text-xs md:text-sm bg-transparent hover:bg-transparent text-red-500 hover:text-red-600 border border-red-500 hover:border-red-600 hover:underline dark:text-red-500 dark:border-red-400 dark:hover:border-red-500"
              onClick={() => onOpen("delete-ticket")}
            >
              <Trash2 className="md:w-4 md:h-4 w-3 h-3 mr-1 md:mr-2" />
              Hapus
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:hidden mt-4">
          <Separator className="bg-gray-300" />
          <div className="flex items-center gap-2 mt-5">
            <p className="text-sm">Label:</p>
            <Badge className="py-0.5 font-normal bg-yellow-400 text-black">
              bug
            </Badge>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-300" />
      <div className="flex w-full h-full gap-6 flex-col md:flex-row">
        <div className="w-full">
          <div className="border-b-2 pb-8 flex flex-col border-gray-300 dark:border-gray-700">
            <div className="border rounded-md p-3 gap-4 flex flex-col border-gray-300">
              <div className="font-semibold flex items-center">
                <div className="flex h-9 w-9 rounded-full border justify-center items-center mr-2 border-black dark:border-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                Balas Percakapan
              </div>
              <Textarea className="bg-transparent border-gray-300" cols={4} />
              {input && input.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between items-center">
                    <Label className="text-gray-700 dark:text-white text-sm">
                      Lampiran
                    </Label>
                    <Button
                      type="button"
                      onClick={() => setInput(null)}
                      className="p-0 h-auto text-red-400 bg-transparent text-xs hover:bg-transparent"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Hapus
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 w-full p-3 border rounded-lg border-gray-300 dark:text-white gap-3">
                    {input &&
                      Array.from({ length: input.length ?? 0 }, (_, i) => (
                        <div
                          key={i}
                          className="w-full aspect-square relative rounded-md overflow-hidden border border-gray-300 dark:text-white"
                        >
                          <Image
                            alt=""
                            src={input ? URL.createObjectURL(input[i]) : ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="flex w-full justify-between ">
                <div>
                  <Label className="h-9 px-5 bg-transparent hover:bg-gray-100 text-black border gap-2 border-gray-300 hover:border-gray-300 dark:text-white dark:hover:bg-gray-900 relative flex items-center justify-center rounded-md cursor-pointer dark:border-gray-300 dark:hover:border-gray-300 transition-all">
                    <Images className="w-4 h-4" />
                    Tambah Lampiran
                    <Input
                      type="file"
                      multiple
                      className="absolute top-0 left-0 w-full h-full hidden"
                      onChange={(e) => setInput(e.target.files)}
                    />
                  </Label>
                </div>
                <Button className="h-9">Kirim</Button>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "relative overflow-hidden",
              isExpand
                ? "h-auto md:h-auto pb-[10vh] md:pb-0"
                : "h-screen md:h-auto pb-0 md:pb-0"
            )}
          >
            <div className="relative h-full">
              {chats.map((item) => (
                <BubbleChat key={item.id} {...item} />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-b from-gray-50/0 via-gray-50/80 to-gray-50 dark:from-black/0 dark:via-black/80 dark:to-black flex items-center justify-center md:hidden">
              <Button
                type="button"
                onClick={() => setIsExpand(!isExpand)}
                className="bg-white hover:bg-gray-100 border border-black dark:bg-black dark:border-white text-black dark:text-white"
              >
                {isExpand ? "Collapse" : "Expand"}
              </Button>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 w-full md:flex-none md:relative">
          <div className="md:sticky md:top-20 lg:top-10 w-full flex flex-col-reverse md:flex-col gap-4 text-xs">
            <div className="flex flex-col gap-4">
              <Separator className="md:hidden" />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Dibuka oleh</h5>
                <p>{detailTicket?.name}</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Label</h5>
                <div className="flex justify-between w-full items-center">
                  <p>Tidak ada</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="p-0.5 border bg-transparent hover:bg-transparent border-black/30 hover:border-black dark:border-white/40 dark:hover:border-white text-black dark:text-white h-auto rounded-sm">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-0 w-40">
                      <Command>
                        <CommandGroup>
                          <CommandList>
                            <CommandItem className="pr-10 flex items-center">
                              <span className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                              <span>item</span>
                            </CommandItem>
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Dibuka pada</h5>
                <p>{detailTicket?.first_chat}</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Total chat</h5>
                <p>5 chat</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Total lampiran</h5>
                <p>3 lampiran</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-1.5 capitalize">
                <h5 className="font-semibold text-gray-500">Chat terakhir</h5>
                <p>{detailTicket?.last_chat}</p>
              </div>
              <Separator className="md:flex hidden" />
              <div className="md:flex flex-col gap-1.5 hidden">
                <h5 className="font-semibold text-gray-500">Status</h5>
                <div className="flex items-center gap-2">
                  {detailTicket?.status === "opened" && (
                    <Badge className="px-2 py-1 bg-green-400 hover:bg-green-400 text-black font-medium">
                      <CircleDot className="w-4 h-4 mr-2" />
                      Open
                    </Badge>
                  )}
                  {detailTicket?.status === "closeWithoutPlan" && (
                    <Badge className="px-2 py-1 bg-gray-300 hover:bg-gray-300 text-black font-medium">
                      <CircleSlash className="w-4 h-4 mr-2" />
                      Close
                    </Badge>
                  )}
                  {detailTicket?.status === "closeWithPlan" && (
                    <Badge className="px-2 py-1 bg-indigo-600 hover:bg-indigo-600 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Solve
                    </Badge>
                  )}
                </div>
              </div>
              <Separator className="hidden md:flex" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                {changeStatus === "closeWithPlan" && (
                  <Button
                    type="button"
                    onClick={() => updateStatusTicket("closeWithPlan")}
                    className="rounded-r-none h-9 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" />
                    Close Ticket
                  </Button>
                )}
                {changeStatus === "closeWithoutPlan" && (
                  <Button
                    type="button"
                    onClick={() => updateStatusTicket("closeWithoutPlan")}
                    className="rounded-r-none h-9 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-900 dark:text-white text-black border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <CircleSlash className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-300" />
                    Close Ticket
                  </Button>
                )}
                {changeStatus === "reopen" && (
                  <Button
                    type="button"
                    onClick={() => updateStatusTicket("opened")}
                    className="rounded-r-none h-9 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-900 dark:text-white text-black border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <RefreshCcwDot className="w-4 h-4 mr-2 text-green-700 dark:text-green-400" />
                    Buka Kembali
                  </Button>
                )}
                <Popover
                  onOpenChange={setIsChangeStatusOpen}
                  open={isChangeStatusOpen}
                >
                  <PopoverTrigger asChild>
                    <Button className="rounded-l-none h-9 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-black border border-gray-300 w-9 flex-none p-0 border-l-0 hover:bg-gray-200 dark:hover:bg-gray-800">
                      <ChevronDown className="w-4 h-4 dark:text-white" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="p-0">
                    <Command>
                      <CommandGroup>
                        <CommandList>
                          {detailTicket?.status !== "opened" && (
                            <CommandItem
                              onSelect={() => {
                                setChangeStatus("reopen");
                                setIsChangeStatusOpen(false);
                              }}
                              className="items-start"
                            >
                              <Check
                                className={cn(
                                  "w-4 h-4 mr-2",
                                  changeStatus === "reopen"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div className="flex items-center font-semibold">
                                <RefreshCcwDot className="w-4 h-4 mr-2 text-green-700 dark:text-green-400" />
                                Buka Kembali
                              </div>
                            </CommandItem>
                          )}
                          {detailTicket?.status !== "closeWithPlan" && (
                            <CommandItem
                              onSelect={() => {
                                setChangeStatus("closeWithPlan");
                                setIsChangeStatusOpen(false);
                              }}
                              className="items-start"
                            >
                              <Check
                                className={cn(
                                  "w-4 h-4 mr-2",
                                  changeStatus === "closeWithPlan"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div>
                                <div className="flex items-center font-semibold">
                                  <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" />
                                  Close Ticket
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                                  Percakapan selesai dengan hasil
                                </p>
                              </div>
                            </CommandItem>
                          )}
                          {detailTicket?.status !== "closeWithoutPlan" && (
                            <CommandItem
                              onSelect={() => {
                                setChangeStatus("closeWithoutPlan");
                                setIsChangeStatusOpen(false);
                              }}
                              className="items-start"
                            >
                              <Check
                                className={cn(
                                  "w-4 h-4 mr-2",
                                  changeStatus === "closeWithoutPlan"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div>
                                <div className="flex items-center font-semibold">
                                  <CircleSlash className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-300" />
                                  Close Ticket
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                                  Percakapan selesai tanpa hasil
                                </p>
                              </div>
                            </CommandItem>
                          )}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
