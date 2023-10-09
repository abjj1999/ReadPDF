import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {AR_One_Sans} from "next/font/google";
import { Advent_Pro } from "next/font/google";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
// const ar_one_sans = AR_One_Sans({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "PDF.AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Provider>
      <html lang="en">
      <Toaster />
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
    </ClerkProvider>
  );
}
