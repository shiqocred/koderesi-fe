"use client";

import { LabelChat } from "@/components/label-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  CircleSlash,
  Edit3,
  MoreHorizontal,
  RefreshCcwDot,
  Tag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface ChatProps {
  type: "chat" | "notif";
  id: string;
  name: string;
  date: string;
  isi?: string;
  isOwner?: boolean;
  isEdited?: boolean;
  status?:
    | "deleted"
    | "reopen"
    | "closeWithoutPlan"
    | "closeWithPlan"
    | "editedLabel";
  addedLabel?: {
    name: string;
    color: string;
  }[];
  deletedLabel?: {
    name: string;
    color: string;
  }[];
  attachment?: string[];
}

export const BubbleChat = ({
  type,
  id,
  name,
  date,
  isi,
  addedLabel,
  deletedLabel,
  isEdited,
  isOwner,
  status,
  attachment,
}: ChatProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();
  const [linkImage, setLinkImage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const handleOpenAttach = (link: string) => {
    setLinkImage(link);
    setImageOpen(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col text-xs md:text-sm py-4 before:w-[1px] before:content-[''] before:absolute before:left-3 md:before:left-5 before:bg-gray-300 before:h-full before:top-0 relative z-0 first:pt-0 before:dark:bg-gray-700 last:pb-8">
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="w-full max-w-3xl p-3 md:p-5">
          <div className="w-full aspect-square rounded-md overflow-hidden relative">
            <Image src={linkImage} alt="" fill className="object-cover" />
          </div>
        </DialogContent>
      </Dialog>
      {type === "chat" ? (
        <div className="w-full z-10 bg-gray-50 dark:bg-black">
          <div
            className={cn(
              "rounded-t-md border px-3 py-1.5 md:px-5 md:py-3 flex items-center justify-between z-10 gap-2 md:gap-4",
              isOwner
                ? "bg-green-50 border-green-300 dark:bg-green-900/40 dark:border-green-700/70"
                : "bg-gray-100 border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            )}
          >
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <h5 className="flex items-center gap-1">
                <span className="font-semibold capitalize">{name}</span>
                <span>membalas pada</span>
                <span>{date}</span>
              </h5>
              <div className="flex items-center gap-2">
                {attachment && attachment.length > 0 && (
                  <Badge className="dark:text-gray-300 text-black font-light text-xs flex items-center gap-1 py-0.5 bg-transparent hover:bg-transparent border border-gray-500 dark:border-gray-300 dark:bg-transparent dark:hover:bg-transparent">
                    {attachment.length ?? 0} Lampiran
                  </Badge>
                )}
                {isEdited && (
                  <Badge className="text-gray-800 dark:text-gray-200 font-light text-xs flex items-center gap-1 py-0.5 bg-black/10 hover:bg-black/10 border border-gray-500 dark:border-gray-300 dark:bg-white/20 dark:hover:bg-white/20">
                    Diedit
                  </Badge>
                )}
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={!isOwner}
                  className="p-0 h-7 w-7 bg-transparent hover:bg-gray-100 text-black dark:text-white hover:dark:bg-gray-900"
                >
                  <MoreHorizontal className="md:h-5 md:w-5 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-40" align="end">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() => onOpen("edit-chat", id)}
                        className="aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </CommandItem>
                      <CommandItem
                        className="text-red-500 aria-selected:text-red-500 dark:text-red-400 aria-selected:dark:text-red-400"
                        onSelect={() => onOpen("delete-chat", id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div
            className={cn(
              "border border-t-0 px-3 md:px-5 py-10 leading-relaxed bg-gray-50 z-10 dark:bg-black ",
              isOwner
                ? "border-green-300 dark:border-green-700/70"
                : "border-gray-300 dark:border-gray-700",
              attachment && attachment.length > 0
                ? " border-b-0 rounded-none"
                : "border-b rounded-b-md"
            )}
          >
            {isi}
          </div>
          {attachment && attachment.length > 0 && (
            <div
              className={cn(
                "rounded-b-md border px-3 md:px-5 py-2 md:py-3 grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 cxl:grid-cols-8 xl:grid-cols-9 z-10 gap-2 md:gap-4",
                isOwner
                  ? "bg-green-50 border-green-300 dark:bg-green-900/40 dark:border-green-700/70"
                  : "bg-gray-100 border-gray-300 dark:bg-gray-900 dark:border-gray-700"
              )}
            >
              {attachment?.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleOpenAttach(item)}
                  className={cn(
                    "w-full aspect-square relative rounded-md overflow-hidden cursor-default lg:cursor-pointer border",
                    !isOwner
                      ? "border-gray-300 dark:border-gray-700"
                      : "border-green-300 dark:border-green-700/70"
                  )}
                >
                  <Image fill src={item} alt="" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex md:items-center items-start gap-2 md:px-1.5">
          {status === "reopen" && (
            <>
              <div className="flex rounded-full md:w-7 md:h-7 w-6 h-6 bg-green-600 items-center justify-center z-10 flex-none">
                <RefreshCcwDot className="md:w-4 md:h-4 w-3 h-3 text-white" />
              </div>
              <div className="flex items-center gap-2 pt-1 md:pt-0">
                <h5 className="flex items-center gap-1 flex-wrap">
                  <span className="font-semibold capitalize">{name}</span>
                  <span>membuka kembali</span>
                  <span>{date}</span>
                </h5>
              </div>
            </>
          )}
          {status === "deleted" && (
            <>
              <div className="flex rounded-full md:w-7 md:h-7 h-6 w-6 bg-red-500 dark:bg-red-700 items-center justify-center z-10">
                <Trash2 className="md:w-4 md:h-4 w-3 h-3 text-white" />
              </div>
              <div className="flex items-center gap-2 pt-1 md:pt-0">
                <h5 className="flex items-center gap-1 flex-wrap">
                  <span className="font-semibold capitalize">{name}</span>
                  <span>menghapus chat</span>
                  <span>{date}</span>
                </h5>
              </div>
            </>
          )}
          {status === "closeWithoutPlan" && (
            <>
              <div className="flex rounded-full md:w-7 md:h-7 w-6 h-6 bg-gray-200 dark:bg-gray-700 items-center justify-center z-10 flex-none">
                <CircleSlash className="md:w-4 md:h-4 w-3 h-3 text-white" />
              </div>
              <div className="flex items-center gap-2 pt-1 md:pt-0">
                <h5 className="flex items-center gap-1 flex-wrap">
                  <span className="font-semibold capitalize">{name}</span>
                  <span>menutup</span>
                  <span className="underline text-gray-500 dark:text-gray-400">
                    tanpa hasil
                  </span>
                  <span>{date}</span>
                </h5>
              </div>
            </>
          )}
          {status === "closeWithPlan" && (
            <>
              <div className="flex rounded-full md:w-7 md:h-7 w-6 h-6 bg-indigo-500 items-center justify-center z-10 flex-none">
                <CheckCircle2 className="md:w-4 md:h-4 w-3 h-3 text-white" />
              </div>
              <div className="flex items-center gap-2 pt-1 md:pt-0">
                <h5 className="flex items-center gap-1 flex-wrap">
                  <span className="font-semibold capitalize">{name}</span>
                  <span>menutup</span>
                  <span className="underline text-gray-500 dark:text-gray-400">
                    dengan hasil
                  </span>
                  <span>{date}</span>
                </h5>
              </div>
            </>
          )}
          {status === "editedLabel" && (
            <>
              <div className="flex rounded-full md:w-7 md:h-7 w-6 h-6 bg-gray-200 dark:bg-gray-700 items-center justify-center z-10 flex-none">
                <Tag className="md:w-4 md:h-4 w-3 h-3 text-green-700 dark:text-green-400" />
              </div>
              <div className="flex items-center gap-1">
                <h5 className="flex items-center gap-1 flex-wrap">
                  <span className="font-semibold capitalize">{name}</span>
                  {addedLabel &&
                    addedLabel.length > 0 &&
                    deletedLabel &&
                    deletedLabel.length > 0 && (
                      <>
                        <span>menambahkan label</span>
                        {addedLabel?.map((item) => (
                          <LabelChat key={item.name} {...item} />
                        ))}
                        <span>dan menghapus label</span>
                        {deletedLabel?.map((item) => (
                          <LabelChat key={item.name} {...item} />
                        ))}
                      </>
                    )}
                  {(!addedLabel || addedLabel.length === 0) &&
                    deletedLabel &&
                    deletedLabel.length > 0 && (
                      <>
                        <span>menghapus label</span>
                        {deletedLabel?.map((item) => (
                          <LabelChat key={item.name} {...item} />
                        ))}
                      </>
                    )}
                  {addedLabel &&
                    addedLabel.length > 0 &&
                    (!deletedLabel || deletedLabel?.length === 0) && (
                      <>
                        <span>menambahkan label</span>
                        {addedLabel?.map((item) => (
                          <LabelChat key={item.name} {...item} />
                        ))}
                      </>
                    )}
                  <span>{date}</span>
                </h5>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
