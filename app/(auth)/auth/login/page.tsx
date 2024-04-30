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

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password min length 8 required",
    }),
  })
  .required();

const Loginpage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="max-w-lg dark:bg-white/5 bg-white/30 dark:text-white backdrop-filter backdrop-blur-xl border border-gray-500 dark:border-white p-4 w-full rounded-md flex flex-col gap-6">
      <div className="w-full justify-center flex items-start flex-col">
        <h1 className="text-2xl font-bold leading-none">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm">
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
              <FormItem>
                <FormLabel>Email</FormLabel>
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <a href="/forgot-password">
            <span className="text-sm font-semibold underline">
              Lupa Password?
            </span>
          </a>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black"
          >
            Masuk
          </Button>
          <p className="text-sm text-center py-4">
            Belum punya akun?
            <a href="/auth/register" className="font-semibold underline ml-1">
              register
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Loginpage;
