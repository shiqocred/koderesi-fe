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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoShrinkIcon } from "@/components/svg";
import { cn, optionToast } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCookies } from "next-client-cookies";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTheme } from "next-themes";
import { ToastError } from "@/components/toast-error";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password min length 6 required",
    }),
    password_confirmation: z.string().min(6, {
      message: "Password min length 6 required",
    }),
  })
  .required();

const ResetPasswordPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const cookies = useCookies();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body = {
      token: params.token,
      email: searchParams.get("email"),
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    try {
      await axios.post(
        `https://koderesi.raventech.my.id/api/reset-password`,
        body
      );
      toast.success("Password berhasil diperbarui.");
      router.push("/auth/login");
    } catch (error) {
      console.log("[ERROR_RESET_PASSWORD]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Password gagal diperbarui" error={error} t={t} />
        ),
        optionToast
      );
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
              <BreadcrumbPage>Atur Ulang Password</BreadcrumbPage>
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
      <div className=" dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-6 md:p-8 xl:p-12 w-full rounded-md flex flex-col gap-10 pt-12 pb-10">
        <div className="flex flex-col items-center gap-4 xl:gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black leading-none text-center">
              Atur Ulang Password
            </h1>
            <p className="text-sm md:text-base text-center">
              Password baru harus berbeda dari sebelumnya.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 xl:gap-8"
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="password"
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
                      Paswword Baru
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center peer">
                        <Input
                          {...field}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
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
                      Konfirmasi Paswword Baru
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center peer">
                        <Input
                          {...field}
                          type={!isVisibleConfirmation ? "password" : "text"}
                          className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                disabled={countdown !== null && countdown > 0}
                className="w-full bg-green-500 hover:bg-green-400 text-black"
              >
                Buat Password Baru
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
