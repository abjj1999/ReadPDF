import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {AR_One_Sans} from "next/font/google"

const inter = Inter({ subsets: ["latin"] });
const ar_one_sans = AR_One_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ar_one_sans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
