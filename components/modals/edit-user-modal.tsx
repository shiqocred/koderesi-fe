"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useLocalStorage } from "@/hooks/use-localstorage";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { cn } from "@/lib/utils";

export const EditUserModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    whatsapp: "",
  });
  const router = useRouter();

  const isModalOpen = isOpen && type === "edit-user";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const handleReset = () => {
    setInput({
      name: "",
      email: "",
      password: "",
      whatsapp: "",
    });
  };

  const getDetail = async () => {
    try {
      const res = await axios.get(
        `https://koderesi.raventech.my.id/api/superadmin/pengguna/show/${data}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataDetail = res.data.data;
      setInput((prev) => ({
        ...prev,
        name: dataDetail?.name,
        email: dataDetail?.email,
      }));
    } catch (error) {
      console.log("[ERROR_GET_DETAIL_USER]:", error);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/pengguna/update/${data}`,
        input,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User added.");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ADD_USER]:", error);
    }
  };

  useEffect(() => {
    data && getDetail();
  }, [isModalOpen]);

  return (
    <Modal
      title="Tambah User Baru"
      description="Tambah user baru disini"
      isOpen={isModalOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 md:mt-4">
          <div className="flex flex-col gap-1 w-full relative">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                input.name.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              Nama Lengkap
            </Label>
            <Input
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              value={input.name}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full relative">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                input.email.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              Email
            </Label>
            <Input
              type="email"
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              value={input.email}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full relative">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                input.whatsapp.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              No. WhatsApp
            </Label>
            <Input
              type="number"
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              value={input.whatsapp}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, whatsapp: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full relative">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                input.password.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              Password
            </Label>
            <Input
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              value={input.password}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            className="w-full bg-green-400 hover:bg-green-500 text-gray-900"
            type="submit"
          >
            Tambah
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              onClose();
              handleReset();
            }}
            type="button"
          >
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
