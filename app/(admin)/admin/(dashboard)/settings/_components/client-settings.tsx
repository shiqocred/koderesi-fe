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
import { KreditSettings } from "./kredit-settings";
import { LabelSettings } from "./label-settings";
import { PromoSettings } from "./promo-settings";
import { useModal } from "@/hooks/use-modal";
import { CostSettings } from "./cost-settings";

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
      <KreditSettings />
      <PromoSettings />
      {/* <LabelSettings /> */}
      <CostSettings />
    </div>
  );
};
