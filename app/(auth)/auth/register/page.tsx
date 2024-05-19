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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password min length 8 required",
    }),
  })
  .required();

const RegisterPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post(
          `http://koderesi.raventech.my.id/api/auth/registerFromAdmin`,
          values
        )
        .then((res: any) => {
          toast.success("Register berhasil.");
          router.push("/auth/login");
        });
    } catch (error) {
      console.log("[ERROR_REGISTER]:", error);
      toast.error("Register gagal.");
    }
  };
  return (
    <div className="max-w-lg dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-2 md:p-4 w-full rounded-md flex flex-col gap-6">
      <div className="w-full justify-center flex items-start flex-col">
        <h1 className="text-xl md:text-2xl font-bold leading-none">
          Gabunglah bersama kami
        </h1>
        <p className="text-xs md:text-sm">Silahkan masukan data yang valid</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0.5 md:space-y-1">
                <FormLabel className="text-xs md:text-sm">Name</FormLabel>
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
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black"
          >
            Daftar
          </Button>
          <p className="text-xs md:text-sm text-center py-4">
            Sudah punya akun?
            <Link href="/auth/login" className="font-semibold underline ml-1">
              login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
