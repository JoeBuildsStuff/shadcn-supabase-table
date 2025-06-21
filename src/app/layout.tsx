import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import MainHeader from "@/components/main-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn / Supabase Table",
  description: "Shadcn / Supabase Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased"
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
              <MainHeader />
              {children}
              <footer className="px-3 py-12 text-center">
                footer
              </footer>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}