import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-4 py-8">
            {/* Logo - Fixed positioning with proper spacing */}
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#2466eb] flex items-center justify-center">
                        <span className="w-3.5 h-3.5 bg-white rounded" />
                    </span>
                    <span className="text-lg font-bold text-foreground">ZitoPay</span>
                </Link>
            </div>

            {/* Content */}
            {children}
        </div>
    );
}
