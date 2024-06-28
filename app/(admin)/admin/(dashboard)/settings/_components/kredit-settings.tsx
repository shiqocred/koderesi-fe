"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit3, Minus, Plus, Save, Trash2, X } from "lucide-react";
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
import { cn, formatRupiah } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface InputNewProps {
  kredit?: number;
  harga?: number;
  hargaSatuan?: number;
  jenis: "sekali" | "bulanan" | "tahunan";
  keterangan: string[];
}

const formSchema = z
  .object({
    kredit_new: z.coerce.number(),
    harga_new: z.coerce.number(),
    harga_per_new: z.coerce.number(),
    keterangan_new: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_1_sekali: z.coerce.number(),
    harga_1_sekali: z.coerce.number(),
    harga_per_1_sekali: z.coerce.number(),
    keterangan_1_sekali: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_2_sekali: z.coerce.number(),
    harga_2_sekali: z.coerce.number(),
    harga_per_2_sekali: z.coerce.number(),
    keterangan_2_sekali: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_3_sekali: z.coerce.number(),
    harga_3_sekali: z.coerce.number(),
    harga_per_3_sekali: z.coerce.number(),
    keterangan_3_sekali: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_4_sekali: z.coerce.number(),
    harga_4_sekali: z.coerce.number(),
    harga_per_4_sekali: z.coerce.number(),
    keterangan_4_sekali: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_1_bulanan: z.coerce.number(),
    harga_1_bulanan: z.coerce.number(),
    harga_per_1_bulanan: z.coerce.number(),
    keterangan_1_bulanan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_2_bulanan: z.coerce.number(),
    harga_2_bulanan: z.coerce.number(),
    harga_per_2_bulanan: z.coerce.number(),
    keterangan_2_bulanan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_3_bulanan: z.coerce.number(),
    harga_3_bulanan: z.coerce.number(),
    harga_per_3_bulanan: z.coerce.number(),
    keterangan_3_bulanan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_4_bulanan: z.coerce.number(),
    harga_4_bulanan: z.coerce.number(),
    harga_per_4_bulanan: z.coerce.number(),
    keterangan_4_bulanan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_1_tahunan: z.coerce.number(),
    harga_1_tahunan: z.coerce.number(),
    harga_per_1_tahunan: z.coerce.number(),
    keterangan_1_tahunan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_2_tahunan: z.coerce.number(),
    harga_2_tahunan: z.coerce.number(),
    harga_per_2_tahunan: z.coerce.number(),
    keterangan_2_tahunan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_3_tahunan: z.coerce.number(),
    harga_3_tahunan: z.coerce.number(),
    harga_per_3_tahunan: z.coerce.number(),
    keterangan_3_tahunan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
    kredit_4_tahunan: z.coerce.number(),
    harga_4_tahunan: z.coerce.number(),
    harga_per_4_tahunan: z.coerce.number(),
    keterangan_4_tahunan: z.string().min(3, {
      message: "Username minimal 3 huruf",
    }),
  })
  .required();

export const KreditSettings = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [isKreditSekaliPertama, setIsKreditSekaliPertama] = useState(false);
  const [isKreditSekaliKedua, setIsKreditSekaliKedua] = useState(false);
  const [isKreditSekaliKetiga, setIsKreditSekaliKetiga] = useState(false);
  const [isKreditSekaliKeempat, setIsKreditSekaliKeempat] = useState(false);

  const [isKreditBulananPertama, setIsKreditBulananPertama] = useState(false);
  const [isKreditBulananKedua, setIsKreditBulananKedua] = useState(false);
  const [isKreditBulananKetiga, setIsKreditBulananKetiga] = useState(false);
  const [isKreditBulananKeempat, setIsKreditBulananKeempat] = useState(false);

  const [isKreditTahunanPertama, setIsKreditTahunanPertama] = useState(false);
  const [isKreditTahunanKedua, setIsKreditTahunanKedua] = useState(false);
  const [isKreditTahunanKetiga, setIsKreditTahunanKetiga] = useState(false);
  const [isKreditTahunanKeempat, setIsKreditTahunanKeempat] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kredit_1_sekali: undefined,
      harga_1_sekali: undefined,
      harga_per_1_sekali: undefined,
      keterangan_1_sekali: "",
      kredit_2_sekali: undefined,
      harga_2_sekali: undefined,
      harga_per_2_sekali: undefined,
      keterangan_2_sekali: "",
      kredit_3_sekali: undefined,
      harga_3_sekali: undefined,
      harga_per_3_sekali: undefined,
      keterangan_3_sekali: "",
      kredit_4_sekali: undefined,
      harga_4_sekali: undefined,
      harga_per_4_sekali: undefined,
      keterangan_4_sekali: "",

      kredit_1_bulanan: undefined,
      harga_1_bulanan: undefined,
      harga_per_1_bulanan: undefined,
      keterangan_1_bulanan: "",
      kredit_2_bulanan: undefined,
      harga_2_bulanan: undefined,
      harga_per_2_bulanan: undefined,
      keterangan_2_bulanan: "",
      kredit_3_bulanan: undefined,
      harga_3_bulanan: undefined,
      harga_per_3_bulanan: undefined,
      keterangan_3_bulanan: "",
      kredit_4_bulanan: undefined,
      harga_4_bulanan: undefined,
      harga_per_4_bulanan: undefined,
      keterangan_4_bulanan: "",

      kredit_1_tahunan: undefined,
      harga_1_tahunan: undefined,
      harga_per_1_tahunan: undefined,
      keterangan_1_tahunan: "",
      kredit_2_tahunan: undefined,
      harga_2_tahunan: undefined,
      harga_per_2_tahunan: undefined,
      keterangan_2_tahunan: "",
      kredit_3_tahunan: undefined,
      harga_3_tahunan: undefined,
      harga_per_3_tahunan: undefined,
      keterangan_3_tahunan: "",
      kredit_4_tahunan: undefined,
      harga_4_tahunan: undefined,
      harga_per_4_tahunan: undefined,
      keterangan_4_tahunan: "",
    },
  });

  const [inputNew, setInputNew] = useState<InputNewProps>({
    kredit: undefined,
    harga: undefined,
    hargaSatuan: undefined,
    jenis: "sekali",
    keterangan: [""],
  });

  const onChangeNewKeterangan = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newKeterangan = [...inputNew.keterangan];
    newKeterangan[index] = event.target.value;
    setInputNew({
      ...inputNew,
      keterangan: newKeterangan,
    });
  };

  const addKeterangan = () => {
    setInputNew({
      ...inputNew,
      keterangan: [...inputNew.keterangan, ""],
    });
  };

  const removeKeterangan = (index: number) => {
    const newKeterangan = inputNew.keterangan.filter((_, i) => i !== index);
    setInputNew({
      ...inputNew,
      keterangan: newKeterangan,
    });
  };

  const handleCreate = async () => {};
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:p-5 p-3 flex w-full gap-4 bg-transparent border-gray-500 border flex-col md:flex-row">
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold">Harga Kredit</h2>
        <p className="font-light">Konfigurasi harga kredit.</p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border md:p-5 p-3 flex flex-col gap-6 rounded-md border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-lg">Buat Baru</h5>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-28 justify-between p-0 bg-transparent hover:bg-transparent text-black dark:text-white rounded-none font-medium text-lg underline">
                  {inputNew.jenis === "sekali" && "Sekali Beli"}
                  {inputNew.jenis === "bulanan" && "Bulanan"}
                  {inputNew.jenis === "tahunan" && "Tahunan"}
                  <ChevronDown className="w-4 h-4 ml-2 flex-none" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        className="gap-2"
                        onSelect={() =>
                          setInputNew((prev) => ({ ...prev, jenis: "sekali" }))
                        }
                      >
                        <Checkbox
                          checked={inputNew.jenis === "sekali"}
                          onCheckedChange={() =>
                            setInputNew((prev) => ({
                              ...prev,
                              jenis: "sekali",
                            }))
                          }
                        />
                        Sekali Beli
                      </CommandItem>
                      <CommandItem
                        className="gap-2"
                        onSelect={() =>
                          setInputNew((prev) => ({ ...prev, jenis: "bulanan" }))
                        }
                      >
                        <Checkbox
                          checked={inputNew.jenis === "bulanan"}
                          onCheckedChange={() =>
                            setInputNew((prev) => ({
                              ...prev,
                              jenis: "bulanan",
                            }))
                          }
                        />
                        Bulanan
                      </CommandItem>
                      <CommandItem
                        className="gap-2"
                        onSelect={() =>
                          setInputNew((prev) => ({ ...prev, jenis: "tahunan" }))
                        }
                      >
                        <Checkbox
                          checked={inputNew.jenis === "tahunan"}
                          onCheckedChange={() =>
                            setInputNew((prev) => ({
                              ...prev,
                              jenis: "tahunan",
                            }))
                          }
                        />
                        Tahunan
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <form onSubmit={handleCreate} className="w-full gap-4 flex flex-col">
            <div className="flex items-start flex-col gap-6 w-full">
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.kredit)) ||
                      inputNew.kredit?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Total Kredit
                </Label>
                <Input
                  value={inputNew.kredit}
                  onChange={(e) =>
                    setInputNew((prev) => ({
                      ...prev,
                      kredit: parseFloat(e.target.value),
                    }))
                  }
                  type="number"
                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                />
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.harga)) ||
                      inputNew.harga?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Harga Kredit
                </Label>
                <div className="relative">
                  <Input
                    value={inputNew.harga}
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        harga: parseFloat(e.target.value),
                      }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <p className="absolute top-4 right-3 text-xs text-gray-500">
                    {isNaN(Number(inputNew.harga))
                      ? formatRupiah(0)
                      : formatRupiah(inputNew.harga ?? 0)}
                  </p>
                </div>
              </div>
              <div className="space-y-0.5 md:space-y-1 relative w-full">
                <Label
                  className={cn(
                    "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                    isNaN(Number(inputNew.hargaSatuan)) ||
                      inputNew.hargaSatuan?.toString() === ""
                      ? "translate-y-3.5 left-3 font-normal"
                      : "-translate-y-3 left-0 font-light"
                  )}
                >
                  Harga perkredit
                </Label>
                <div className="relative">
                  <Input
                    value={inputNew.hargaSatuan}
                    onChange={(e) =>
                      setInputNew((prev) => ({
                        ...prev,
                        hargaSatuan: parseFloat(e.target.value),
                      }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                  />
                  <p className="absolute top-4 right-3 text-xs text-gray-500">
                    {isNaN(Number(inputNew.hargaSatuan))
                      ? formatRupiah(0)
                      : formatRupiah(inputNew.hargaSatuan ?? 0)}
                  </p>
                </div>
              </div>
              {inputNew.keterangan.map((keterangan, index) => (
                <div
                  className="space-y-0.5 md:space-y-1 relative w-full group"
                  key={index}
                >
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      inputNew.keterangan[0].length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-light"
                    )}
                  >
                    Keterangan
                  </Label>
                  <div className="flex items-end gap-2">
                    <Input
                      value={inputNew.keterangan[index]}
                      onChange={(e) => onChangeNewKeterangan(index, e)}
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                    />
                    <Button
                      onClick={() => removeKeterangan(index)}
                      type="button"
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9 group-last:hidden"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={addKeterangan}
                      type="button"
                      className="bg-transparent text-black/80 hover:text-black dark:text-white/80 dark:hover:text-black hover:bg-transparent py-0 h-9 hidden group-last:flex"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
              <p className="text-sm dark:text-gray-300">
                Periksa terlebih dahulu sebelum konfirmasi.
              </p>
              <div className="flex items-center">
                <Button
                  type="submit"
                  className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                >
                  <Save className="w-4 h-4  mr-2" />
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-4 w-full"
        >
          <AccordionItem
            value="sekaliBeli"
            className="md:px-5 px-3 py-2 w-full border-gray-300 dark:border-gray-700 border rounded-md"
          >
            <AccordionTrigger>
              <h5 className="font-medium text-lg">Sekali Beli</h5>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pt-2">
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 1</h5>
                  <div className="flex">
                    {isKreditSekaliPertama ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliPertama(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliPertama(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditSekaliPertama(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_1_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditSekaliPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_1_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_1_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_1_sekali"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditSekaliPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditSekaliPertama}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 2</h5>
                  <div className="flex">
                    {isKreditSekaliKedua ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKedua(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKedua(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditSekaliKedua(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_2_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditSekaliKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_2_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_2_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_2_sekali"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditSekaliKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditSekaliKedua}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 3</h5>
                  <div className="flex">
                    {isKreditSekaliKetiga ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKetiga(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKetiga(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditSekaliKetiga(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_3_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditSekaliKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_3_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_3_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_3_sekali"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditSekaliKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditSekaliKetiga}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 4</h5>
                  <div className="flex">
                    {isKreditSekaliKeempat ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKeempat(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditSekaliKeempat(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditSekaliKeempat(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_4_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditSekaliKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_4_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_4_sekali"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditSekaliKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_4_sekali"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditSekaliKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditSekaliKeempat}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="bulanan"
            className="md:px-5 px-3 py-2 w-full border-gray-300 dark:border-gray-700 border rounded-md"
          >
            <AccordionTrigger>
              <h5 className="font-medium text-lg">Bulanan</h5>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pt-2">
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 1</h5>
                  <div className="flex">
                    {isKreditBulananPertama ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananPertama(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananPertama(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditBulananPertama(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_1_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditBulananPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_1_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_1_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_1_bulanan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditBulananPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditBulananPertama}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 2</h5>
                  <div className="flex">
                    {isKreditBulananKedua ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKedua(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKedua(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditBulananKedua(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_2_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditBulananKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_2_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_2_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_2_bulanan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditBulananKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditBulananKedua}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 3</h5>
                  <div className="flex">
                    {isKreditBulananKetiga ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKetiga(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKetiga(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditBulananKetiga(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_3_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditBulananKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_3_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_3_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_3_bulanan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditBulananKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditBulananKetiga}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 4</h5>
                  <div className="flex">
                    {isKreditBulananKeempat ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKeempat(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditBulananKeempat(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditBulananKeempat(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_4_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditBulananKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_4_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_4_bulanan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditBulananKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_4_bulanan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditBulananKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditBulananKeempat}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="tahunan"
            className="md:px-5 px-3 py-2 w-full border-gray-300 dark:border-gray-700 border rounded-md"
          >
            <AccordionTrigger>
              <h5 className="font-medium text-lg">Tahunan</h5>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pt-2">
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 1</h5>
                  <div className="flex">
                    {isKreditTahunanPertama ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanPertama(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanPertama(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditTahunanPertama(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_1_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditTahunanPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_1_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_1_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanPertama}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_1_tahunan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditTahunanPertama}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditTahunanPertama}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 2</h5>
                  <div className="flex">
                    {isKreditTahunanKedua ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKedua(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKedua(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditTahunanKedua(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_2_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditTahunanKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_2_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_2_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKedua}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_2_tahunan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditTahunanKedua}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditTahunanKedua}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 3</h5>
                  <div className="flex">
                    {isKreditTahunanKetiga ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKetiga(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKetiga(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditTahunanKetiga(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_3_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditTahunanKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_3_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_3_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKetiga}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_3_tahunan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditTahunanKetiga}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditTahunanKetiga}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
              <Card className="md:p-5 p-3 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-lg">Pilihan 4</h5>
                  <div className="flex">
                    {isKreditTahunanKeempat ? (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKeempat(false)}
                        className="bg-transparent hover:bg-transparent text-gray-700 dark:text-white hover:underline font-normal"
                      >
                        <X className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Batal</p>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsKreditTahunanKeempat(true)}
                        className="bg-transparent hover:bg-transparent text-yellow-600 dark:text-yellow-400 hover:underline font-normal"
                      >
                        <Edit3 className="w-4 h-4 md:mr-2 m-0" />
                        <p className="hidden md:flex">Edit</p>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsKreditTahunanKeempat(true)}
                      className="bg-transparent hover:bg-transparent text-red-500 dark:text-red-400 hover:underline font-normal"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2 m-0" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full gap-4 flex flex-col"
                  >
                    <div className="flex items-start flex-col gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="kredit_4_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Total Kredit
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                disabled={!isKreditTahunanKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_4_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga Kredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harga_per_4_tahunan"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5 md:space-y-1 relative w-full">
                            <FormLabel
                              className={cn(
                                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                                isNaN(Number(field.value)) ||
                                  field.value.toString() === ""
                                  ? "translate-y-3.5 left-3 font-normal"
                                  : "-translate-y-3 left-0 font-light"
                              )}
                            >
                              Harga perkredit
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="number"
                                  disabled={!isKreditTahunanKeempat}
                                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                                />
                                <p className="absolute top-4 right-3 text-xs text-gray-500">
                                  {isNaN(Number(field.value))
                                    ? formatRupiah(0)
                                    : formatRupiah(field.value)}
                                </p>
                                {field.value === undefined}
                              </div>
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keterangan_4_tahunan"
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
                              Keterangan
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isKreditTahunanKeempat}
                                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                              />
                            </FormControl>
                            <FormMessage className="dark:text-red-400 font-light text-xs before:content-['*']" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <Label className="flex items-center gap-2">
                        <Checkbox checked />
                        <p>Terpopuler</p>
                      </Label>
                    </div>
                    <div className="w-full justify-between flex dark:bg-gray-800 rounded px-3 py-1 items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0">
                      <p className="text-sm dark:text-gray-300">
                        Periksa terlebih dahulu sebelum konfirmasi.
                      </p>
                      <div className="flex items-center">
                        <Button
                          type="submit"
                          disabled={!isKreditTahunanKeempat}
                          className="transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700"
                        >
                          <Save className="w-4 h-4  mr-2" />
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};
