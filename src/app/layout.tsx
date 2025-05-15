import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FlipNavWrapper from "@/components/navbar";
import { BackButton } from "@/components/backButton";
import Footer from "@/components/footer";
import "./globals.css";
import { ReduxProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogs4U",
  description: "The best blogging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FlipNavWrapper />
        <BackButton />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
