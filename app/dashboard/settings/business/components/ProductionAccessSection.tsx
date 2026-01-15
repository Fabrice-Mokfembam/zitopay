"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    Rocket,
    Copy,
    Eye,
    EyeOff,
    X,
    AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import type { ProductionState, KYCStatus } from "@/features/merchants/types/index";

interface ProductionAccessSectionProps {
    merchantId: string;
    kycStatus: KYCStatus;
    productionState: ProductionState;
    onRequestProduction: () => void;
    isRequesting: boolean;
    productionCredentials?: {
        apiKey: string;
        secretKey: string;
    };
}

export default function ProductionAccessSection({
    kycStatus,
    productionState,
    onRequestProduction,
    isRequesting,
    productionCredentials,
}: ProductionAccessSectionProps) {
    const [showCredentialsModal, setShowCredentialsModal] = useState(!!productionCredentials);
    const [showApiKey, setShowApiKey] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const canRequestProduction = kycStatus === "APPROVED" && productionState === "NOT_REQUESTED";

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        toast.success('Copied to clipboard!', {
            description: `${field === 'apiKey' ? 'API Key' : 'Secret Key'} has been copied.`,
        });
        setTimeout(() => setCopiedField(null), 2000);
    };

    const getProductionStatusBanner = () => {
        if (kycStatus !== "APPROVED") {
            return (
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                                KYB Approval Required
                            </h4>
                            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                                You must complete KYB verification before requesting production access.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        switch (productionState) {
            case "NOT_REQUESTED":
                return (
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                    Ready for Production
                                </h4>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                    Your KYB is approved! Click the button below to request production access and
                                    start accepting real payments.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "PENDING_APPROVAL":
                return (
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                                    Production Request Pending
                                </h4>
                                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                                    Your production access request is under review. Our team will review your
                                    sandbox activity and approve your request shortly.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "ACTIVE":
                return (
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                                    Production Active 🚀
                                </h4>
                                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                    Your production environment is live! You can now accept real payments from
                                    customers.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "SUSPENDED":
                return (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
                                    Production Suspended
                                </h4>
                                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                    Your production environment has been suspended. Please contact support for
                                    assistance.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Status Banner */}
            {getProductionStatusBanner()}

            {/* Request Production Button */}
            {canRequestProduction && (
                <button
                    onClick={onRequestProduction}
                    disabled={isRequesting}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isRequesting ? (
                        <>
                            <Clock className="w-4 h-4 animate-spin" />
                            Requesting...
                        </>
                    ) : (
                        <>
                            <Rocket className="w-4 h-4" />
                            Request Production Access
                        </>
                    )}
                </button>
            )}

            {/* Production Credentials Modal */}
            {showCredentialsModal && productionCredentials && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <Rocket className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        Production Credentials
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Save these credentials securely
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCredentialsModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Warning */}
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
                                        Important: Save These Credentials Now
                                    </h4>
                                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                        These credentials will only be shown once. Make sure to copy and store them
                                        securely before closing this window.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* API Key */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Production API Key
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type={showApiKey ? "text" : "password"}
                                            value={productionCredentials.apiKey}
                                            readOnly
                                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono pr-10"
                                        />
                                        <button
                                            onClick={() => setShowApiKey(!showApiKey)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded transition-colors"
                                        >
                                            {showApiKey ? (
                                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleCopy(productionCredentials.apiKey, "apiKey")
                                        }
                                        className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                                    >
                                        <Copy className="w-3 h-3" />
                                        {copiedField === "apiKey" ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>

                            {/* Secret Key */}
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Production Secret Key
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type={showSecretKey ? "text" : "password"}
                                            value={productionCredentials.secretKey}
                                            readOnly
                                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono pr-10"
                                        />
                                        <button
                                            onClick={() => setShowSecretKey(!showSecretKey)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded transition-colors"
                                        >
                                            {showSecretKey ? (
                                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleCopy(productionCredentials.secretKey, "secretKey")
                                        }
                                        className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                                    >
                                        <Copy className="w-3 h-3" />
                                        {copiedField === "secretKey" ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowCredentialsModal(false)}
                            className="w-full mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                        >
                            I&apos;ve Saved My Credentials
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
