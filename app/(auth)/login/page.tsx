"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground mb-1.5">Welcome back</h1>
            <p className="text-xs text-muted-foreground">
              Access your dashboard to manage payments securely.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2466eb] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#2466eb] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2466eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-[#2466eb] hover:underline">
              Register now
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5" />
          <span>Secured by 256-bit encryption</span>
        </div>
      </div>
    </AuthLayout>
  );
}
