import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yogbook — Yoga Classes & Wellness Platform",
  description:
    "Discover expert-led yoga classes, book personal appointments, and get AI-powered wellness guidance on Yogbook — the premium platform for modern yogis.",
  keywords: ["yoga", "wellness", "classes", "meditation", "mindfulness", "booking"],
  openGraph: {
    title: "Yogbook — Yoga Classes & Wellness Platform",
    description: "Premium yoga classes, bookings, and personalized wellness guidance.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-[family-name:var(--font-inter)] antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              <Toaster richColors position="top-right" />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}