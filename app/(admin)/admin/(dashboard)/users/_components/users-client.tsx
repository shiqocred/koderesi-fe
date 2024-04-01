import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, MoreHorizontal, Search, UserPlus } from "lucide-react";
import Image from "next/image";

const mapUsers = [
  {
    id: "66074c7cf732095f9b270eb5",
    nama: "Aaliyah Mueller",
    wa: "0693-5385-1670",
    email: "Zakary_Herzog73@example.com",
    tgl: "apr 29 - 16.56",
  },
  {
    id: "66074c7cf732095f9b270eb6",
    nama: "Cindy Toy",
    wa: "0864-9054-7942",
    email: "Enrique_Schamberger53@example.com",
    tgl: "feb 17 - 19.46",
  },
  {
    id: "66074c7cf732095f9b270eb7",
    nama: "Beth Nader",
    wa: "0493-5969-0078",
    email: "Elfrieda_Will76@example.com",
    tgl: "feb 4 - 04.16",
  },
  {
    id: "66074c7cf732095f9b270eb8",
    nama: "Katelin D'Amore",
    wa: "0478-4485-5832",
    email: "Isobel43@example.com",
    tgl: "mar 8 - 01.21",
  },
  {
    id: "66074c7cf732095f9b270eb9",
    nama: "Kimberly Corkery",
    wa: "0807-6384-4762",
    email: "Hoyt87@example.com",
    tgl: "jan 29 - 17.07",
  },
  {
    id: "66074c7cf732095f9b270eba",
    nama: "Lucie Jacobs",
    wa: "0500-6362-6570",
    email: "Edward_Zboncak60@example.com",
    tgl: "jan 27 - 19.06",
  },
  {
    id: "66074c7cf732095f9b270ebb",
    nama: "Modesto Abernathy",
    wa: "0597-9301-4274",
    email: "Van.Ebert@example.com",
    tgl: "jan 12 - 02.52",
  },
  {
    id: "66074c7cf732095f9b270ebc",
    nama: "Juanita Kutch",
    wa: "0503-3471-2596",
    email: "Delta_Trantow17@example.com",
    tgl: "jan 11 - 03.53",
  },
];

export const UsersClient = () => {
  return (
    <Card className="flex flex-col p-4 gap-4">
      <div className="flex gap-4 w-full flex-col lg:flex-row">
        <div className="w-full relative flex items-center">
          <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
          <Input
            className="pl-10 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
            placeholder="Search user name..."
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"}>
              Filter
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <Command>
              <CommandList>
                <CommandGroup>
                  <CommandItem>Filter by name</CommandItem>
                  <CommandItem>Filter by tanggal</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button className="bg-green-400 text-black hover:bg-green-300">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>
      <Card className="p-4 bg-transparent border">
        <div>
          <div className="w-full bg-gray-300 flex justify-center items-center h-14 rounded-sm px-5">
            <p className="text-base font-semibold w-full">Pengguna</p>
            <p className="text-base font-semibold w-[200px] flex-none text-center">
              WhatsApp
            </p>
            <p className="text-base font-semibold w-[150px] text-center flex-none">
              Tanggal
            </p>
            <p className="text-base font-semibold w-[100px] flex-none" />
          </div>
          <ul className="pt-4 space-y-4 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Card className="py-3 px-5 rounded-sm text-sm flex bg-gray-100 justify-between items-center">
                  <div className="w-full">
                    <div className="flex gap-x-2 items-center">
                      <div className="w-12 h-12 overflow-hidden rounded relative">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-base font-semibold">{item.nama}</p>
                        <p className="text-sm font-light lowercase">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[200px] flex-none text-center">
                    {item.wa}
                  </div>
                  <div className="w-[150px] flex-none text-center">
                    {item.tgl}
                  </div>
                  <div className="w-[100px] flex-none flex justify-center">
                    <Button
                      size={"icon"}
                      className="rounded-full"
                      variant={"ghost"}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Card>
  );
};
