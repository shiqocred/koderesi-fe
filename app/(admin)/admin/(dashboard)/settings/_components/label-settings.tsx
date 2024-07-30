"use client";

import { LabelChat } from "@/components/label-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModal } from "@/hooks/use-modal";
import {
  ArrowUpAZ,
  Edit3,
  MoreHorizontal,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

export const LabelSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-8 bg-transparent border-gray-500 border flex-col lg:flex-row">
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold">Pengaturan Label</h2>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm font-medium">10 Label</p>
          <div className="flex items-center gap-2">
            <Button className="h-6 w-6 md:w-9 md:h-9 rounded-sm p-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white text-black dark:text-white">
              <ArrowUpAZ className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              className="h-6 w-6 md:w-auto md:h-9 rounded-sm p-0 md:px-3 bg-green-400 text-black hover:bg-green-500 text-sm"
              type="button"
              onClick={() => onOpen("add-label")}
            >
              <PlusCircle className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
              Label Baru
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Card className="md:p-5 flex items-center justify-between w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <LabelChat name="contoh" color="#101010" />
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-0 w-5 h-5 bg-transparent hover:bg-gray-100 hover:dark:bg-gray-800 rounded-sm text-black dark:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-0 w-32">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() =>
                          onOpen("edit-label", undefined, undefined, {
                            id: "12",
                            name: "label",
                            color: "#000000",
                          })
                        }
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </CommandItem>
                      <CommandItem
                        className="text-red-500 aria-selected:text-red-500 dark:text-red-400 aria-selected:dark:text-red-400"
                        onSelect={() => onOpen("delete-label", "123")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </Card>
        </div>
      </div>
    </Card>
  );
};
