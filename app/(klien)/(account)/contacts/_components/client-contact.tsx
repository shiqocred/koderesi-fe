"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

export const ClientContact = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col">
      <Card className="p-2 md:p-4 flex flex-col gap-2 md:gap-6">
        <div className="flex w-full flex-col gap-1">
          <Label className="text-xs md:text-sm">Judul</Label>
          <Input
            value={title}
            disabled
            className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label className="text-xs md:text-sm">Pesan</Label>
          <Textarea
            value={message}
            disabled
            className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <Button className="bg-green-400 hover:bg-green-300 text-black">
            <Send className="w-4 h-4 mr-2" />
            Kirim
          </Button>
        </div>
      </Card>
    </div>
  );
};
