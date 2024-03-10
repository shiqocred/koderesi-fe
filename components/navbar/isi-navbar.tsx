import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Plus } from "lucide-react";
import { LogoExpandIcon } from "../svg";
import Image from "next/image";

export const IsiNavbar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="p-0 h-8 w-8 rounded" variant={"outline"}>
            <Menu className="h-3 w-3" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>Navbar</SheetContent>
      </Sheet>
      <LogoExpandIcon className="h-6" />
      <Button className="p-0 h-8 w-8 rounded border-gray-900 border relative overflow-hidden">
        <Image src="/avatar.webp" alt="" fill className="object-cover" />
      </Button>
    </>
  );
};
