"use client";

import { Header } from "@/components/header";
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
import { TooltipProviderPage } from "@/providers/tooltip-provider-page";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Link,
  PlusCircle,
  Twitter,
  Unlink,
  Youtube,
} from "lucide-react";
import React, { MouseEvent, useState } from "react";
interface FormFieldProps {
  label: string;
  value: string;
}

const AffiliatePage = () => {
  const [formFields, setFormFields] = useState<FormFieldProps[]>([
    { label: "Field 1", value: "" },
  ]);
  const addFormField = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newFormField: FormFieldProps = {
      label: `Field ${formFields.length + 1}`,
      value: "",
    };
    setFormFields([...formFields, newFormField]);
  };

  const removeFormField = (index: number) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].value = value;
    setFormFields(updatedFormFields);
  };
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header
        title="Affiliate Koderesi"
        description="Jadilah partner pemasaran kami!"
      />
      <Card className="flex flex-col text-sm text-center p-4 space-y-6">
        <form className="flex flex-col space-y-8 py-4">
          <div className="flex justify-start border-b border-gray-500 dark:border-gray-300 pb-1">
            <h3 className="text-xl font-semibold">
              Form Pengajuan Affiliate Partner
            </h3>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5>Bagaimana cara anda untuk mempromosikannya?</h5>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="flex justify-between items-center w-full dark:bg-gray-800 dark:hover:bg-gray-700"
                  variant={"outline"}
                >
                  dropdown
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="xl:w-[672px] w-[400px] p-1">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem>blablabla</CommandItem>
                      <CommandItem>busalsa</CommandItem>
                      <CommandItem>bdsaidja</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5>Website yang ingin anda gunakan?</h5>
            <div className="flex flex-col space-y-4">
              {formFields.map((field, index) => (
                <div key={field.label} className="flex space-x-4">
                  {formFields.length <= 1 ? (
                    <div className="w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md">
                      <Link className="w-5 h-5" />
                    </div>
                  ) : (
                    <TooltipProviderPage text="Hapus link">
                      <Button
                        onClick={() => removeFormField(index)}
                        className="w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
                      >
                        <Unlink className="w-5 h-5" />
                      </Button>
                    </TooltipProviderPage>
                  )}
                  <div className="w-full relative">
                    <Input
                      value={field.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-20 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                    />
                    <span className="absolute left-0 top-0 flex h-10 w-[75px] items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                      https://
                    </span>
                  </div>
                </div>
              ))}
              <Button
                onClick={(e) => addFormField(e)}
                className="bg-green-400 hover:bg-green-500 dark:text-gray-900 text-gray-900 w-40"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Tambah URL
              </Button>
            </div>
          </div>
          <div className="space-y-2 w-full max-w-2xl text-start">
            <h5>Sosial media yang anda gunakan?</h5>
            <div className="flex gap-2">
              <Button
                size={"icon"}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Instagram className="w-5 h-5 stroke-1" />
              </Button>
              <Button
                size={"icon"}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Facebook className="w-5 h-5 stroke-1" />
              </Button>
              <Button
                size={"icon"}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Twitter className="w-5 h-5 stroke-1" />
              </Button>
              <Button
                size={"icon"}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Youtube className="w-5 h-5 stroke-1" />
              </Button>
            </div>
          </div>
          <Button className="bg-green-400 hover:bg-green-500 dark:text-gray-900 text-gray-900 w-56">
            Ajukan Affiliate Partner
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AffiliatePage;
