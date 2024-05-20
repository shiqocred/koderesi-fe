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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password min length 6 required",
    }),
  })
  .required();

const Loginpage = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post(`https://koderesi.raventech.my.id/api/auth/login`, values)
        .then((res: any) => {
          toast.success("Login berhasil.");
          cookies.set("accessToken", res.data.access_token);
          if (res.data.role === "superadmin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        });
    } catch (error) {
      console.log("[ERROR_LOGIN]:", error);
      toast.error("Login gagal.");
    }
  };
  return (
    <div className="max-w-lg dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-2 md:p-4 w-full rounded-md flex flex-col gap-6">
      <div className="w-full justify-center flex items-start flex-col">
        <h1 className="text-xl md:text-2xl font-bold leading-none">
          Selamat Datang Kembali
        </h1>
        <p className="text-xs md:text-sm">
          Silahkan masukan email dan password yang valid
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1">
                <FormLabel className="text-xs md:text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1">
                <FormLabel className="text-xs md:text-sm">Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center peer">
                    <Input
                      {...field}
                      type={!isVisible ? "password" : "text"}
                      className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
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
          <Link href="/forgot-password">
            <span className="text-xs md:text-sm font-semibold underline">
              Lupa Password?
            </span>
          </Link>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black"
          >
            Masuk
          </Button>
          <p className="text-xs md:text-sm text-center py-4">
            Belum punya akun?
            <Link
              href="/auth/register"
              className="font-semibold underline ml-1"
            >
              register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Loginpage;
