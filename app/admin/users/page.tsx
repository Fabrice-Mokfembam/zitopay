"use client";

import { useState } from "react";
import {
    Users,
    UserPlus,
    MoreVertical,
    Mail,
    CheckCircle2,
    X,
    Loader2,
    Eye,
    EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAllAdmins, useCreateAdmin } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

// Helper function to get initials from email
const getInitials = (email: string): string => {
    if (!email) return "A";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
};

// Helper function to format date
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// Skeleton loader for table rows
function TableRowSkeleton() {
    return (
        <tr className="animate-pulse">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                        <div className="w-24 h-3 bg-gray-200 rounded" />
                        <div className="w-32 h-3 bg-gray-200 rounded" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="w-20 h-5 bg-gray-200 rounded-full" />
            </td>
            <td className="px-6 py-4">
                <div className="w-16 h-5 bg-gray-200 rounded-full" />
            </td>
            <td className="px-6 py-4">
                <div className="w-24 h-3 bg-gray-200 rounded" />
            </td>
            <td className="px-6 py-4 text-right">
                <div className="w-8 h-8 bg-gray-200 rounded-lg ml-auto" />
            </td>
        </tr>
    );
}

export default function AdminUsersPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Hooks
    const { data, isLoading, error } = useAllAdmins();
    const createAdminMutation = useCreateAdmin();

    const handleCreateAdmin = async () => {
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await createAdminMutation.mutateAsync({
                email: email.trim(),
                password: password,
            });
            toast.success("Admin account created successfully. Email is automatically verified.");
            setIsCreateModalOpen(false);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setShowPassword(false);
            setShowConfirmPassword(false);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || "Failed to create admin account");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-8 h-8 text-blue-600" />
                        Admin Users
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {data ? `Total admins: ${data.total}` : "Manage admin user accounts"}
                    </p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Admin
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-semibold mb-1">Error loading admin users</p>
                    <p className="text-xs text-red-600">{error.message}</p>
                </div>
            )}

            {/* Users Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Admin User</th>
                                <th className="px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email Status</th>
                                <th className="px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRowSkeleton key={index} />
                                ))
                            ) : !data?.admins || data.admins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">
                                        <p className="text-sm text-gray-500">No admin users found. Create your first admin account.</p>
                                    </td>
                                </tr>
                            ) : (
                                data.admins.map((admin) => (
                                    <tr key={admin.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                                                    {getInitials(admin.email)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">{admin.email}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                            {admin.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.emailVerified ? (
                                                <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Verified
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-orange-600 text-xs font-medium">
                                                    <Mail className="w-4 h-4" />
                                                    Unverified
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500">{formatDate(admin.createdAt)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500">{formatDate(admin.updatedAt)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Admin Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !createAdminMutation.isPending && setIsCreateModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-blue-600" />
                                    Create New Admin
                                </h2>
                                {!createAdminMutation.isPending && (
                                    <button
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                )}
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@zitopay.com"
                                            required
                                            disabled={createAdminMutation.isPending}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">The admin's email will be automatically verified and they can log in immediately.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password (min 8 characters)"
                                            required
                                            minLength={8}
                                            disabled={createAdminMutation.isPending}
                                            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={createAdminMutation.isPending}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Password must be at least 8 characters long.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            required
                                            disabled={createAdminMutation.isPending}
                                            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={createAdminMutation.isPending}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                                {!createAdminMutation.isPending && (
                                    <button
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={handleCreateAdmin}
                                    disabled={createAdminMutation.isPending || !email.trim() || !password.trim() || password !== confirmPassword}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {createAdminMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4" />
                                            Create Admin
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
