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
import { cn, optionToast } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { ToastError } from "../toast-error";

export const EditChatModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [input, setInput] = useState({
    message: "",
  });
  const router = useRouter();

  const isModalOpen = isOpen && type === "edit-chat";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const handleReset = () => {
    setInput({
      message: "",
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/${
          data.isAdmin ? "superadmin" : "admin"
        }/support/updateChat/${data.id}`,
        input,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Chat berhasil di edit.");
      cookies.set("chat updated", "1");
      onClose();
      router.refresh();
    } catch (error) {
      toast.custom(
        (t) => <ToastError label="Chat gagal di edit" error={error} t={t} />,
        optionToast
      );
      console.log("[ERROR_EDITED_CHAT]:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen && data) {
      setInput({ message: data.message });
    }
  }, [data, isModalOpen]);

  return (
    <Modal
      title="Edit Chat"
      description=""
      isOpen={isModalOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <form onSubmit={onSubmit} className="mt-6">
        <div className="flex flex-col gap-1 w-full relative">
          <Label
            className={cn(
              "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
              input.message.length === 0
                ? "translate-y-2.5 left-3 font-normal"
                : "-translate-y-6 left-0 font-semibold"
            )}
          >
            Chat
          </Label>
          <Textarea
            cols={3}
            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 rounded bg-transparent dark:bg-transparent"
            value={input.message}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, message: e.target.value }))
            }
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            className="w-full bg-green-400 hover:bg-green-500 text-gray-900"
            type="submit"
          >
            Simpan
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
