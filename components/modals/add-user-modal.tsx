"use client";

import React, { FormEvent, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export const AddUserModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const isModalOpen = isOpen && type === "add-user";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const handleReset = () => {
    setInput({
      name: "",
      email: "",
      password: "",
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://koderesi.raventech.my.id/api/superadmin/pengguna/store",
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
      cookies.set("new", "added");
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ADD_USER]:", error);
    }
  };

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
        <div className="flex flex-col gap-2 md:gap-4 md:mt-4">
          <div className="flex flex-col gap-1 w-full">
            <Label>Nama Lengkap</Label>
            <Input
              className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              value={input.name}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label>Email</Label>
            <Input
              type="email"
              className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
              value={input.email}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label>Password</Label>
            <Input
              className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
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