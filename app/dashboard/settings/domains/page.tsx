"use client";

import { useState } from "react";
import {
    Globe,
    Plus,
    CheckCircle2,
    Clock,
    X,
    Copy,
    Check,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import { useGetDomains, useAddDomain, useVerifyDomain } from "@/features/merchants/hooks/useDomains";
import type { Domain } from "@/features/merchants/types/index";

type DomainStatus = "pending" | "verified";

function getDomainStatus(domain: Domain): DomainStatus {
    return domain.verifiedAt ? "verified" : "pending";
}

export default function DomainsPage() {
    const { merchantId } = useUserMerchantData();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
    const [copied, setCopied] = useState(false);
    const [domainInput, setDomainInput] = useState("");
    const [domainError, setDomainError] = useState<string | null>(null);

    // Fetch domains
    const { data: domainsData, isLoading: isLoadingDomains, refetch: refetchDomains } = useGetDomains(
        merchantId || "",
        !!merchantId
    );

    const domains = domainsData?.domains || [];

    // Add domain mutation
    const addDomainMutation = useAddDomain(merchantId || "");

    // Verify domain mutation
    const verifyDomainMutation = useVerifyDomain(
        merchantId || "",
        selectedDomain?.id || ""
    );

    const getStatusColor = (status: DomainStatus) => {
        switch (status) {
            case "verified":
                return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
            case "pending":
                return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
        }
    };

    const getStatusIcon = (status: DomainStatus) => {
        switch (status) {
            case "verified":
                return <CheckCircle2 className="w-3.5 h-3.5" />;
            case "pending":
                return <Clock className="w-3.5 h-3.5" />;
        }
    };

    const getStatusBadge = (status: DomainStatus) => {
        switch (status) {
            case "verified":
                return "Verified";
            case "pending":
                return "Pending Verification";
        }
    };

    const validateDomain = (domain: string): boolean => {
        // Remove http://, https://, www. if present
        const cleaned = domain.trim().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
        
        // Basic domain validation regex
        const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
        
        if (!cleaned) {
            setDomainError("Domain cannot be empty");
            return false;
        }
        
        if (!domainRegex.test(cleaned)) {
            setDomainError("Invalid domain format. Please enter a valid domain (e.g., example.com)");
            return false;
        }
        
        setDomainError(null);
        return true;
    };

    const handleAddDomain = async () => {
        if (!merchantId) {
            toast.error("Merchant ID not found");
            return;
        }

        // Clean domain input
        const cleanedDomain = domainInput.trim().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];

        if (!validateDomain(cleanedDomain)) {
            return;
        }

        try {
            const result = await addDomainMutation.mutateAsync({ domain: cleanedDomain });
            
            toast.success("Domain added successfully!", {
                description: `Your verification token is: ${result.domain.verificationToken.substring(0, 15)}...`,
            });

            // Open verify modal with new domain
            setSelectedDomain({
                ...result.domain,
                updatedAt: result.domain.createdAt,
            } as Domain);
            setShowAddModal(false);
            setShowVerifyModal(true);
            setDomainInput("");
            setDomainError(null);
            
            // Refetch domains list
            await refetchDomains();
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string }; status?: number }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to add domain";
            const errorStatus = (error as { response?: { status?: number } })?.response?.status;
            
            if (errorStatus === 409) {
                toast.error("Domain already exists", {
                    description: "This domain has already been added. Please verify it or remove it first.",
                });
            } else if (errorStatus === 400) {
                toast.error("Invalid domain format", {
                    description: errorMessage,
                });
            } else {
                toast.error("Failed to add domain", {
                    description: errorMessage,
                });
            }
        }
    };

    const handleVerifyDomain = async () => {
        if (!selectedDomain || !merchantId) {
            return;
        }

        try {
            const result = await verifyDomainMutation.mutateAsync();
            
            toast.success("Domain verified successfully!", {
                description: `${result.domain.domain} is now verified and can be used in your API requests.`,
            });

            setShowVerifyModal(false);
            setSelectedDomain(null);
            
            // Refetch domains list
            await refetchDomains();
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string }; status?: number }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Verification failed";
            const errorStatus = (error as { response?: { status?: number } })?.response?.status;
            
            if (errorStatus === 400) {
                // Handle specific error messages
                if (errorMessage.includes("DNS TXT record not found")) {
                    toast.error("DNS TXT record not found", {
                        description: "The verification token was not found in your domain's DNS records. Please check that you've added the TXT record and waited 15-30 minutes for DNS propagation.",
                    });
                } else if (errorMessage.includes("DNS lookup timed out")) {
                    toast.error("DNS lookup timed out", {
                        description: "The DNS query took too long. This might be a temporary issue. Please try again in a few moments.",
                    });
                } else if (errorMessage.includes("already verified")) {
                    toast.success("Domain already verified", {
                        description: "This domain is already verified. No action needed.",
                    });
                    setShowVerifyModal(false);
                    await refetchDomains();
                } else if (errorMessage.includes("Verification token")) {
                    toast.error("Verification token mismatch", {
                        description: "The token in your DNS record doesn't match the expected value. Please check the TXT record name is exactly '_zitopay' and the value matches.",
                    });
                } else {
                    toast.error("Verification failed", {
                        description: errorMessage,
                    });
                }
            } else {
                toast.error("Verification failed", {
                    description: errorMessage,
                });
            }
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success("Token copied to clipboard!", {
                description: "Verification token has been copied.",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setCopied(true);
                toast.success("Token copied to clipboard!", {
                    description: "Verification token has been copied.",
                });
                setTimeout(() => setCopied(false), 2000);
            } catch {
                document.body.removeChild(textArea);
                toast.error("Failed to copy token");
            }
        }
    };

    const openVerifyModal = (domain: Domain) => {
        setSelectedDomain(domain);
        setShowVerifyModal(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Domain Verification</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add and verify domains for production use
                    </p>
                </div>
                <button
                    onClick={() => {
                        setShowAddModal(true);
                        setDomainInput("");
                        setDomainError(null);
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Domain
                </button>
            </div>

            {/* DOMAINS LIST */}
            {isLoadingDomains ? (
                <div className="bg-background rounded-xl border border-border p-12 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : domains.length === 0 ? (
                <div className="bg-background rounded-xl border border-border p-12 text-center">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground mb-1">No domains added yet</p>
                    <p className="text-xs text-muted-foreground">
                        Add your first domain to get started with verification
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {domains.map((domain) => {
                        const status = getDomainStatus(domain);
                        return (
                            <div
                                key={domain.id}
                                className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-base font-bold text-foreground">{domain.domain}</h3>
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                    status
                                                )}`}
                                            >
                                                {getStatusIcon(status)}
                                                {getStatusBadge(status)}
                                            </span>
                                        </div>
                                        
                                        {status === "verified" && domain.verifiedAt && (
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Verified: {formatDate(domain.verifiedAt)}
                                            </p>
                                        )}
                                        
                                        {status === "pending" && (
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Added: {formatDate(domain.createdAt)}
                                            </p>
                                        )}

                                        {status === "pending" && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <button
                                                    onClick={() => openVerifyModal(domain)}
                                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Verify Domain
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ADD DOMAIN MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-xl border border-border shadow-2xl max-w-md w-full">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <h3 className="text-lg font-bold text-foreground">Add Domain</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setDomainInput("");
                                    setDomainError(null);
                                }}
                                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Domain Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="example.com"
                                    value={domainInput}
                                    onChange={(e) => {
                                        setDomainInput(e.target.value);
                                        setDomainError(null);
                                    }}
                                    className={`w-full px-4 py-2.5 bg-muted/20 border rounded-lg text-sm transition-colors outline-none ${
                                        domainError
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-border hover:border-primary/50 focus:border-primary"
                                    }`}
                                />
                                {domainError && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {domainError}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1.5">
                                    Enter your domain without http:// or https://
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <p className="text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Domain verification is required for production API access.
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Only verified domains can be used in the x-zito-origin header.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setDomainInput("");
                                        setDomainError(null);
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddDomain}
                                    disabled={addDomainMutation.isPending || !domainInput.trim()}
                                    className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {addDomainMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        "Add Domain"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VERIFY DOMAIN MODAL */}
            {showVerifyModal && selectedDomain && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-xl border border-border shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Verify Domain: {selectedDomain.domain}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Add DNS TXT record to verify ownership
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowVerifyModal(false);
                                    setSelectedDomain(null);
                                }}
                                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
                            {/* Verification Token Display */}
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Your verification token:
                                </label>
                                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={selectedDomain.verificationToken}
                                            readOnly
                                            className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs font-mono text-foreground"
                                        />
                                        <button
                                            onClick={() => handleCopy(selectedDomain.verificationToken)}
                                            className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2 whitespace-nowrap"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* DNS Instructions */}
                            <div>
                                <p className="text-sm font-medium text-foreground mb-3">
                                    Add this TXT record to your DNS:
                                </p>
                                <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-3">
                                    <div className="grid grid-cols-3 gap-3 text-xs">
                                        <div>
                                            <span className="font-medium text-muted-foreground">Type:</span>
                                            <p className="font-semibold text-foreground mt-1">TXT</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">Name:</span>
                                            <p className="font-semibold text-foreground mt-1">_zitopay</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">Value:</span>
                                            <p className="font-semibold text-foreground mt-1 font-mono text-[10px] break-all">
                                                {selectedDomain.verificationToken}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-border">
                                        <p className="text-xs text-muted-foreground">
                                            TTL: 3600 (or default)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <p className="text-xs font-medium text-foreground mb-2">Steps:</p>
                                <ol className="text-xs text-foreground space-y-1.5 list-decimal list-inside">
                                    <li>Go to your DNS provider (see instructions below for Vercel)</li>
                                    <li>Add the TXT record above</li>
                                    <li><strong>Wait 15-30 minutes for DNS propagation</strong> (important!)</li>
                                    <li>After waiting, click &quot;Verify Domain&quot; below</li>
                                </ol>
                            </div>

                            {/* Vercel Instructions */}
                            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <span>🚀</span>
                                    Using Vercel? Important Notes:
                                </p>
                                <div className="text-xs text-foreground space-y-2">
                                    <p>
                                        <strong>You cannot add DNS records to Vercel domains</strong> (like <code>*.vercel.app</code>). You need to:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1 ml-2">
                                        <li>Use a <strong>custom domain</strong> (e.g., <code>yourdomain.com</code>)</li>
                                        <li>Add the TXT record at your <strong>domain registrar</strong> (where you bought the domain), not in Vercel</li>
                                        <li>Common registrars: GoDaddy, Namecheap, Cloudflare, Google Domains, etc.</li>
                                    </ol>
                                    <p className="mt-2">
                                        <strong>Where to add the record:</strong> Log into your domain registrar&apos;s DNS management panel (not Vercel), then add the TXT record shown above.
                                    </p>
                                </div>
                            </div>

                            {/* DNS Propagation Warning */}
                            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                                <p className="text-xs text-foreground flex items-start gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                    <span>
                                        <strong>Important:</strong> DNS changes can take 15-30 minutes (sometimes up to 48 hours) to propagate globally. 
                                        <strong className="block mt-1">You must wait before clicking &quot;Verify Domain&quot;</strong> - if you click too soon, verification will fail. 
                                        After adding the TXT record, wait at least 15-30 minutes, then click the verify button.
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border bg-muted/10 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowVerifyModal(false);
                                    setSelectedDomain(null);
                                }}
                                className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerifyDomain}
                                disabled={verifyDomainMutation.isPending}
                                className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {verifyDomainMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Domain"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
