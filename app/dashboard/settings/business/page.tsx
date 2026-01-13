"use client";

import { useState } from "react";
import {
    Building2,
    CheckCircle2,
    AlertCircle,
    Clock,
    XCircle,
    Edit,
    FileText,
    Shield,
    AlertTriangle,
    X,
} from "lucide-react";

type KYBStatus = "not_submitted" | "pending" | "approved" | "rejected";

export default function BusinessSettingsPage() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [kybStatus] = useState<KYBStatus>("approved");

    const businessInfo = {
        name: "ZitoPay Solutions SARL",
        type: "Limited Liability Company",
        country: "Cameroon (CM)",
        email: "contact@zitopay.com",
        phone: "+237 670 123 456",
        registrationNumber: "CM-2024-12345",
        taxId: "TAX-CM-67890",
        address: "123 Business Street",
        city: "Douala, Cameroon",
    };

    const getKYBStatusColor = (status: KYBStatus) => {
        switch (status) {
            case "approved":
                return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
            case "pending":
                return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
            case "rejected":
                return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
            default:
                return "bg-muted text-muted-foreground border-border";
        }
    };

    const getKYBStatusIcon = (status: KYBStatus) => {
        switch (status) {
            case "approved":
                return <CheckCircle2 className="w-5 h-5" />;
            case "pending":
                return <Clock className="w-5 h-5" />;
            case "rejected":
                return <XCircle className="w-5 h-5" />;
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    const getKYBStatusText = (status: KYBStatus) => {
        switch (status) {
            case "approved":
                return { title: "KYB APPROVED", message: "Your business is verified and approved" };
            case "pending":
                return { title: "KYB PENDING", message: "Your documents are under review" };
            case "rejected":
                return { title: "KYB REJECTED", message: "Your documents were rejected" };
            default:
                return { title: "KYB NOT SUBMITTED", message: "Please submit your business documents" };
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Business Settings</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Manage your business information and verification status
                </p>
            </div>

            {/* KYB STATUS */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">KYB STATUS</h3>
                <div className={`rounded-lg p-4 border ${getKYBStatusColor(kybStatus)}`}>
                    <div className="flex items-start gap-3 mb-2">
                        {getKYBStatusIcon(kybStatus)}
                        <div className="flex-1">
                            <h4 className="text-sm font-bold">{getKYBStatusText(kybStatus).title}</h4>
                            <p className="text-xs mt-1">{getKYBStatusText(kybStatus).message}</p>
                            {kybStatus === "approved" && (
                                <p className="text-xs mt-1">Approved on: Jan 1, 2026</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Production Access:</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                            View KYB Documents
                        </button>
                        <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors">
                            Request Production Access
                        </button>
                    </div>
                </div>
            </div>

            {/* BUSINESS INFORMATION */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">BUSINESS INFORMATION</h3>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
                    >
                        <Edit className="w-3 h-3" />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Business Name</p>
                        <p className="text-sm font-semibold text-foreground">{businessInfo.name}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Business Type</p>
                        <p className="text-sm font-semibold text-foreground">{businessInfo.type}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Country</p>
                        <p className="text-sm font-semibold text-foreground">{businessInfo.country}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                        <p className="text-sm font-semibold text-foreground">{businessInfo.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                        <p className="text-sm font-semibold text-foreground">{businessInfo.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Registration Number</p>
                        <p className="text-sm font-semibold text-foreground font-mono">
                            {businessInfo.registrationNumber}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Tax ID</p>
                        <p className="text-sm font-semibold text-foreground font-mono">{businessInfo.taxId}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Address</p>
                        <p className="text-sm font-semibold text-foreground">
                            {businessInfo.address}
                            <br />
                            {businessInfo.city}
                        </p>
                    </div>
                </div>
            </div>

            {/* ENVIRONMENT SETTINGS */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">ENVIRONMENT SETTINGS</h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Sandbox Mode:</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Production Mode:</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs font-medium text-muted-foreground">Rate Limit:</span>
                        <span className="text-xs font-semibold text-foreground">100 requests/minute</span>
                    </div>
                </div>

                <button className="mt-4 px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                    Request Limit Increase
                </button>
            </div>

            {/* DANGER ZONE */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">DANGER ZONE</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            ⚠️ These actions are permanent and cannot be undone
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-3 py-1.5 bg-background border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Suspend Account
                    </button>
                    <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>

            {/* EDIT BUSINESS INFO MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Edit Business Information</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">
                                        Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={businessInfo.name}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">
                                        Business Type *
                                    </label>
                                    <select
                                        defaultValue={businessInfo.type}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    >
                                        <option>Limited Liability Company</option>
                                        <option>Corporation</option>
                                        <option>Partnership</option>
                                        <option>Sole Proprietorship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">Email *</label>
                                    <input
                                        type="email"
                                        defaultValue={businessInfo.email}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">Phone *</label>
                                    <input
                                        type="tel"
                                        defaultValue={businessInfo.phone}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">
                                        Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={businessInfo.registrationNumber}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">Tax ID</label>
                                    <input
                                        type="text"
                                        defaultValue={businessInfo.taxId}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Address *</label>
                                <input
                                    type="text"
                                    defaultValue={businessInfo.address}
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    City, Country *
                                </label>
                                <input
                                    type="text"
                                    defaultValue={businessInfo.city}
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-border">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
