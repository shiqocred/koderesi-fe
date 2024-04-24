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
    <Card className="flex flex-col p-4 gap-2 md:gap-4">
      <div className="flex gap-2 md:gap-4 w-full flex-col lg:flex-row">
        <div className="w-full relative flex items-center">
          <Search className="w-5 h-5 peer absolute left-3 text-gray-500" />
          <Input
            className="pl-10 flex-1 peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
            placeholder="Search user name..."
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-between lg:w-auto"
            >
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
          <div className="w-full bg-gray-300 lg:flex justify-center items-center h-14 rounded-sm px-5 hidden">
            <p className="text-base font-semibold w-full">Pengguna</p>
            <p className="text-base font-semibold w-[200px] flex-none text-center">
              WhatsApp
            </p>
            <p className="text-base font-semibold w-[150px] text-center flex-none">
              Tanggal
            </p>
            <p className="text-base font-semibold w-[100px] flex-none" />
          </div>
          <ul className="lg:pt-4 space-y-4 flex flex-col">
            {mapUsers.map((item) => (
              <li className="capitalize" key={item.id}>
                <Card className="lg:py-3 lg:px-5 md:py-2 py-3 px-3 rounded-md md:rounded-sm text-sm flex bg-gray-100 md:justify-between md:items-center flex-col md:flex-row items-start">
                  <div className="w-full">
                    <div className="flex gap-2 items-center flex-col md:flex-row">
                      <div className="w-full aspect-square md:w-12 md:h-12 overflow-hidden rounded relative flex-none">
                        <Image alt="" src={"/avatar.webp"} fill />
                      </div>
                      <div className="flex flex-col w-full items-center md:items-start">
                        <p className="text-base font-semibold">{item.nama}</p>
                        <p className="md:text-sm font-light lowercase text-ellipsis text-center md:text-start overflow-hidden w-full text-xs">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center mt-1 md:mt-0 md:ml-2 lg:ml-0 w-full md:w-[300px] lg:w-auto gap-1">
                    <div className="w-auto lg:w-[200px] flex-none text-center">
                      {item.wa}
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <div className="w-auto lg:w-[150px] flex-none text-center text-xs md:text-sm px-3 py-0.5 bg-gray-200 lg:bg-transparent lg:p-0 rounded-md">
                        {item.tgl}
                      </div>
                      <div className="w-auto lg:w-[100px] flex-none flex justify-center">
                        <Button
                          className="rounded-full p-0 h-auto lg:w-10 lg:h-10"
                          variant={"ghost"}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
