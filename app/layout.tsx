import type { Metadata } from "next";
import Image from 'next/image';
import UVLogo from '@/public/KnoLabs_logo.png';
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Ultravox Demo",
  description: "Demonstration of using the Ultravox API to create a call with an AI agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="bg-black text-white">
        <div className="flex mx-auto justify-between my-4 max-w-[1206px]">
          <div className="flex items-center">
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
