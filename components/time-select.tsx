"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { AlarmClock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const TimeSelect = ({
  value,
  setHour,
}: {
  value: string;
  setHour: Dispatch<SetStateAction<string>>;
}) => {
  const [jam, setJam] = useState("00");
  const [menit, setMenit] = useState("00");
  const [detik, setDetik] = useState("00");

  const trigger = `${jam} : ${menit} : ${detik}`;

  const formatTimePartial = () => {
    const current = new Date(value);
    setJam(current.getHours().toString().padStart(2, "0"));
    setMenit(current.getMinutes().toString().padStart(2, "0"));
    setDetik(current.getSeconds().toString().padStart(2, "0"));
  };

  useEffect(() => {
    setHour(`${jam}:${menit}:${detik}`);
  }, [jam, menit, detik]);

  useEffect(() => {
    formatTimePartial();
  }, [value]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
          {trigger}
          <Clock className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex px-0 py-2 gap-0 w-[216px]" align="start">
        <ScrollArea className="h-56">
          <Command>
            <CommandGroup>
              <CommandList className="w-16 px-2">
                {Array.from({ length: 24 }, (_, index) => (
                  <CommandItem
                    className={cn(
                      "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                      parseFloat(jam) === index
                        ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                        : ""
                    )}
                    key={index}
                    onSelect={() => setJam(index.toString().padStart(2, "0"))}
                    value={index.toString()}
                  >
                    {index.toString().padStart(2, "0")}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </ScrollArea>
        <ScrollArea className="h-56">
          <Command>
            <CommandGroup>
              <CommandList className="w-16 px-2">
                {Array.from({ length: 60 }, (_, index) => (
                  <CommandItem
                    className={cn(
                      "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                      parseFloat(menit) === index
                        ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                        : ""
                    )}
                    key={index}
                    onSelect={() => setMenit(index.toString().padStart(2, "0"))}
                    value={index.toString()}
                  >
                    {index.toString().padStart(2, "0")}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </ScrollArea>
        <ScrollArea className="h-56">
          <Command>
            <CommandGroup>
              <CommandList className="w-16 px-2">
                {Array.from({ length: 60 }, (_, index) => (
                  <CommandItem
                    className={cn(
                      "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                      parseFloat(detik) === index
                        ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                        : ""
                    )}
                    key={index}
                    onSelect={() => setDetik(index.toString().padStart(2, "0"))}
                    value={index.toString()}
                  >
                    {index.toString().padStart(2, "0")}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
