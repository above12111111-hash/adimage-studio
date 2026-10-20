import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdGenix AI — Генератор Рекламних Креативів та Візуалів",
  description: "Професійний AI-інструмент для таргетологів та маркетологів. Генерація рекламних банерів та макетів для FB, IG та TikTok.",
  keywords: ["AdGenix", "AdGenix AI", "AI генератор реклами", "створити рекламний банер"],
  verification: {
    google: "cRsQl0GO8rykrxAfDsCCHUcirGqIHC11XBBYGCjbMZQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}