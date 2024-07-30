"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { cn, generateRandomHex } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useTheme } from "next-themes";
import {
  calculateLuminance,
  hexToRgb,
  hexToRgba,
  isDarkColor,
  lightenColor,
} from "@/lib/color-check";

export const AddLabelModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [input, setInput] = useState({
    name: "",
    color: "",
  });
  const router = useRouter();

  const isModalOpen = isOpen && type === "add-label";
  const cookies = useCookies();
  const token = cookies.get("accessToken");

  const handleReset = () => {
    setInput({
      name: "",
      color: "",
    });
  };

  const { theme } = useTheme();

  const handleBackgroundDark = () => {
    return hexToRgba(
      isDarkColor(input.color) ? lightenColor(input.color, 40) : input.color,
      0.5 -
        calculateLuminance(
          hexToRgb(input.color)?.r ?? 0,
          hexToRgb(input.color)?.g ?? 0,
          hexToRgb(input.color)?.b ?? 0
        )
    );
  };
  const handleColorLight = () => {
    return isDarkColor(input.color) ? "#fff" : "#000";
  };
  const handleColorDark = () => {
    return isDarkColor(input.color)
      ? lightenColor(
          input.color,
          80 -
            calculateLuminance(
              hexToRgb(input.color)?.r ?? 0,
              hexToRgb(input.color)?.g ?? 0,
              hexToRgb(input.color)?.b ?? 0
            ) *
              100
        )
      : input.color;
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

  useEffect(() => {
    setInput((prev) => ({ ...prev, color: `#${generateRandomHex()}` }));
  }, [isModalOpen]);

  return (
    <Modal
      title="Tambah Label Baru"
      description="Tambah label baru disini"
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
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm z-10",
                input.name.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              Nama Label
            </Label>
            <Input
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent z-20"
              value={input.name}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-4 w-full relative">
            <Label
              className={cn(
                "absolute transition-all text-gray-700 dark:text-white/70 text-sm z-10",
                input.color.length === 0
                  ? "translate-y-3.5 left-3 font-normal"
                  : "-translate-y-3 left-0 font-semibold"
              )}
            >
              Warna
            </Label>
            <Input
              className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent z-20"
              value={input.color.toUpperCase()}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, color: e.target.value }))
              }
            />
            <Button
              className="w-10 h-10 p-0 flex-none"
              style={{
                background:
                  theme === "light" ? input.color : handleBackgroundDark(),
                border:
                  theme === "light"
                    ? "none"
                    : `1px solid ${lightenColor(input.color, 50)}`,
                color:
                  theme === "light" ? handleColorLight() : handleColorDark(),
              }}
              onClick={() =>
                setInput((prev) => ({
                  ...prev,
                  color: `#${generateRandomHex()}`,
                }))
              }
            >
              <RefreshCcw className="w-5 h-5" />
            </Button>
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
