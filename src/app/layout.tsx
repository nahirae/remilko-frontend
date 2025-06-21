// src/app/layout.tsx (Contoh, sesuaikan dengan file Anda)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Pastikan Navbar diimpor di sini
// import Footer from "@/components/Footer"; // Jika Anda ingin Footer global juga, import di sini

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remilko Admin",
  description: "Dashboard Admin Remilko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Navbar akan dirender di sini, global untuk semua halaman */}
        {children} {/* Ini akan merender konten dari page.tsx Anda */}
        {/* <Footer /> Jika Anda ingin Footer global juga, render di sini */}
      </body>
    </html>
  );
}