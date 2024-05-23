"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { Edit, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";

export const Client = () => {
  const { onOpen } = useModal();
  const [isEdit, setIsEdit] = useState({
    nama: false,
    email: false,
    username: false,
    whatsapp: false,
  });
  const onEdit = (value: string, state: boolean) => {
    setIsEdit((prev) => ({ ...prev, [value]: !state }));
  };
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <Header title="Pengaturan Akun" isAccount />
      <Card className="flex justify-between p-4 lg:p-6 flex-col md:flex-row gap-y-4 md:gap-y-0">
        <div className="space-y-2">
          <h3 className="lg:text-lg text-base font-semibold flex-none">
            Image
          </h3>
          <Button className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70">
            Change Image
            <Edit className="h-5 w-5 ml-4" />
          </Button>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-md md:w-[100px] w-full">
          <Image src={"/avatar.webp"} className="object-cover" fill alt="" />
        </div>
      </Card>
      <Card className="flex justify-between p-4 lg:p-6 md:items-center flex-col md:flex-row items-start gap-2 md:gap-4">
        <h3 className="lg:text-lg text-base font-semibold flex-none">Nama</h3>
        <div className="flex items-center gap-x-4 w-full justify-end max-w-xl">
          {isEdit.nama ? (
            <Input className="h-8 md:h-10" value={"jhon doe"} />
          ) : (
            <p className="text-sm md:text-base">jhon doe</p>
          )}
          <Button
            size={"icon"}
            className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70 flex-none h-8 w-8 md:h-10 md:w-10"
            onClick={() => onEdit("nama", isEdit.nama)}
          >
            {isEdit.nama ? (
              <Save className="md:w-5 md:h-5 w-4 h-4" />
            ) : (
              <Edit className="md:w-5 md:h-5 w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>
      <Card className="flex justify-between p-4 lg:p-6 md:items-center flex-col md:flex-row items-start gap-2 md:gap-4">
        <h3 className="lg:text-lg text-base font-semibold flex-none">
          Username
        </h3>
        <div className="flex items-center gap-x-4 w-full justify-end max-w-xl">
          {isEdit.username ? (
            <Input className="h-8 md:h-10" value={"jhon"} />
          ) : (
            <p className="text-sm md:text-base">jhon</p>
          )}
          <Button
            size={"icon"}
            className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70 flex-none h-8 w-8 md:h-10 md:w-10"
            onClick={() => onEdit("username", isEdit.username)}
          >
            {isEdit.username ? (
              <Save className="md:w-5 md:h-5 w-4 h-4" />
            ) : (
              <Edit className="md:w-5 md:h-5 w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>
      <Card className="flex justify-between p-4 lg:p-6 md:items-center flex-col md:flex-row items-start gap-2 md:gap-4">
        <h3 className="lg:text-lg text-base font-semibold flex-none">Email</h3>
        <div className="flex items-center gap-x-4 w-full justify-end max-w-xl">
          {isEdit.email ? (
            <Input className="h-8 md:h-10" value={"Example@mail.com"} />
          ) : (
            <p className="text-sm md:text-base">Example@mail.com</p>
          )}
          <Button
            size={"icon"}
            className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70 flex-none h-8 w-8 md:h-10 md:w-10"
            onClick={() => onEdit("email", isEdit.email)}
          >
            {isEdit.email ? (
              <Save className="md:w-5 md:h-5 w-4 h-4" />
            ) : (
              <Edit className="md:w-5 md:h-5 w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>
      <Card className="flex justify-between p-4 lg:p-6 md:items-center flex-col md:flex-row items-start gap-2 md:gap-4">
        <h3 className="lg:text-lg text-base font-semibold flex-none">
          Nomor WhatsApp
        </h3>
        <div className="flex items-center gap-x-4 w-full justify-end max-w-xl">
          {isEdit.whatsapp ? (
            <Input className="h-8 md:h-10" value={"082226222822"} />
          ) : (
            <p className="text-sm md:text-base">0822-2622-2822</p>
          )}
          <Button
            size={"icon"}
            className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70 flex-none h-8 w-8 md:h-10 md:w-10"
            onClick={() => onEdit("whatsapp", isEdit.whatsapp)}
          >
            {isEdit.whatsapp ? (
              <Save className="md:w-5 md:h-5 w-4 h-4" />
            ) : (
              <Edit className="md:w-5 md:h-5 w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>
      <Card className="flex bg-red-100 dark:bg-red-800/70 justify-between p-4 lg:p-6 md:items-center flex-col md:flex-row items-start gap-2 md:gap-4">
        <h3 className="lg:text-lg text-base font-semibold flex-none text-red-500 dark:text-white">
          Hapus Akun
        </h3>
        <div className="flex items-center w-full justify-end max-w-xl">
          <Button
            className="flex-none h-8 md:h-10 dark:bg-red-500"
            variant={"destructive"}
            onClick={() => onOpen("delete-akun")}
          >
            <Trash2 className="md:w-5 md:h-5 w-4 h-4 mr-2" />
            Hapus Akun
          </Button>
        </div>
      </Card>
    </div>
  );
};
