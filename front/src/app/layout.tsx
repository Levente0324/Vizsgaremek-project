import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car rental app",
  description: "Car rental app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="px-4 md:px-64 pt-2 bg-[#F1EFEA] font-custom2 bg-gradient-to-b from-[#F1EFEA] to-[#ffd6c8] min-h-screen h-full">
        {children}
      </body>
    </html>
  );
}
