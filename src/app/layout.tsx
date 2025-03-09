import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnapBuy",
  description: "SnapBuy a modern ecommerce platform build with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
