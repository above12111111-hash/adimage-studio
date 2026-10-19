import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdImage Studio",
  description: "Генератор рекламних візуалів для Facebook та Instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}