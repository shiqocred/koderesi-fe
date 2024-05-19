import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React, { ReactNode } from "react";

export const CurrentCard = ({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) => {
  return (
    <Card className="p-3 md:p-4 bg-transparent border h-full flex flex-col justify-between">
      <div>
        <div className="w-full bg-green-200 dark:bg-green-400 text-black flex justify-center items-center h-8 sm:h-auto sm:py-2 rounded-sm">
          <p className="sm:text-lg text-base font-semibold">{label}</p>
        </div>
        <ul className="pt-4 space-y-4 flex flex-col">{children}</ul>
      </div>
      <Link href={href}>
        <Button className="mt-4 rounded-sm w-full bg-green-200 hover:bg-green-300 dark:bg-green-400 dark:hover:bg-green-500 py-1 h-8 text-black">
          Show more
        </Button>
      </Link>
    </Card>
  );
};
