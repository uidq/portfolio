import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import Navbar from "@/components/ui/navbar";

import Footer from "@/components/ui/footer";

import { EnhancedFallingStars } from "@/components/pre-made/cursor";

import { AOSProvider } from "@/components/pre-made/aos-provider"

import { AnimatedWaves } from "@/components/pre-made/animated-waves"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"></script>
      </head>
      <body className="text-[#e0e0e0] font-montserrat">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>   
          <AOSProvider>
            <div className="relative flex flex-col h-full">
              <main className="w-full h-full">
                {children}
              </main>
            </div>
          </AOSProvider>
        </Providers>
      </body>
    </html>
  );
}
