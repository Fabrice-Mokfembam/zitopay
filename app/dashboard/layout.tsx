"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-foreground">Loading...</p>
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
