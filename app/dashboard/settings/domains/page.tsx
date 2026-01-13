"use client";

import { useState } from "react";
import {
    Globe,
    Plus,
    CheckCircle2,
    Clock,
    XCircle,
    MoreVertical,
    X,
    Copy,
    Check,
} from "lucide-react";

type DomainStatus = "verified" | "pending" | "failed";

interface Domain {
    id: string;
    domain: string;
    status: DomainStatus;
    addedDate: string;
    verificationCode?: string;
}

export default function DomainsPage() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
    const [copied, setCopied] = useState(false);

    const domains: Domain[] = [
        {
            id: "1",
            domain: "myapp.com",
            status: "verified",
            addedDate: "Jan 1",
        },
        {
            id: "2",
            domain: "api.myapp.com",
            status: "pending",
            addedDate: "Jan 10",
            verificationCode: "zitopay-verify-abc123def456",
        },
        {
            id: "3",
            domain: "test.myapp.com",
            status: "failed",
            addedDate: "Jan 5",
        },
    ];

    const getStatusColor = (status: DomainStatus) => {
        switch (status) {
            case "verified":
                return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            case "pending":
                return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
            case "failed":
                return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
        }
    };

    const getStatusIcon = (status: DomainStatus) => {
        switch (status) {
            case "verified":
                return <CheckCircle2 className="w-3 h-3" />;
            case "pending":
                return <Clock className="w-3 h-3" />;
            case "failed":
                return <XCircle className="w-3 h-3" />;
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openVerifyModal = (domain: Domain) => {
        setSelectedDomain(domain);
        setShowVerifyModal(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Verified Domains</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add and verify domains for production use
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Domain
                </button>
            </div>

            {/* DOMAINS TABLE */}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Domain
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Added
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map((domain) => (
                                <tr
                                    key={domain.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs font-medium text-foreground">{domain.domain}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                                domain.status
                                            )}`}
                                        >
                                            {getStatusIcon(domain.status)}
                                            {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-foreground">{domain.addedDate}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            {domain.status === "pending" && (
                                                <button
                                                    onClick={() => openVerifyModal(domain)}
                                                    className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline"
                                                >
                                                    Verify
                                                </button>
                                            )}
                                            {domain.status === "failed" && (
                                                <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                                    Retry
                                                </button>
                                            )}
                                            <button className="p-1 hover:bg-muted rounded transition-colors">
                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD DOMAIN MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Add Domain</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Domain Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="myapp.com"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Do not include http:// or https://
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                    Add Domain
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VERIFY DOMAIN MODAL */}
            {showVerifyModal && selectedDomain && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-lg w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">
                                Verify Domain: {selectedDomain.domain}
                            </h3>
                            <button
                                onClick={() => setShowVerifyModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-foreground">Add this TXT record to your DNS settings:</p>

                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                <div className="grid grid-cols-3 gap-3 text-xs">
                                    <div>
                                        <span className="font-medium text-muted-foreground">Type:</span>
                                        <p className="font-semibold text-foreground mt-1">TXT</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Name:</span>
                                        <p className="font-semibold text-foreground mt-1">_zitopay-verify</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Value:</span>
                                        <p className="font-semibold text-foreground mt-1 truncate">
                                            {selectedDomain.verificationCode?.substring(0, 15)}...
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={selectedDomain.verificationCode}
                                            readOnly
                                            className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs font-mono"
                                        />
                                        <button
                                            onClick={() => handleCopy(selectedDomain.verificationCode || "")}
                                            className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-3 h-3" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <p className="text-xs font-medium text-foreground mb-2">Steps:</p>
                                <ol className="text-xs text-foreground space-y-1 list-decimal list-inside">
                                    <li>Go to your DNS provider</li>
                                    <li>Add the TXT record above</li>
                                    <li>Wait for DNS propagation (up to 24 hours)</li>
                                    <li>Click "Verify Domain" below</li>
                                </ol>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowVerifyModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                    Verify Domain
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
