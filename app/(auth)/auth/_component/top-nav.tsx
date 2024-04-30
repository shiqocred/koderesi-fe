"use client";

import { LogoExpandIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const TopNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 flex w-full justify-between px-5 py-4 items-center">
      <a href="/">
        <LogoExpandIcon className="h-8" />
      </a>
      <div className="flex rounded-md bg-gray-300 dark:bg-gray-500 p-1">
        <Button
          className={cn(
            "w-20 h-8 p-0 disabled:opacity-100 dark:bg-gray-900 dark:text-white",
            !pathname.includes("login") &&
              "bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-black"
          )}
          onClick={() => router.push("login")}
          disabled={pathname.includes("login")}
        >
          Login
        </Button>
        <Button
          className={cn(
            "w-20 h-8 p-0 disabled:opacity-100 dark:bg-gray-900 dark:text-white",
            !pathname.includes("register") &&
              "bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-black"
          )}
          onClick={() => router.push("register")}
          disabled={pathname.includes("register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
