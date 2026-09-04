import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built with Next.js 13, Tailwind CSS, and TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientOnly>
          <Modal isOpen={true} />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
