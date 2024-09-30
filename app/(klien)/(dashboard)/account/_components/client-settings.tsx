"use client";

import { FormEvent, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Eye, EyeOff, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn, optionToast } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ToastError } from "@/components/toast-error";

export const ClientSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const { onOpen } = useModal();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleOld, setIsVisibleOld] = useState(false);

  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<FileList | null>(null);

  const [data, setData] = useState({
    username: "",
    email: "",
    whatsapp: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleGetProfile = async () => {
    try {
      const res = await axios.get(
        "https://koderesi.raventech.my.id/api/admin/profile",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prev) => ({
        ...prev,
        username: res.data.data.name ?? "",
        email: res.data.data.email ?? "",
        whatsapp: res.data.data.phone_number ?? "",
      }));
      setImageUrl(res.data.data.image_url);
    } catch (error) {
      console.log("[ERROR_GET_Profile]:", error);
    }
  };

  const formUpload = async (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    if (image) {
      body.append("image", image[0]);
    }
    try {
      const res = await axios.post(
        "https://koderesi.raventech.my.id/api/admin/profile/update-image",
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      cookies.set("update profile", "1");
      setImage(null);
      toast.success("Image berhasil diupdate");
    } catch (error: any) {
      toast.custom(
        (t) => (
          <ToastError label="Image gagal di approve" error={error} t={t} />
        ),
        optionToast
      );
      console.log("[ERROR_UPDATE_IMAGE]:", error);
    }
  };

  useEffect(() => {
    if (cookies.get("update profile")) {
      handleGetProfile();
      return cookies.remove("update profile");
    }
  }, [cookies.get("update profile")]);
  useEffect(() => {
    setIsMounted(true);
    handleGetProfile();
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
              {!imageUrl && !image && (
                <div className="relative aspect-square overflow-hidden rounded-md w-20">
                  <Image
                    src={"/avatar.webp"}
                    className="object-cover"
                    fill
                    alt=""
                  />
                </div>
              )}
              {imageUrl && !image && (
                <div className="relative aspect-square overflow-hidden rounded-md w-20">
                  <Image src={imageUrl} className="object-cover" fill alt="" />
                </div>
              )}
              {(imageUrl || !imageUrl) && image && (
                <div className="relative aspect-square overflow-hidden rounded-md w-20">
                  <Image
                    src={URL.createObjectURL(image[0])}
                    className="object-cover"
                    fill
                    alt=""
                  />
                </div>
              )}
              <form
                onSubmit={formUpload}
                className="flex-col flex gap-4 w-full"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Label htmlFor="image">
                    <div className="bg-transparent flex items-center px-4 py-2 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-gray-500 text-black dark:text-white w-full md:w-auto">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </div>
                    <Input
                      id="image"
                      onChange={(e) => setImage(e.target.files)}
                      className="hidden"
                      type="file"
                    />
                  </Label>
                  {image && (
                    <Button
                      type="button"
                      onClick={() => setImage(null)}
                      className="bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-500 dark:border-red-500/50 text-red-500 w-10 md:w-auto p-0 md:px-3 md:py-2 flex-none"
                    >
                      <Trash2 className="h-4 w-4 md:mr-2" />
                      <p className="hidden md:flex">Hapus</p>
                    </Button>
                  )}
                </div>
                <p className="text-xs font-light">
                  *Rekomendasi resolusi 1:1, hingga 5MB
                </p>
                {image && (
                  <Button
                    type="submit"
                    className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700 w-full border dark:border-gray-700 border-gray-400"
                  >
                    <Save className="w-4 h-4  mr-2" />
                    Simpan
                  </Button>
                )}
              </form>
            </div>
          </Card>
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <div className="flex items-center">
              <h5 className="font-medium text-lg">Atur Data Diri Anda</h5>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full gap-4 flex flex-col"
            >
              <div className="flex items-start flex-col gap-6 w-full">
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.username.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-light"
                    )}
                  >
                    Name
                  </Label>
                  <Input
                    value={data.username}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
                  />
                </div>
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.email.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-light"
                    )}
                  >
                    Email
                  </Label>
                  <Input
                    value={data.email}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    type="email"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
                  />
                </div>
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.whatsapp.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-light"
                    )}
                  >
                    WhatsApp
                  </Label>
                  <Input
                    value={data.whatsapp}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, whatsapp: e.target.value }))
                    }
                    type="number"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
                  />
                </div>
              </div>

              <div className="w-full justify-between flex dark:bg-gray-800 rounded md:px-3 py-1 md:items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 px-2">
                <p className="text-sm dark:text-gray-300">
                  Periksa terlebih dahulu sebelum konfirmasi.
                </p>
                <Button
                  type="submit"
                  onClick={() =>
                    onOpen("edit-personal", {
                      name: data.username,
                      email: data.email,
                      phone_number: data.whatsapp,
                      old_password: data.old_password,
                      password: data.new_password,
                      password_confirmation: data.confirm_password,
                    })
                  }
                  className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700 border dark:border-gray-700 border-gray-400"
                >
                  <Save className="w-4 h-4  mr-2" />
                  Simpan
                </Button>
              </div>
            </form>
          </Card>
          <Card className="md:p-5 flex flex-col gap-6 w-full bg-transparent border-gray-300 dark:border-gray-700 border p-3">
            <div className="flex items-center">
              <h5 className="font-medium text-lg">Atur Password Baru</h5>
            </div>
            <form
              className="w-full gap-4 flex flex-col"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex items-start flex-col gap-6 w-full">
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.old_password.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Password Lama
                  </Label>
                  <div className="relative flex items-center peer w-full">
                    <Input
                      type={!isVisibleOld ? "password" : "text"}
                      value={data.old_password}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          old_password: e.target.value,
                        }))
                      }
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                    />
                    <Button
                      type="button"
                      className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
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
                </div>
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.new_password.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Password Baru
                  </Label>
                  <div className="relative flex items-center peer w-full">
                    <Input
                      type={!isVisible ? "password" : "text"}
                      value={data.new_password}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          new_password: e.target.value,
                        }))
                      }
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                    />
                    <Button
                      type="button"
                      className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
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
                </div>
                <div className="space-y-0.5 md:space-y-1 relative w-full">
                  <Label
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      data.confirm_password.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Konfirmasi Password Baru
                  </Label>
                  <div className="relative flex items-center peer w-full">
                    <Input
                      type={!isVisibleConfirmation ? "password" : "text"}
                      value={data.confirm_password}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          confirm_password: e.target.value,
                        }))
                      }
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full"
                    />
                    <Button
                      type="button"
                      className="h-auto p-1 rounded right-1.5 absolute hover:bg-transparent"
                      variant={"ghost"}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsVisibleConfirmation(!isVisibleConfirmation);
                      }}
                    >
                      {!isVisibleConfirmation ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  {data.confirm_password.length > 0 &&
                    data.new_password !== data.confirm_password && (
                      <p className="text-red-500 text-xs">
                        Konfirmasi Password tidak sesuai
                      </p>
                    )}
                </div>
              </div>

              <div className="w-full justify-between flex dark:bg-gray-800 rounded md:px-3 py-1 md:items-center bg-gray-100 flex-col md:flex-row gap-3 md:gap-0 px-2">
                <p className="text-sm dark:text-gray-300">
                  Periksa terlebih dahulu sebelum konfirmasi.
                </p>
                <Button
                  type="submit"
                  disabled={data.new_password !== data.confirm_password}
                  onClick={() =>
                    onOpen("edit-password", {
                      name: data.username,
                      email: data.email,
                      phone_number: data.whatsapp,
                      old_password: data.old_password,
                      password: data.new_password,
                      password_confirmation: data.confirm_password,
                    })
                  }
                  className="bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700 border dark:border-gray-700 border-gray-400"
                >
                  <Save className="w-4 h-4  mr-2" />
                  Simpan
                </Button>
              </div>
            </form>
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
                  onClick={() => onOpen("delete-account")}
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
