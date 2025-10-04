import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import ThemeChanger from "@/components/ThemeChanger";
import { SessionProvider } from "next-auth/react";
import LayoutMain from "@/components/LayoutMain";
import QueryProvider from "@/components/QueryProvider";
import { ContextProvider } from "@/components/UserContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grammy AI",
  description: "Refine your Grammer in Minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen `}
        // style={{ backgroundColor: "black" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            {/*Tanstack*/}
            <QueryProvider>
              {/*Auth*/}
              <SessionProvider>
                <ContextProvider>
                  <AppSidebar />
                  <ThemeChanger>
                    <LayoutMain>
                      <Navbar />
                      <div className="px-4">{children}</div>
                    </LayoutMain>
                  </ThemeChanger>
                </ContextProvider>
              </SessionProvider>
            </QueryProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
