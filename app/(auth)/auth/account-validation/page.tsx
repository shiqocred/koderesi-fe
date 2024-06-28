"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LogoShrinkIcon } from "@/components/svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckSquare, CheckSquare2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ForgotPasswordPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();

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
              <BreadcrumbPage>Account Validation</BreadcrumbPage>
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
      <div className=" dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-6 md:p-8 w-full rounded-md flex flex-col gap-14">
        <div className="flex flex-col items-center gap-4 xl:gap-10 pt-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black leading-none text-center">
              Step Terakhir Untuk Memulai
            </h1>
            <p className="text-sm md:text-base text-center">
              Silahkan klik tautan validasi yang kami kirimkan pada email dan
              whatsapp anda.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-4 text-sm font-light">
              <CheckSquare className="w-4 h-4" />
              Email Tervalidasi
            </p>
            <p className="flex items-center gap-4 text-sm font-light">
              <CheckSquare className="w-4 h-4 text-gray-400" />
              WhatsApp Belum Tervalidasi
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Button className="text-xs md:text-sm text-center font-semibold underline ml-1 bg-transparent hover:bg-transparent dark:text-white/70 text-black/70 hover:text-black dark:hover:text-white">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
