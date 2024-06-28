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
import { formatTanggalWaktu } from "@/lib/utils";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserCard = (item: any) => {
  const { onOpen } = useModal();
  return (
    <li className="capitalize" key={item.id}>
      <Card className="p-2 md:p-3 rounded-md text-sm flex bg-transparent dark:bg-transparent border dark:border-gray-600 flex-col group hover:dark:border-gray-400 border-gray-400 hover:border-gray-700">
        <div className="w-full">
          <div className="flex gap-2 md:gap-4 items-center flex-row">
            <div className="w-10 aspect-square md:w-12 md:h-12 overflow-hidden rounded relative flex-none">
              <Image alt="" src={"/avatar.webp"} fill />
            </div>
            <div className="flex flex-col w-full overflow-hidden text-ellipsis">
              <p className="text-base font-semibold">{item.name}</p>
              <p className="md:text-sm font-light lowercase text-ellipsis overflow-hidden w-full text-xs">
                {item.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2 md:pt-4 mt-2 md:mt-4 w-full gap-2 md:gap-4 border-t border-gray-400 group-hover:border-gray-700 dark:border-gray-600 group-hover:dark:border-gray-400">
          <div className="flex justify-between w-full flex-col gap-1 pl-2 border-l-2 border-gray-700 dark:border-gray-500 md:gap-2">
            <div className="w-auto flex-none text-xs">
              {item.phone_number ? (
                item.phone_number
              ) : (
                <p className="italic text-xs text-gray-700 px-2 bg-gray-200 dark:bg-gray-700/80 dark:text-white rounded py-0.5">
                  WhatsApp not yet
                </p>
              )}
            </div>
            <div className="w-auto flex-none text-xs md:text-sm text-gray-500 dark:text-gray-200">
              {item.created_at && formatTanggalWaktu(item.created_at)}
            </div>
          </div>
          <div className="w-auto flex-none flex justify-center ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="p-0 h-8 w-8 lg:w-10 lg:h-10 border-gray-400 dark:border-gray-600 border"
                  variant={"ghost"}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[150px]" align="end">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() => onOpen("edit-user", item.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </CommandItem>
                    </CommandList>
                    <CommandList>
                      <CommandItem
                        className="text-red-400 aria-selected:text-red-500"
                        onSelect={() => onOpen("delete-user", item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default UserCard;
