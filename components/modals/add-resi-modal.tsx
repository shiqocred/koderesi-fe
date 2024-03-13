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
  resi: z.string().min(1, {
    message: "Kode Resi tidak boleh kosong",
  }),
  keterangan: z.string().min(1, {
    message: "Keterangan tidak boleh kosong",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddResiModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "add-resi";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resi: "",
      keterangan: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Modal
      title="Tambah Resi Baru"
      description="Tambah resi anda disini"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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
            name="resi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Resi</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
                    {...field}
                    disabled={isSubmitting}
                  />
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
            <Button variant={"outline"} onClick={onClose} type="button">
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
