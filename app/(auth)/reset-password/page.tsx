"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/password-reset-success");
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md">
                <div className="bg-background rounded-2xl shadow-xl border border-border p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-[#2466eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-7 h-7 text-[#2466eb]" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground mb-1.5">Set new password</h1>
                        <p className="text-xs text-muted-foreground">
                            Your new password must be different from previously used passwords.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-foreground mb-1.5">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Must be at least 8 characters</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-medium text-foreground mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#2466eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            Reset Password
                        </button>
                    </form>

                    <div className="mt-5 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
