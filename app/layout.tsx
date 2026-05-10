import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHON FLASH — Premium DJ Experiences",
  description:
    "Premium DJ experiences for weddings, private events, nightlife, and unforgettable celebrations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-white text-black antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
