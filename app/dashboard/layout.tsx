"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { motion } from "framer-motion";
import Image from "next/image";

// Dashboard layout wrapper with route protection
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Logo */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/zitopaylogo.png"
              alt="ZitoPay"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Loading Spinner */}
          <motion.div
            className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.p
            className="text-sm font-medium text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Page Content with increased padding */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
