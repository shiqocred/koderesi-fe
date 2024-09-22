"use client";

import { z } from "zod";
import React, { FormEvent, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AlertCircle, CalendarIcon, Clock, X } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { cn, formatTanggal } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  methode_payment: z.string().min(1, {
    message: "Metode tidak boleh kosong",
  }),
  code_transaction: z.string().min(1, {
    message: "Kode transaksi tidak boleh kosong",
  }),
  channel: z.string().min(1, {
    message: "Channel tidak boleh kosong",
  }),
  amount_bill: z.string().min(1, {
    message: "Nominal tidak boleh kosong",
  }),
  amount_credit: z.string().min(1, {
    message: "Kredit tidak boleh kosong",
  }),
  transaction_date: z.string().min(1, {
    message: "Tanggal tidak boleh kosong",
  }),
  transaction_time: z.string().min(1, {
    message: "Waktu tidak boleh kosong",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddTransactionModal = () => {
  const router = useRouter();
  const cookies = useCookies();
  const params = useSearchParams();
  const token = cookies.get("accessToken");
  const { isOpen, onClose, type } = useModal();
  const [jam1, setJam1] = useState("0");
  const [jam2, setJam2] = useState("0");
  const [menit1, setMenit1] = useState("0");
  const [menit2, setMenit2] = useState("0");
  const [detik1, setDetik1] = useState("0");
  const [detik2, setDetik2] = useState("0");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const isModalOpen = isOpen && type === "add-transaction";

  const handleClose = () => {
    onClose();
    setSelectedDate(undefined);
    setJam1("0");
    setJam2("0");
    setMenit1("0");
    setMenit2("0");
    setDetik1("0");
    setDetik2("0");
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code_transaction: "",
      amount_credit: "",
      methode_payment: "",
      channel: "",
      amount_bill: "",
      transaction_date: "",
      transaction_time: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.post(
        `https://koderesi.raventech.my.id/api/superadmin/transaksi/store/${params.get(
          "currentId"
        )}`,
        values,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Transaksi berhasil ditambahkan");
      handleClose();
      cookies.set("transaction", "added");
      router.refresh();
    } catch (error: any) {
      console.log("[ERROR_ADD_TRANSACTION]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Transaksi gagal ditambahkan.
                </h5>
                {error.response.data.message && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.message}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    }
  };

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (parseFloat(jam1) === 2 && parseFloat(jam2) > 3) {
      setJam1("2");
      setJam2("3");
    }
    form.setValue(
      "transaction_time",
      `${jam1 + jam2}:${menit1 + menit2}:${detik1 + detik2}`
    );
  }, [jam1, jam2, menit1, menit2, detik1, detik2]);

  useEffect(() => {
    form.setValue(
      "transaction_date",
      format(
        selectedDate ? selectedDate.toString() : new Date().toString(),
        "yyyy-MM-dd"
      )
    );
  }, [selectedDate]);

  return (
    <Modal
      title="Tambah Transaksi Baru"
      description="Tambah transaksi pengguna disini"
      isOpen={isModalOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex gap-2 md:gap-4 w-full mt-5">
            <FormField
              control={form.control}
              name="methode_payment"
              render={({ field }) => (
                <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                  <FormLabel
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      field.value.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Metode
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
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
              name="code_transaction"
              render={({ field }) => (
                <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                  <FormLabel
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      field.value.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Kode Transaksi
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1 relative">
                <FormLabel
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    field.value.length === 0
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-semibold"
                  )}
                >
                  Channel Pembayaran
                </FormLabel>
                <FormControl>
                  <Input
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
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
            name="amount_bill"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1 relative">
                <FormLabel
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    field.value.length === 0
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-semibold"
                  )}
                >
                  Nominal
                </FormLabel>
                <FormControl>
                  <Input
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
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
            name="amount_credit"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1 relative">
                <FormLabel
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    field.value.length === 0
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-semibold"
                  )}
                >
                  Kredit
                </FormLabel>
                <FormControl>
                  <Input
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-4 w-full">
            <FormField
              control={form.control}
              name="transaction_date"
              render={({ field }) => (
                <FormItem className="w-full gap-1 flex flex-col space-y-0">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="justify-between bg-transparent hover:bg-transparent text-black dark:text-white border-0 rounded-none border-b hover:border-green-500 dark:border-green-200/40 border-green-400 dark:hover:border-green-400">
                          {field.value}
                          <CalendarIcon className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex px-0 py-2 gap-0 w-auto"
                        align="start"
                      >
                        <Calendar
                          selected={selectedDate}
                          initialFocus
                          onSelect={setSelectedDate}
                          mode="single"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_time"
              render={({ field }) => (
                <FormItem className="w-full gap-1 flex flex-col space-y-0">
                  <FormLabel>Waktu</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="justify-between bg-transparent hover:bg-transparent text-black dark:text-white border-0 rounded-none border-b hover:border-green-500 dark:border-green-200/40 border-green-400 dark:hover:border-green-400">
                          {field.value}
                          <Clock className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex p-0 gap-0 w-[230px]"
                        align="start"
                      >
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from({ length: 3 }, (_, index) => (
                                <CommandItem
                                  className={cn(
                                    "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                    parseFloat(jam1) === index
                                      ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                      : ""
                                  )}
                                  key={index}
                                  onSelect={() => setJam1(index.toString())}
                                  value={index.toString()}
                                >
                                  {index}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from(
                                { length: parseFloat(jam1) === 2 ? 4 : 10 },
                                (_, index) => (
                                  <CommandItem
                                    className={cn(
                                      "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                      parseFloat(jam2) === index
                                        ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                        : ""
                                    )}
                                    key={index}
                                    onSelect={() => setJam2(index.toString())}
                                    value={index.toString()}
                                  >
                                    {index}
                                  </CommandItem>
                                )
                              )}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                        <Separator
                          orientation="vertical"
                          className="bg-gray-500 h-[280px] mx-1"
                        />
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from({ length: 6 }, (_, index) => (
                                <CommandItem
                                  className={cn(
                                    "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                    parseFloat(menit1) === index
                                      ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                      : ""
                                  )}
                                  key={index}
                                  onSelect={() => setMenit1(index.toString())}
                                  value={index.toString()}
                                >
                                  {index}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from({ length: 10 }, (_, index) => (
                                <CommandItem
                                  className={cn(
                                    "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                    parseFloat(menit2) === index
                                      ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                      : ""
                                  )}
                                  key={index}
                                  onSelect={() => setMenit2(index.toString())}
                                  value={index.toString()}
                                >
                                  {index}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                        <Separator
                          orientation="vertical"
                          className="bg-gray-500 h-[280px] mx-1"
                        />
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from({ length: 6 }, (_, index) => (
                                <CommandItem
                                  className={cn(
                                    "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                    parseFloat(detik1) === index
                                      ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                      : ""
                                  )}
                                  key={index}
                                  onSelect={() => setDetik1(index.toString())}
                                  value={index.toString()}
                                >
                                  {index}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                        <Command>
                          <CommandGroup>
                            <CommandList className="w-10 px-2 h-[280px] overflow-y-scroll">
                              {Array.from({ length: 10 }, (_, index) => (
                                <CommandItem
                                  className={cn(
                                    "w-8 h-7 text-sm p-0 flex items-center justify-center tracking-wider",
                                    parseFloat(detik2) === index
                                      ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                      : ""
                                  )}
                                  key={index}
                                  onSelect={() => setDetik2(index.toString())}
                                  value={index.toString()}
                                >
                                  {index}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              className="w-full bg-green-400 hover:bg-green-500 text-gray-900"
              type="submit"
              disabled={isSubmitting}
            >
              Tambah
            </Button>
            <Button variant={"outline"} onClick={onClose} type="button">
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
