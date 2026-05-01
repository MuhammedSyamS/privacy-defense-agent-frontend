'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  return (
    <html lang="en">
      <body className={cn(inter.variable, "font-sans bg-[#0B0F19] text-white antialiased")}>
        <AuthProvider>
          {isAuthPage ? (
            <>{children}</>
          ) : (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                  <div className="max-w-[1600px] mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
