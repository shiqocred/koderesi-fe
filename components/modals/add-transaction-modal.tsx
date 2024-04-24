"use client";

import { z } from "zod";
import React from "react";
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

const formSchema = z.object({
  metode: z.string().min(1, {
    message: "Metode tidak boleh kosong",
  }),
  kode: z.string().min(1, {
    message: "Kode transaksi tidak boleh kosong",
  }),
  nominal: z.string().min(1, {
    message: "Nominal tidak boleh kosong",
  }),
  kredit: z.string().min(1, {
    message: "Kredit tidak boleh kosong",
  }),
  tanggal: z.string().min(1, {
    message: "Tanggal tidak boleh kosong",
  }),
  waktu: z.string().min(1, {
    message: "Waktu tidak boleh kosong",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddTransactionModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "add-transaction";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode: "",
      kredit: "",
      metode: "",
      nominal: "",
      tanggal: "",
      waktu: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Modal
      title="Tambah Transaksi Baru"
      description="Tambah transaksi pengguna disini"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:gap-4 w-full"
        >
          <div className="flex gap-2 md:gap-4 w-full">
            <FormField
              control={form.control}
              name="metode"
              render={({ field }) => (
                <FormItem className="w-full gap-1 flex flex-col space-y-0">
                  <FormLabel>Metode</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
              name="kode"
              render={({ field }) => (
                <FormItem className="w-full gap-1 flex flex-col space-y-0">
                  <FormLabel>Kode Transaksi</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
            name="nominal"
            render={({ field }) => (
              <FormItem className="w-full gap-1 flex flex-col space-y-0">
                <FormLabel>Nominal</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
            name="kredit"
            render={({ field }) => (
              <FormItem className="w-full gap-1 flex flex-col space-y-0">
                <FormLabel>Kredit</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
              name="tanggal"
              render={({ field }) => (
                <FormItem className="w-full gap-1 flex flex-col space-y-0">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
              name="waktu"
              render={({ field }) => (
                <FormItem className="w-full gap-1 md:gap-2 flex flex-col space-y-0">
                  <FormLabel>Waktu</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-none w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                      {...field}
                      disabled={isSubmitting}
                    />
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
              disabled={!isValid || isSubmitting}
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
