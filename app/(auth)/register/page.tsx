"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would create the account and send verification code
    // For now, just navigate to verify-email-code
    router.push("/verify-email-code");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground mb-1.5">Create your account</h1>
            <p className="text-xs text-muted-foreground">
              Start accepting payments across Africa today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full px-3 pr-10 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-foreground mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full px-3 pr-10 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
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

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-border text-[#2466eb] focus:ring-2 focus:ring-[#2466eb]"
                required
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-[#2466eb] hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#2466eb] hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2466eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#2466eb] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-4 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Bank-grade security standards</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 ZitoPay Financial Systems. All rights reserved.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
