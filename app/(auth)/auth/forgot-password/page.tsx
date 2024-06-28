"use client";

import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoShrinkIcon } from "@/components/svg";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCookies } from "next-client-cookies";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const formSchema = z
  .object({
    email: z.string().email(),
  })
  .required();

const ForgotPasswordPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const cookies = useCookies();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const expires = new Date(Date.now() + 59 * 1000);
      cookies.set(
        "resetCountdown",
        Math.floor(Date.now() / 1000 + 59).toString(),
        { expires: expires }
      );
      setCountdown(59);
      toast.success("Tautan berhasil dikirim.");
    } catch (error) {
      console.log("[SEND_LINK_RESET_PASS]:", error);
      toast.error("Tautan gagal dikirim.");
    }
  };

  useEffect(() => {
    const cookie = cookies.get("resetCountdown");
    if (cookie) {
      const remainingTime =
        parseInt(cookie, 10) - Math.floor(Date.now() / 1000);
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            cookies.remove("resetCountdown");
            return null;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

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
              <BreadcrumbPage>Lupa Password</BreadcrumbPage>
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
      <div className=" dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-6 md:p-8 xl:p-12 w-full rounded-md flex flex-col gap-7 md:gap-10 xl:gap-16">
        <div className="flex flex-col items-center gap-4 xl:gap-6 pt-5 md:pt-8 xl:pt-10">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black leading-none text-center">
              Kesulitan Login?
            </h1>
            <p className="text-sm md:text-base text-center">
              Masukkan email dan kami akan mengirimi Anda tautan untuk kembali
              ke akun Anda.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 md:gap-5 xl:gap-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0.5 md:space-y-1 relative">
                  <FormLabel
                    className={cn(
                      "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
                      field.value.length === 0
                        ? "translate-y-3.5 left-3 font-normal"
                        : "-translate-y-3 left-0 font-semibold"
                    )}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                disabled={countdown !== null && countdown > 0}
                className="w-full bg-green-500 hover:bg-green-400 text-black"
              >
                Kirim Tautan
              </Button>
              {countdown !== null && countdown > 0 && (
                <p className="text-xs md:text-sm text-center text-gray-400">
                  Kirim ulang link dalam (00:
                  {countdown.toString().padStart(2, "0")}).
                </p>
              )}
            </div>
          </form>
        </Form>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 w-full text-sm text-gray-400">
            <Separator className="w-full flex-1 bg-gray-300" />
            <p>atau</p>
            <Separator className="w-full flex-1 bg-gray-300" />
          </div>
          <Link href={"/auth/register"}>
            <Button
              type="button"
              className="w-full text-gray-700 dark:text-white/70 dark:hover:text-white/80 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/20"
              variant={"ghost"}
            >
              Buat Akun Baru
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-1 items-center pt-4 md:pb-0 md:pt-7 xl:pt-10">
          <Link
            href="/auth/login"
            className="text-xs md:text-sm text-center font-semibold underline ml-1"
          >
            HALAMAN MASUK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
