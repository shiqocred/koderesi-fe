"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CurrentCard } from "./current-card";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { NewUserProps } from "../page";
import { formatTanggalWaktu } from "@/lib/utils";

export const UserCurrentCard = ({
  data,
  href,
  label,
}: {
  data: NewUserProps[];
  href: string;
  label: string;
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <CurrentCard label={label} href={href}>
      {data.map((item) => (
        <li className="capitalize w-full" key={item.id}>
          <Card className="md:py-2 md:px-5 p-2 min-h-16 w-full rounded-sm text-sm flex justify-between items-center bg-white md:gap-4">
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-4 mb-2">
                <div className="overflow-hidden w-9 h-9 relative rounded flex-none">
                  <Image
                    src={"/avatar.webp"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs lowercase flex gap-1 md:items-center flex-col md:flex-row">
                    {item.email}
                  </div>
                </div>
              </div>
              <div className="flex border-t pt-2 justify-between items-center text-sm">
                <p className="">
                  {item.phone_number ? (
                    item.phone_number
                  ) : (
                    <p className="italic text-xs text-gray-700 px-2 bg-gray-200 rounded py-0.5">
                      WhatsApp not yet
                    </p>
                  )}
                </p>
                <p className="flex md:text-sm items-end text-xs">
                  {item.created_at && formatTanggalWaktu(item.created_at)}
                </p>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </CurrentCard>
  );
};
