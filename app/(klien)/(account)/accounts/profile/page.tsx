"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Edit, Save } from "lucide-react";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState({
    nama: false,
    email: false,
    username: false,
  });
  const onEdit = (value: string, state: boolean) => {
    setIsEdit((prev) => ({ ...prev, [value]: !state }));
  };
  console.log(isEdit);
  return (
    <div className="px-6 py-8 gap-6 flex flex-col h-full">
      <Header title="Pengaturan Akun" isAccount />
      <Card className="flex justify-between p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Image</h3>
          <Button className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70">
            Change Image
            <Edit className="h-5 w-5 ml-4" />
          </Button>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-md w-[100px]">
          <Image src={"/avatar.webp"} className="object-cover" fill alt="" />
        </div>
      </Card>
      <Card className="flex justify-between p-6 items-center">
        <h3 className="text-xl font-semibold">Nama</h3>
        <div className="flex items-center gap-x-4">
          {isEdit.nama ? <Input value={"nama"} /> : "Nama"}
          <Button
            size={"icon"}
            className="bg-gray-300 text-gray-900 hover:bg-gray-400/70 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/70 flex-none"
            onClick={() => onEdit("nama", isEdit.nama)}
          >
            {isEdit.nama ? (
              <Save className="w-5 h-5" />
            ) : (
              <Edit className="w-5 h-5" />
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
