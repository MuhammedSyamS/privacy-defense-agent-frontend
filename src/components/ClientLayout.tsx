'use client';

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  return (
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
  );
}
