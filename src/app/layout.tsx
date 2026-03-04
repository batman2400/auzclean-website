import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotPlaceholder from "@/components/ChatbotPlaceholder";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auzcleanservices.com.au"),
  title: {
    default: "Auzclean Services — Professional Commercial Cleaning Brisbane",
    template: "%s | Auzclean Services",
  },
  description:
    "Professional commercial cleaning services in Brisbane & Queensland. CM3 compliant, GECA certified, 15+ years experience. Request a free quote today.",
  keywords: [
    "commercial cleaning Brisbane",
    "office cleaning Queensland",
    "industrial cleaning",
    "healthcare cleaning",
    "eco-friendly cleaning",
    "Auzclean Services",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Auzclean Services — Professional Commercial Cleaning Brisbane",
    description:
      "Life Feels Better Clean. Professional cleaning driven by technology and sustainability.",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Auzclean Services — Professional Commercial Cleaning Brisbane",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatbotPlaceholder />
      </body>
    </html>
  );
}
