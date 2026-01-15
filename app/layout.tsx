import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { LanguageProvider } from "@/core/i18n/LanguageProvider";
import { AuthCookieSync } from "@/components/AuthCookieSync";
import { Toaster } from "sonner";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Theme restoration - must run before body renders
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Language restoration
                  const savedLang = localStorage.getItem('language');
                  const lang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';
                  document.documentElement.lang = lang;
                } catch (error) {
                  // If localStorage fails, use defaults
                  console.error('Failed to restore theme/language:', error);
                  document.documentElement.lang = 'en';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "'Inter', Arial, Helvetica, sans-serif" }}
        suppressHydrationWarning
      >
        <Toaster position="top-right" richColors />
        <QueryProvider>
          <AuthProvider>
            <AuthCookieSync />
            <LanguageProvider>{children}</LanguageProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
