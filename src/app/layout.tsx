// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "./providers";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ClientLayoutWrapper from "@/components/clientLayoutWrapper";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {/* ✅ Move inside ReduxProvider */}
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Toaster position="top-center" />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
