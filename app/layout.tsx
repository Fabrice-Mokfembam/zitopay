import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { QueryProvider } from "@/core/query/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZitoPay - Mobile Money Payment Gateway",
  description: "Accept MTN Mobile Money and Orange Money payments with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "'Inter', Arial, Helvetica, sans-serif" }}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
