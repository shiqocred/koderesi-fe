"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

export const ClientContact = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const handleSendReport = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", title);
    body.append("message", message);
    try {
      await axios.post(
        `https://koderesi.raventech.my.id/api/admin/contact/store`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Pengaduan berhasi dikirim`);
      setTitle("");
      setMessage("");
      router.refresh();
    } catch (error) {
      console.log("[ERROR_SEND_REPORT]:", error);
      toast.error(`Pengaduan gagal dikirim`);
    }
  };
  return (
    <div className="flex h-full gap-4 md:gap-6 flex-col">
      <Card className="p-2 md:p-4 flex flex-col gap-2 md:gap-6">
        <div className="flex w-full flex-col gap-1">
          <Label className="text-xs md:text-sm">Judul</Label>
          <Input
            value={title}
            className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label className="text-xs md:text-sm">Pesan</Label>
          <Textarea
            value={message}
            className="disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 bg-transparent dark:bg-transparent"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <Button
            className="bg-green-400 hover:bg-green-300 text-black"
            onClick={(e) => {
              handleSendReport(e);
            }}
          >
            <Send className="w-4 h-4 mr-2" />
            Kirim
          </Button>
        </div>
      </Card>
      <Card className="p-2 md:p-4 flex gap-2 md:gap-6 min-h-[200px]">
        <div className="w-full flex justify-center items-center">
          <div className="text-3xl font-bold">
            <h2>Pertanyaan Yang</h2>
            <h2 className="text-green-500">Sering Ditanyakan</h2>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Accordion type="single" collapsible className="w-full max-w-xl">
            <AccordionItem value="faq-1">
              <AccordionTrigger>FAQ 1</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                voluptatem?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>FAQ 2</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                voluptatem?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>FAQ 3</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                voluptatem?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>FAQ 4</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                voluptatem?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger>FAQ 5</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                voluptatem?
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
};
