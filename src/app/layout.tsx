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
  description: "Tanstack Table with Shadcn / UI and Supabase",

  // Open Graph meta tags for social media sharing
  openGraph: {
    title: "Shadcn / Supabase Table",
    description: "Tanstack Table with Shadcn / UI and Supabase",
    url: "https://shadcn-supabase-table.vercel.app/",
    siteName: "Shadcn / Supabase Table",
    images: [
      {
        url: "/og-image.png",
        width: 1550,
        height: 1318,
        alt: "Shadcn / Supabase Table",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "Shadcn / Supabase Table",
    description: "Tanstack Table with Shadcn / UI and Supabase",
    images: ["/og-image.png"], // Same image as Open Graph
    creator: "@joetaylor_86753", // Replace with your Twitter handle (optional)
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
  
  // Favicon and other icons
  icons: {
    icon: "/favicon.ico",
  },
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