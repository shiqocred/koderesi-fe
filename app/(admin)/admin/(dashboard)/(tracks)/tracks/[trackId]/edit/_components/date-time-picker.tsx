"use client";

import React, { useEffect, useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { cn, formatTanggal } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export const DateTimePicker = ({
  value,
  setDateManifest,
}: {
  value: string;
  setDateManifest: (d: string) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [jam, setJam] = useState("00");
  const [menit, setMenit] = useState("00");
  const [detik, setDetik] = useState("00");
  const [isOpenDate, setIsOpenDate] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const triggerDate = selectedDate
    ? formatTanggal(
        selectedDate ? selectedDate.toString() : new Date().toString()
      )
    : "";
  const triggerTime = `${jam}:${menit}:${detik}`;

  const formatTimePartial = () => {
    const current = new Date(value);
    setSelectedDate(current);
    setJam(current.getHours().toString().padStart(2, "0"));
    setMenit(current.getMinutes().toString().padStart(2, "0"));
    setDetik(current.getSeconds().toString().padStart(2, "0"));
  };

  useEffect(() => {
    setDateManifest(
      !isNaN(
        new Date(
          `${selectedDate?.getFullYear()}-${
            selectedDate?.getMonth() ?? 0 + 1
          }-${selectedDate?.getDate()} ${triggerTime}`
        ).getTime()
      )
        ? format(
            new Date(
              `${selectedDate?.getFullYear()}-${
                (selectedDate?.getMonth() ?? 0) + 1
              }-${selectedDate?.getDate()} ${triggerTime}`
            ),
            "yyyy-MM-dd HH:mm:ss"
          )
        : value
    );
  }, [selectedDate, jam, menit, detik, triggerTime, value]);

  useEffect(() => {
    formatTimePartial();
  }, [value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <div className="px-1 md:px-2 flex gap-2 md:gap-4 w-full md:flex-row flex-col">
      <div className="flex flex-col gap-y-2 w-full">
        <Label>Tanggal</Label>

        {isDesktop ? (
          <Popover open={isOpenDate} onOpenChange={setIsOpenDate}>
            <PopoverTrigger asChild>
              <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
                {triggerDate}
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex px-0 py-2 gap-0" align="start">
              <Calendar
                selected={selectedDate}
                initialFocus
                onSelect={setSelectedDate}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer open={isOpenDate} onOpenChange={setIsOpenDate}>
            <DrawerTrigger asChild>
              <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
                {triggerDate}
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex justify-center px-0 py-2 gap-0">
              <Calendar
                className="w-[290px] mx-auto"
                // classNames={{
                //   month:
                //     "flex space-y-0 gap-y-4 flex-col items-center justify-center",
                // }}
                selected={selectedDate}
                initialFocus
                onSelect={setSelectedDate}
                mode="single"
              />
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        <Label>Waktu</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
              {triggerTime}
              <Clock className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex px-0 py-2 gap-0 w-[216px]"
            align="start"
          >
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
                        onSelect={() =>
                          setJam(index.toString().padStart(2, "0"))
                        }
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
                        onSelect={() =>
                          setMenit(index.toString().padStart(2, "0"))
                        }
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
                        onSelect={() =>
                          setDetik(index.toString().padStart(2, "0"))
                        }
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
      </div>
    </div>
  );
};
