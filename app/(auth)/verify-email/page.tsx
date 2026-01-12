"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleResend = () => {
    // In production, this would resend the email
    // For demo, simulate email verification after 2 seconds
    setTimeout(() => {
      router.push("/email-verified");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#2466eb] flex items-center justify-center">
            <span className="w-4 h-4 bg-white rounded" />
          </span>
          <span className="text-xl font-bold text-foreground">ZitoPay</span>
        </Link>
      </div>

      {/* Verify Email Card */}
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#2466eb]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#2466eb]" />
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-foreground mb-3">Check your email</h1>
          <p className="text-sm text-muted-foreground mb-8">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>

          {/* Resend Button */}
          <button
            type="button"
            onClick={handleResend}
            className="w-full py-3 bg-[#2466eb] text-white rounded-lg font-semibold hover:bg-[#1d52c7] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-4"
          >
            Resend Verification Email
          </button>

          {/* Back to Login */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}
