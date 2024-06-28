"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useTheme } from "next-themes";
import {
  calculateLuminance,
  hexToRgb,
  hexToRgba,
  isDarkColor,
  lightenColor,
} from "@/lib/color-check";

interface LabelChatProps {
  name: string;
  color: string;
}

export const LabelChat = ({ color, name }: LabelChatProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  const handleBackgroundDark = () => {
    return hexToRgba(
      isDarkColor(color) ? lightenColor(color, 40) : color,
      0.5 -
        calculateLuminance(
          hexToRgb(color)?.r ?? 0,
          hexToRgb(color)?.g ?? 0,
          hexToRgb(color)?.b ?? 0
        )
    );
  };
  const handleColorLight = () => {
    return isDarkColor(color) ? "#fff" : "#000";
  };
  const handleColorDark = () => {
    return isDarkColor(color)
      ? lightenColor(
          color,
          80 -
            calculateLuminance(
              hexToRgb(color)?.r ?? 0,
              hexToRgb(color)?.g ?? 0,
              hexToRgb(color)?.b ?? 0
            ) *
              100
        )
      : color;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <Badge
      style={{
        background: theme === "light" ? color : handleBackgroundDark(),
        border:
          theme === "light" ? "none" : `1px solid ${lightenColor(color, 50)}`,
        color: theme === "light" ? handleColorLight() : handleColorDark(),
      }}
      className="py-0.5 font-normal"
    >
      {name}
    </Badge>
  );
};
