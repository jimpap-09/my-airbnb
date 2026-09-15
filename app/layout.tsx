import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/loginModal";
import RegisterModal from "./components/modals/registerModal"
import ToasterProvider from "./providers/toasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {

  const currentUser = await getCurrentUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
