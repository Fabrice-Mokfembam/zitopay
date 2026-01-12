"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function VerifyCodePage() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/reset-password");
    };

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md">
                <div className="bg-background rounded-2xl shadow-xl border border-border p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-[#2466eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-7 h-7 text-[#2466eb]" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground mb-1.5">Enter verification code</h1>
                        <p className="text-xs text-muted-foreground">
                            We sent a code to your email address. Please enter it below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex gap-2 justify-center">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-11 h-12 text-center text-lg font-bold bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#2466eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            Verify Code
                        </button>
                    </form>

                    <div className="mt-5 text-center">
                        <p className="text-xs text-muted-foreground mb-1.5">Didn't receive the code?</p>
                        <button
                            type="button"
                            className="text-xs font-medium text-[#2466eb] hover:underline"
                        >
                            Resend Code
                        </button>
                    </div>

                    <div className="mt-5 text-center">
                        <Link
                            href="/forgot-password"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
