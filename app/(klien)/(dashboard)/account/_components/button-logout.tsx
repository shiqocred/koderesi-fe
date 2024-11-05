"use client";

import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const ButtonLogout = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cookies = useCookies();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      toast.success("Logout berhasil");
      cookies.remove("accessToken");
      router.push("/auth/login");
    } catch (error) {
      console.log("ERROR_LOGOUT");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return;
  }
  return (
    <Button
      variant={"destructive"}
      onClick={handleLogOut}
      className="md:w-auto w-10 p-0 md:px-3 md:py-2"
    >
      <LogOut className="w-4 h-4 md:mr-2" />
      <p className="hidden md:flex">Logout</p>
    </Button>
  );
};
