import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Car Rental",
  description: "Luxury and reliable car rental services for your journey",
  keywords: "car rental, luxury cars, premium vehicles, rent a car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="px-4 md:px-16 lg:px-72 bg-[#F1EFEA] font-custom2 bg-gradient-to-b from-[#F1EFEA] to-[#ffdcd0] min-h-screen h-full overflow-x-hidden selection:bg-[#AA4D2B]/20 selection:text-[#1C1F20]">
        {children}
      </body>
    </html>
  );
}
