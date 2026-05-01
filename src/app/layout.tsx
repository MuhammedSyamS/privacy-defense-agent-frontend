import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientLayout from "@/components/ClientLayout";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ScamShield Agent — Neural Cyber Intelligence",
  description: "Autonomous cybersecurity agent powered by Cloudflare Workers AI. Detect scams, phishing, and deepfakes in real-time.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={cn(inter.variable, "font-sans bg-[#0B0F19] text-white antialiased")}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
