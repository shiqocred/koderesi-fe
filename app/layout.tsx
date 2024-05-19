import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { CookiesProvider } from "next-client-cookies/server";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Koderesi",
    default: "Koderesi", // a default is required when creating a template
  },
  description: "cek resi terlengkap se-Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CookiesProvider>
            <ModalProvider />
            <ToastProvider />
            {children}
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
