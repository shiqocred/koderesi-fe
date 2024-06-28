"use client";

import { Button } from "@/components/ui/button";
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
        "https://koderesi.raventech.my.id/api/auth/logout",
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
    <Button variant={"destructive"} onClick={handleLogOut}>
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};
