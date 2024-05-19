"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { TooltipProviderPage } from "@/providers/tooltip-provider-page";
import { ArchiveRestore } from "lucide-react";
import React from "react";

export const ArchiveButton = ({ id }: { id: string }) => {
  const { onOpen } = useModal();
  return (
    <TooltipProviderPage text="Unarchive">
      <Button
        type="button"
        aria-label="unarchive"
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 border flex items-center justify-center border-gray-500 text-gray-500 dark:bg-gray-700 dark:text-gray-200 p-0"
        onClick={() => onOpen("unarchive-resi", id)}
      >
        <ArchiveRestore className="w-4 h-4" />
      </Button>
    </TooltipProviderPage>
  );
};
