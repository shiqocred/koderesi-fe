"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Eye, EyeOff, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name minimal 3 huruf",
    }),
    username: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    email: z.string().email(),
    whatsapp: z.string().min(10, {
      message: "Nomor WhatsApp minimal 10 angka",
    }),
    old_password: z.string(),
    new_password: z.string().min(8, {
      message: "Password Baru minimal 8 angka",
    }),
    confirm_password: z.string().min(8, {
      message: "Konfirmasi Password Baru minimal 8 angka",
    }),
  })
  .required();

export const ClientSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const { onOpen } = useModal();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleOld, setIsVisibleOld] = useState(false);

  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      whatsapp: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col w-full max-w-7xl mx-auto">
      <Card className="md:p-5 p-3 flex w-full gap-4 bg-transparent border-gray-500 border flex-col lg:flex-row">
        <div className="flex w-full flex-col">
          <h2 className="text-3xl font-semibold">Personalisasi</h2>
          <p className="font-light">Konfigurasi data pribadi anda.</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <h5 className="font-medium text-lg">Atur Foto</h5>
            <div className="flex items-start justify-start gap-6 flex-col md:flex-row">
              <div className="relative aspect-square overflow-hidden rounded-md w-20">
                <Image
                  src={"/avatar.webp"}
                  className="object-cover"
                  fill
                  alt=""
                />
              </div>
              <div className="flex-col flex gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Button className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-gray-500 text-black dark:text-white w-full md:w-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button className="bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-500 dark:border-red-500/50 text-red-500 w-10 md:w-auto p-0 md:px-3 md:py-2 flex-none">
                    <Trash2 className="h-4 w-4 md:mr-2" />
                    <p className="hidden md:flex">Hapus</p>
                  </Button>
                </div>
                <p className="text-xs font-light">
                  *Rekomendasi resolusi 1:1, hingga 5MB
                </p>
              </div>
            </div>
          </Card>
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-lg">Atur Nama</h5>
              {isNameEdit ? (
                <Button
                  type="button"
                  onClick={() => setIsNameEdit(false)}
                  className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                >
                  <X className="w-4 h-4  mr-2" />
                  Batal
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsNameEdit(true)}
                  className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                >
                  <Edit3 className="w-4 h-4  mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full gap-4 flex flex-col"
              >
                <div className="flex items-start flex-col gap-6 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                        <FormLabel
                          className={cn(
                            "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                            field.value.length === 0
                              ? "translate-y-3.5 left-3 font-normal"
                              : "-translate-y-3 left-0 font-light"
                          )}
                        >
                          Nama Lengakp
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isNameEdit}
                            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                        <FormLabel
                          className={cn(
                            "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                            field.value.length === 0
                              ? "translate-y-3.5 left-3 font-normal"
                              : "-translate-y-3 left-0 font-light"
                          )}
                        >
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isNameEdit}
                            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full justify-between flex dark:bg-gray-800 rounded md:px-3 py-1 md:items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 px-2">
                  <p className="text-sm dark:text-gray-300">
                    Periksa terlebih dahulu sebelum konfirmasi.
                  </p>
                  <Button
                    type="submit"
                    disabled={!isNameEdit}
                    className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                  >
                    <Save className="w-4 h-4  mr-2" />
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-lg">
                Atur Email dan No. WhatsApp
              </h5>
              {isContactEdit ? (
                <Button
                  type="button"
                  onClick={() => setIsContactEdit(false)}
                  className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                >
                  <X className="w-4 h-4  mr-2" />
                  Batal
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsContactEdit(true)}
                  className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                >
                  <Edit3 className="w-4 h-4  mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full gap-4 flex flex-col"
              >
                <div className="flex items-start flex-col gap-6 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                        <FormLabel
                          className={cn(
                            "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                            field.value.length === 0
                              ? "translate-y-3.5 left-3 font-normal"
                              : "-translate-y-3 left-0 font-light"
                          )}
                        >
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isContactEdit}
                            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                        <FormLabel
                          className={cn(
                            "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                            field.value.length === 0
                              ? "translate-y-3.5 left-3 font-normal"
                              : "-translate-y-3 left-0 font-light"
                          )}
                        >
                          Nomor WhatsApp
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isContactEdit}
                            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full justify-between flex dark:bg-gray-800 rounded md:px-3 py-1 md:items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 px-2">
                  <p className="text-sm dark:text-gray-300">
                    Periksa terlebih dahulu sebelum konfirmasi.
                  </p>
                  <Button
                    type="submit"
                    disabled={!isContactEdit}
                    className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                  >
                    <Save className="w-4 h-4  mr-2" />
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-lg">Atur Password Baru</h5>
              {isPasswordEdit ? (
                <Button
                  type="button"
                  onClick={() => setIsPasswordEdit(false)}
                  className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                >
                  <X className="w-4 h-4  mr-2" />
                  Batal
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsPasswordEdit(true)}
                  className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                >
                  <Edit3 className="w-4 h-4  mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full gap-4 flex flex-col"
              >
                <div className="flex items-start flex-col gap-6 w-full">
                  <FormField
                    control={form.control}
                    name="old_password"
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
                          Paswword Lama
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center peer w-full">
                            <Input
                              disabled={!isPasswordEdit}
                              {...field}
                              type={!isVisibleOld ? "password" : "text"}
                              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                            />
                            <Button
                              type="button"
                              className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
                              disabled={!isPasswordEdit}
                              variant={"ghost"}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsVisibleOld(!isVisibleOld);
                              }}
                            >
                              {!isVisibleOld ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="new_password"
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
                          Paswword Baru
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center peer w-full">
                            <Input
                              disabled={!isPasswordEdit}
                              {...field}
                              type={!isVisible ? "password" : "text"}
                              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                            />
                            <Button
                              type="button"
                              className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
                              disabled={!isPasswordEdit}
                              variant={"ghost"}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsVisible(!isVisible);
                              }}
                            >
                              {!isVisible ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_password"
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
                          Konfirmasi Paswword Baru
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center peer w-full">
                            <Input
                              disabled={!isPasswordEdit}
                              {...field}
                              type={
                                !isVisibleConfirmation ? "password" : "text"
                              }
                              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                            />
                            <Button
                              type="button"
                              className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
                              disabled={!isPasswordEdit}
                              variant={"ghost"}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsVisibleConfirmation(
                                  !isVisibleConfirmation
                                );
                              }}
                            >
                              {!isVisibleConfirmation ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full justify-between flex dark:bg-gray-800 rounded md:px-3 py-1 md:items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 px-2">
                  <p className="text-sm dark:text-gray-300">
                    Periksa terlebih dahulu sebelum konfirmasi.
                  </p>
                  <Button
                    type="submit"
                    disabled={!isPasswordEdit}
                    className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                  >
                    <Save className="w-4 h-4  mr-2" />
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
          <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-red-300 dark:border-red-700 border bg-red-50 dark:bg-red-800/20">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-lg">Hapus Akun</h5>
            </div>
            <div className="w-full gap-4 flex flex-col">
              <div className="w-full justify-between flex dark:bg-red-800/60 rounded md:px-3 px-2 py-1 items-center bg-red-100 flex-col md:flex-row gap-3 md:gap-0">
                <p className="text-sm dark:text-red-200">
                  Tindakan bersifat permanen. Tidak dapat diulang
                </p>
                <Button
                  type="button"
                  onClick={() => onOpen("delete-label")}
                  className="bg-transparent hover:bg-transparent dark:text-white hover:underline font-normal text-red-500"
                >
                  <Trash2 className="w-4 h-4  mr-2" />
                  HAPUS AKUN ANDA
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};
