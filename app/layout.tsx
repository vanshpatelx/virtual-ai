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
        {/* <!-- Fathom - beautiful, simple website analytics --> */}
        <script src="https://cdn.usefathom.com/script.js" data-site="ONYOCTXK" defer></script>
        {/* <!-- / Fathom --> */}
      </head>
      <body className="bg-black text-white">
        <div className="flex mx-auto justify-between my-4 max-w-[1206px]">
          <div className="flex items-center">
            {/* <Image
              src={UVLogo}
              alt="Ultravox logo and wordmark"
              width={200}
            /> */}
          </div>
          <a href="mailto:support@kno2gether.com?subject=Customized%20AI%20Solutions" >
            {/* <button className="hover:bg-gray-700 px-6 py-2 border-2 rounded-[3px] w-40 mb-2">
              Get In Touch
            </button> */}
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
