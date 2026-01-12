"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export function DashboardNavbar() {
    const { user } = useAuthContext();
    const [isSandboxMode, setIsSandboxMode] = useState(true);

    // Get user initials
    const getInitials = (email: string) => {
        if (!email) return "U";
        const parts = email.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return email.substring(0, 2).toUpperCase();
    };

    return (
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 pl-16 lg:pl-6">
            {/* Left: Greeting */}
            <div>
                <h2 className="text-base font-semibold text-foreground">
                    Hi, {user?.email?.split('@')[0] || 'User'}
                </h2>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Language Selector - Hidden on mobile */}
                <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                    <span>English</span>
                    <ChevronDown className="w-3 h-3" />
                </button>

                {/* Sandbox/Live Mode Toggle - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-full">
                    <span className="text-xs font-semibold uppercase text-orange-600 dark:text-orange-400">
                        {isSandboxMode ? 'Sandbox Mode' : 'Live Mode'}
                    </span>
                    <button
                        onClick={() => setIsSandboxMode(!isSandboxMode)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${isSandboxMode ? 'bg-gray-300 dark:bg-gray-600' : 'bg-green-500'
                            }`}
                        aria-label="Toggle sandbox mode"
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isSandboxMode ? 'translate-x-0' : 'translate-x-5'
                                }`}
                        />
                    </button>
                </div>

                {/* Theme Toggle - Hidden on mobile */}
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>

                {/* User Avatar - Always visible */}
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email ? getInitials(user.email) : 'U'}
                </div>

            </div>
        </header>
    );
}
