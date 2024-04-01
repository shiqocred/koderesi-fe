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
    <Card className="p-4 bg-transparent border">
      <div>
        <div className="w-full bg-green-200 flex justify-center items-center py-2 rounded-sm">
          <p className="sm:text-lg text-base font-semibold">{label}</p>
        </div>
        <ul className="pt-4 space-y-4 flex flex-col">{children}</ul>
        <Link href={href}>
          <Button className="mt-4 rounded-sm w-full bg-green-200 hover:bg-green-300 text-black">
            Show more
          </Button>
        </Link>
      </div>
    </Card>
  );
};
