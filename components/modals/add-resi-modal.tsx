"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { ScrollArea } from "../ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";
import { ToastError } from "../toast-error";
import { optionToast } from "@/lib/utils";

interface ResponseProps {
  data: {
    message: string;
    data: {
      id: string;
    };
  };
}

interface CourierProps {
  courier_code: string;
  courier_name: string;
}
interface metaDataProps {
  current_page: number;
  last_page: number;
}

const formSchema = z.object({
  waybill_id: z.string().min(1, {
    message: "Kode Resi tidak boleh kosong",
  }),
  title: z.string().min(1, {
    message: "Judul tidak boleh kosong",
  }),
  courier_code: z.string().min(1, {
    message: "kurir tidak boleh kosong",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const mapCourier = [
  {
    name: "Gojek",
    value: "gojek",
  },
  {
    name: "Grab",
    value: "grab",
  },
  {
    name: "Deliveree",
    value: "deliveree",
  },
  {
    name: "JNE",
    value: "jne",
  },
  {
    name: "Tiki",
    value: "tiki",
  },
  {
    name: "Ninja",
    value: "ninja",
  },
  {
    name: "Lion",
    value: "lion",
  },
  {
    name: "Rara",
    value: "rara",
  },
  {
    name: "SiCepat",
    value: "sicepat",
  },
  {
    name: "J&T",
    value: "jnt",
  },
  {
    name: "ID Express",
    value: "idexpress",
  },
  {
    name: "RPX",
    value: "rpx",
  },
  {
    name: "JDL",
    value: "jdl",
  },
  {
    name: "Wahana",
    value: "wahana",
  },
  {
    name: "Anter Aja",
    value: "anteraja",
  },
  {
    name: "SAP",
    value: "sap",
  },
  {
    name: "Paxel",
    value: "paxel",
  },
  {
    name: "MrSpeedy",
    value: "mrspeedy",
  },
  {
    name: "Borzo",
    value: "borzo",
  },
  {
    name: "Lalamove",
    value: "lalamove",
  },
];

export const AddResiModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();
  const [courierList, setCourierList] = useState<CourierProps[]>([]);
  const [metadata, setMetadata] = useState<metaDataProps>({
    current_page: 0,
    last_page: 0,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);

  const isModalOpen = isOpen && type === "add-resi";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waybill_id: "",
      title: "",
      courier_code: "",
    },
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const getCourier = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/list-courier?page=${page}&q=${searchValue}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setCourierList(data.data);
      setMetadata({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (error: any) {
      console.log("[ERROR_GET_COURIER]:", error);
    }
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      const res: ResponseProps = await axios.post(
        "https://koderesi.raventech.my.id/api/admin/waybill/store",
        values,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.data) {
        toast.success("Resi berhasil ditambahkan");
        handleClose();
        router.push(`/tracks/${res.data.data.id}`);
        router.refresh();
      } else {
        console.log("[ERROR_ADD_RESI]:", res.data.message);
        toast(
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 dark:fill-white dark:text-red-800" />
            <div className="flex flex-col gap-1">
              <h5 className="font-medium dark:text-white text-sm leading-tight">
                Resi gagal ditambahkan.
              </h5>
              <ul className="*:before:content-['-'] *:before:pr-3 text-red-200 text-xs">
                <li>{res.data.message}</li>
              </ul>
            </div>
          </div>,
          {
            duration: 5000,
            classNames: {
              toast: "toast-custom",
            },
          }
        );
      }
    } catch (error: any) {
      console.log("[ERROR_ADD_RESI]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Resi gagal di tambahkan" error={error} t={t} />
        ),
        optionToast
      );
    }
  };

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!isCourierOpen) {
      setSearch("");
    }
  }, [isCourierOpen]);

  useEffect(() => {
    form.setValue("waybill_id", form.watch("waybill_id").toUpperCase());
  }, [form.watch("waybill_id")]);

  useEffect(() => {
    if (isModalOpen && searchValue) {
      getCourier();
      setPage(1);
    } else if (isModalOpen) {
      getCourier();
    }
  }, [isModalOpen, page, searchValue]);

  return (
    <Modal
      title="Tambah Resi Baru"
      description="Tambah resi anda disini"
      isOpen={isModalOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent dark:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waybill_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Resi</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent dark:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courier_code"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Kurir</FormLabel>
                <FormControl>
                  <Popover open={isCourierOpen} onOpenChange={setIsCourierOpen}>
                    <PopoverTrigger asChild>
                      <Button className="justify-between bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border text-black dark:text-white border-green-200 hover:border-green-400 dark:border-green-200/40 dark:hover:border-green-400">
                        {field.value === ""
                          ? "Pilih kurir..."
                          : courierList.find(
                              (item) => item.courier_code === field.value
                            )?.courier_name
                          ? courierList.find(
                              (item) => item.courier_code === field.value
                            )?.courier_name
                          : "Pilih kurir..."}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandGroup>
                          <div className="relative mb-1">
                            <Input
                              className="p-0 h-8 pl-8 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                              autoFocus
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                            />
                            <Search className="w-4 h-4 absolute top-2 left-2" />
                          </div>
                          <CommandSeparator className="mb-1" />
                          <CommandList>
                            {courierList.map((item) => (
                              <CommandItem
                                key={item.courier_name}
                                onSelect={() => {
                                  setIsCourierOpen(false);
                                  field.onChange(item.courier_code);
                                }}
                              >
                                {item.courier_name}
                              </CommandItem>
                            ))}
                          </CommandList>
                          <CommandSeparator className="mt-1" />
                          <div className="flex justify-between mt-2 items-center">
                            <Button
                              className="p-0 h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage((prev) => prev - 1);
                              }}
                              disabled={page === 1}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center text-xs">
                              Page {metadata.current_page} of{" "}
                              {metadata.last_page}
                            </div>
                            <Button
                              className="p-0 h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage((prev) => prev + 1);
                              }}
                              disabled={page === metadata.last_page}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 mt-4">
            <Button
              className="w-full bg-green-400 hover:bg-green-500 text-gray-900"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Lacak
            </Button>
            <Button variant={"outline"} onClick={handleClose} type="button">
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
