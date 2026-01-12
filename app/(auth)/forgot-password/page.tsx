"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-code");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground mb-1.5">Forgot password?</h1>
            <p className="text-xs text-muted-foreground">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">
                Email address
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

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2466eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Send Reset Code
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
