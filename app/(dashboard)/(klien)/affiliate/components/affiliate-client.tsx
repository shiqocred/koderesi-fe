"use client";

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

export const AffiliateClient = () => {
  const [formFields, setFormFields] = useState<FormFieldProps[]>([
    { label: "Field 1", value: "" },
  ]);
  const [isInstagram, setIsInstagram] = useState<boolean>(false);
  const [isFacebook, setIsFacebook] = useState<boolean>(false);
  const [isTwitter, setIsTwitter] = useState<boolean>(false);
  const [isYoutube, setIsYoutube] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [dropdown, setDropdown] = useState<string>("Pilih opsi...");
  const [socialLink, setSocialLink] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
  });

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
    <Card className="flex flex-col text-sm text-center p-4 space-y-6">
      <form className="flex flex-col space-y-8 py-4">
        <div className="flex justify-start border-b border-gray-500 dark:border-gray-300 pb-1">
          <h3 className="text-xl font-semibold">
            Form Pengajuan Affiliate Partner
          </h3>
        </div>
        <div className="space-y-2 w-full max-w-2xl text-start">
          <h5 className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Bagaimana cara anda untuk mempromosikannya?
          </h5>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                className="flex justify-between items-center w-full dark:bg-gray-800 dark:hover:bg-gray-700"
                variant={"outline"}
              >
                {dropdown}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="xl:w-[672px] w-[400px] p-1">
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setDropdown("blablabla");
                        setIsOpen(false);
                      }}
                    >
                      blablabla
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setDropdown("busalsa");
                        setIsOpen(false);
                      }}
                    >
                      busalsa
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setDropdown("bdsaidja");
                        setIsOpen(false);
                      }}
                    >
                      bdsaidja
                    </CommandItem>
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
                      className="w-10 h-10 flex-none flex justify-center items-center bg-red-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-red-500"
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
              className="bg-transparent hover:bg-green-100 border border-dashed border-green-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white w-40"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah URL
            </Button>
          </div>
        </div>
        <div className="space-y-2 w-full max-w-2xl text-start">
          <h5>Sosial media yang anda gunakan?</h5>
          <div className="flex flex-col gap-2">
            {isInstagram && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsInstagram(!isInstagram)}
                  className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                >
                  <Instagram className="w-5 h-5 group-hover:hidden stroke-1" />
                  <Unlink className="w-5 h-5 group-hover:flex hidden" />
                </Button>
                <div className="w-full relative">
                  <Input
                    value={socialLink.instagram}
                    onChange={(e) =>
                      setSocialLink((prev) => ({
                        ...prev,
                        instagram: e.target.value,
                      }))
                    }
                    className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                  />
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                    @
                  </span>
                </div>
              </div>
            )}
            {isFacebook && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsFacebook(!isFacebook)}
                  className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                >
                  <Facebook className="w-5 h-5 group-hover:hidden stroke-1" />
                  <Unlink className="w-5 h-5 group-hover:flex hidden" />
                </Button>
                <div className="w-full relative">
                  <Input
                    value={socialLink.facebook}
                    onChange={(e) =>
                      setSocialLink((prev) => ({
                        ...prev,
                        facebook: e.target.value,
                      }))
                    }
                    className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                  />
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                    @
                  </span>
                </div>
              </div>
            )}
            {isTwitter && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsTwitter(!isTwitter)}
                  className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                >
                  <Twitter className="w-5 h-5 group-hover:hidden stroke-1" />
                  <Unlink className="w-5 h-5 group-hover:flex hidden" />
                </Button>
                <div className="w-full relative">
                  <Input
                    value={socialLink.twitter}
                    onChange={(e) =>
                      setSocialLink((prev) => ({
                        ...prev,
                        twitter: e.target.value,
                      }))
                    }
                    className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                  />
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                    @
                  </span>
                </div>
              </div>
            )}
            {isYoutube && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsYoutube(!isYoutube)}
                  className="group w-10 h-10 flex-none flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-md p-0 text-gray-900 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-red-500"
                >
                  <Youtube className="w-5 h-5 group-hover:hidden stroke-1" />
                  <Unlink className="w-5 h-5 group-hover:flex hidden" />
                </Button>
                <div className="w-full relative">
                  <Input
                    value={socialLink.youtube}
                    onChange={(e) =>
                      setSocialLink((prev) => ({
                        ...prev,
                        youtube: e.target.value,
                      }))
                    }
                    className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-300 dark:focus-visible:border-gray-700 pl-12 dark:bg-gray-800 dark:hover:border-gray-700 hover:border-gray-300"
                  />
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-l-md text-sm">
                    @
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!isInstagram && (
              <Button
                onClick={() => setIsInstagram(!isInstagram)}
                size={"icon"}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Instagram className="w-5 h-5 stroke-1" />
              </Button>
            )}
            {!isFacebook && (
              <Button
                size={"icon"}
                onClick={() => setIsFacebook(!isFacebook)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Facebook className="w-5 h-5 stroke-1" />
              </Button>
            )}
            {!isTwitter && (
              <Button
                size={"icon"}
                onClick={() => setIsTwitter(!isTwitter)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Twitter className="w-5 h-5 stroke-1" />
              </Button>
            )}
            {!isYoutube && (
              <Button
                size={"icon"}
                onClick={() => setIsYoutube(!isYoutube)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                <Youtube className="w-5 h-5 stroke-1" />
              </Button>
            )}
          </div>
        </div>
        <Button className="bg-green-400 hover:bg-green-500 dark:text-gray-900 text-gray-900 w-56">
          Ajukan Affiliate Partner
        </Button>
      </form>
    </Card>
  );
};
