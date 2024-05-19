"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { formatTanggal } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

export const DatePicker = ({
  value,
  setDate,
}: {
  value: string;
  setDate: Dispatch<SetStateAction<string>>;
}) => {
  const [dateSelect, setDateSelect] = useState<Date>();

  useEffect(() => {
    setDate(
      `${dateSelect?.getFullYear()}-${dateSelect?.getMonth()}-${dateSelect?.getDate()}`
    );
  }, [dateSelect]);

  useEffect(() => {
    setDateSelect(new Date(value));
  }, [value]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
          {/* {dateSelect && formatTanggal(dateSelect?.toString() ?? "")} */}
          <CalendarIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex px-0 py-2 gap-0" align="start">
        <Calendar
          selected={dateSelect}
          initialFocus
          onSelect={setDateSelect}
          mode="single"
        />
      </PopoverContent>
    </Popover>
  );
};
