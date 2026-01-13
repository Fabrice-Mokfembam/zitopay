"use client";

import { useState } from "react";
import {
    Users,
    UserPlus,
    MoreVertical,
    Shield,
    Mail,
    Lock,
    Unlock,
    Trash2,
    CheckCircle2,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "Super Admin" | "Finance Admin" | "Compliance Admin" | "Support Admin";
    status: "active" | "inactive" | "locked";
    lastLogin: string;
    avatarInitials: string;
}

// Mock Data
const MOCK_USERS: AdminUser[] = [
    {
        id: "ADM-001",
        name: "John Doe",
        email: "john@zitopay.africa",
        role: "Super Admin",
        status: "active",
        lastLogin: "5 mins ago",
        avatarInitials: "JD"
    },
    {
        id: "ADM-002",
        name: "Jane Smith",
        email: "jane@zitopay.africa",
        role: "Compliance Admin",
        status: "active",
        lastLogin: "2 hours ago",
        avatarInitials: "JS"
    },
    {
        id: "ADM-003",
        name: "Mark Support",
        email: "mark@zitopay.africa",
        role: "Support Admin",
        status: "locked",
        lastLogin: "3 days ago",
        avatarInitials: "MS"
    },
    {
        id: "ADM-004",
        name: "Sarah Finance",
        email: "sarah@zitopay.africa",
        role: "Finance Admin",
        status: "active",
        lastLogin: "1 day ago",
        avatarInitials: "SF"
    }
];

export default function AdminUsersPage() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [users, setUsers] = useState(MOCK_USERS);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "Super Admin": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Finance Admin": return "bg-green-100 text-green-700 border-green-200";
            case "Compliance Admin": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-8 h-8 text-blue-600" />
                        Admin Team Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage internal users, roles, and access permissions</p>
                </div>
                <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                >
                    <UserPlus className="w-4 h-4" />
                    Invite New Admin
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin User</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Login</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center font-semibold text-sm">
                                                {user.avatarInitials}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {user.status === 'active' ? (
                                                <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
                                                    <Lock className="w-3 h-3" />
                                                    Locked
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-gray-500">{user.lastLogin}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            <AnimatePresence>
                {isInviteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsInviteModalOpen(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
                        >
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-blue-600" />
                                    Invite New Admin
                                </h2>
                                <button
                                    onClick={() => setIsInviteModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Alex Johnson"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="alex@zitopay.africa"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Role Assignment</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['Super Admin', 'Finance Admin', 'Compliance Admin', 'Support Admin'].map((role) => (
                                            <label key={role} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all has-checked:bg-blue-50 has-checked:border-blue-500">
                                                <input type="radio" name="role" className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm font-medium text-gray-700">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsInviteModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2">
                                    <SendInviteIcon className="w-4 h-4" />
                                    Send Invitation
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SendInviteIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
    );
}
