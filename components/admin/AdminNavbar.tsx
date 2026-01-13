"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Bell,
    User,
    Settings,
    Shield,
    Activity,
    LogOut,
    ChevronDown,
} from "lucide-react";

export function AdminNavbar() {
    const router = useRouter();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const notifications = [
        {
            type: "kyb",
            title: "New KYB Submission",
            message: "ABC Corp submitted KYB",
            time: "5 mins ago",
            color: "bg-orange-500",
        },
        {
            type: "production",
            title: "Production Request",
            message: "XYZ Ltd requested production",
            time: "10 mins ago",
            color: "bg-green-500",
        },
        {
            type: "reconciliation",
            title: "Reconciliation Issue",
            message: "Settlement mismatch detected",
            time: "15 mins ago",
            color: "bg-red-500",
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("zitopay_admin_auth");
        router.push("/admin/login");
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left - Platform Branding */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">ZitoPay Admin</span>
                </div>
            </div>

            {/* Center - Global Search */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search merchants, transactions..."
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />

                    {/* Search Results Dropdown */}
                    {showSearch && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                            <div className="p-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                    Merchants (3)
                                </p>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm">
                                        <p className="font-medium text-gray-900">ABC Corp</p>
                                        <p className="text-xs text-gray-500">#M-123</p>
                                    </button>
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm">
                                        <p className="font-medium text-gray-900">XYZ Ltd</p>
                                        <p className="text-xs text-gray-500">#M-456</p>
                                    </button>
                                </div>

                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-4">
                                    Transactions (2)
                                </p>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm">
                                        <p className="font-medium text-gray-900">#TX-001</p>
                                        <p className="text-xs text-gray-500">10,000 FCFA</p>
                                    </button>
                                </div>

                                <button className="w-full mt-4 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                                    View All Results →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right - Notifications & Profile */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map((notif, index) => (
                                    <button
                                        key={index}
                                        className="w-full p-4 hover:bg-gray-50 border-b border-gray-100 text-left transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-2 h-2 ${notif.color} rounded-full mt-1.5`}></div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                                                <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                            </div>
                                            <button className="text-xs font-medium text-blue-600 hover:underline">
                                                View
                                            </button>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-3 border-t border-gray-200 flex gap-2">
                                <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                                    Mark All as Read
                                </button>
                                <button className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                                    View All →
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Admin User</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {showProfile && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl">
                            <div className="p-4 border-b border-gray-200">
                                <p className="font-semibold text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500 mt-0.5">admin@zitopay.com</p>
                                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium inline-block">
                                    Super Admin
                                </div>
                            </div>

                            <div className="p-2">
                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                                    <User className="w-4 h-4" />
                                    My Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                                    <Shield className="w-4 h-4" />
                                    Security
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                                    <Activity className="w-4 h-4" />
                                    Activity Log
                                </button>
                            </div>

                            <div className="p-2 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg text-sm text-red-600 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
