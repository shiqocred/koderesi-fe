"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Moon, Sun, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { LogoShrinkIcon } from "@/components/svg";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

const Loginpage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const cookies = useCookies();
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = input;
    try {
      await axios
        .post(`https://koderesi.raventech.my.id/api/auth/login`, body)
        .then((res: any) => {
          toast.success("Login berhasil.");
          cookies.set("accessToken", res.data.access_token);
          if (res.data.role === "superadmin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        });
    } catch (error: any) {
      console.log("[ERROR_LOGIN]:", error);
      setInput((prev) => ({ ...prev, password: "" }));
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Login gagal.
                </h5>
                <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                  <li>{error.response.data.message}</li>
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    }
  };

  const onChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "Loading...";
  }
  return (
    <div className="max-w-lg w-full flex flex-col -mt-12">
      <div className="flex justify-between items-center py-3 px-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <LogoShrinkIcon className="h-4 " />
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Login</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          className="p-0 h-6 w-6 hover:bg-transparent group"
          variant={"ghost"}
          onClick={onChangeTheme}
        >
          {theme === "light" && (
            <Moon className="w-5 h-5 group-hover:fill-black transition-all" />
          )}
          {theme === "dark" && (
            <Sun className="w-5 h-5 group-hover:fill-white transition-all" />
          )}
        </Button>
      </div>
      <div className="dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-6 md:p-8 xl:p-12 w-full rounded-md flex flex-col gap-7 md:gap-10 xl:gap-16">
        <div className="flex flex-col items-center gap-4 xl:gap-6 pt-5 md:pt-8 xl:pt-10">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-black leading-none text-center">
              SELAMAT DATANG
            </h1>
            <p className="text-sm md:text-base">
              Silahkan masukan data yang valid
            </p>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 md:gap-5 xl:gap-8"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0.5 md:gap-1 relative">
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
                value={input.email}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
              />
            </div>
            <div className="space-y-0.5 md:space-y-1 relative">
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
              <div className="relative flex items-center peer">
                <Input
                  value={input.password}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, password: e.target.value }))
                  }
                  type={!isVisible ? "password" : "text"}
                  className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
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
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black"
          >
            Masuk
          </Button>
        </form>
        <div className="flex flex-col gap-1 items-center pt-4 pb-2 md:pb-0 md:pt-7 xl:pt-10">
          <Link href="/auth/forgot-password">
            <span className="text-xs md:text-sm font-semibold hover:underline">
              Lupa Password?
            </span>
          </Link>
          <p className="text-xs md:text-sm text-center">
            Belum punya akun?
            <Link
              href="/auth/register"
              className="font-semibold underline ml-1"
            >
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
