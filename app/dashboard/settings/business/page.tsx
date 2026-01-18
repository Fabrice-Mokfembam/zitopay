"use client";

import { useState, useMemo } from "react";
import {
    CheckCircle2,
    AlertCircle,
    Clock,
    XCircle,
    Edit,
    X,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useSubmitKYB, useRequestProduction } from "@/features/merchants/hooks/useMerchant";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import KYBUploadSection from "./components/KYBUploadSection";
import ProductionAccessSection from "./components/ProductionAccessSection";

export default function BusinessSettingsPage() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [productionCredentials, setProductionCredentials] = useState<{
        apiKey: string;
        secretKey: string;
    } | undefined>(undefined);

    // Get merchant data from context
    const { merchant: selectedMerchant, merchantId, isLoading, refetch } = useUserMerchantData();

    // KYB submission hook
    const submitKYBMutation = useSubmitKYB(merchantId || "");

    // Production request hook
    const requestProductionMutation = useRequestProduction(merchantId || "");

    const handleSubmitKYB = async () => {
        if (!selectedMerchant) return;

        try {
            await submitKYBMutation.mutateAsync();
            // Refetch merchant data to get updated status
            await refetch();
            toast.success('KYB Submitted Successfully!', {
                description: 'Your documents have been submitted for review. We\'ll notify you once the review is complete.',
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit KYB';
            toast.error('KYB Submission Failed', {
                description: errorMessage,
            });
            console.error("Failed to submit KYB:", error);
        }
    };

    const handleRequestProduction = async () => {
        if (!selectedMerchant) return;

        try {
            const result = await requestProductionMutation.mutateAsync();
            // Refetch merchant data to get updated status
            await refetch();

            // Check if production was approved immediately and credentials were returned
            if (result && typeof result === 'object' && 'productionApiKey' in result && 'productionSecretKey' in result) {
                setProductionCredentials({
                    apiKey: result.productionApiKey as string,
                    secretKey: result.productionSecretKey as string,
                });
                toast.success('Production Access Granted!', {
                    description: 'Your production credentials are ready. Please save them securely.',
                });
            } else {
                toast.success('Production Request Submitted!', {
                    description: 'Your request is under review. We\'ll notify you once it\'s approved.',
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to request production access';
            toast.error('Production Request Failed', {
                description: errorMessage,
            });
            console.error("Failed to request production:", error);
        }
    };

    const getKYBStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED":
                return <CheckCircle2 className="w-5 h-5" />;
            case "PENDING":
                return <Clock className="w-5 h-5" />;
            case "REJECTED":
                return <XCircle className="w-5 h-5" />;
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    const getKYBStatusText = (status: string) => {
        switch (status) {
            case "APPROVED":
                return { title: "KYB APPROVED", message: "Your business is verified and approved" };
            case "PENDING":
                return { title: "KYB PENDING", message: "Your documents are under review" };
            case "REJECTED":
                return { title: "KYB REJECTED", message: "Your documents were rejected" };
            default:
                return { title: "KYB NOT SUBMITTED", message: "Please submit your business documents" };
        }
    };

    const getProductionStatusText = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return { text: "Active", color: "text-green-600 dark:text-green-400" };
            case "PENDING_APPROVAL":
                return { text: "Pending Approval", color: "text-orange-600 dark:text-orange-400" };
            case "SUSPENDED":
                return { text: "Suspended", color: "text-red-600 dark:text-red-400" };
            default:
                return { text: "Not Requested", color: "text-muted-foreground" };
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Loading merchant data...</p>
                </div>
            </div>
        );
    }

    if (!selectedMerchant) {
        return (
            <div className="p-6">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">
                        No merchant account found. Please create a merchant account first.
                    </p>
                </div>
            </div>
        );
    }

    const kybStatusText = getKYBStatusText(selectedMerchant.kycStatus);
    const productionStatus = getProductionStatusText(selectedMerchant.productionState);

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Environment Settings</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Manage your sandbox and production environments, KYB verification, and business information
                </p>
            </div>

            {/* ENVIRONMENT STATUS OVERVIEW */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">ENVIRONMENT STATUS</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Sandbox Status */}
                    <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">Sandbox</span>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${selectedMerchant.sandboxState === "ACTIVE"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                                }`}>
                                <CheckCircle2 className="w-3 h-3" />
                                {selectedMerchant.sandboxState}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Test environment active</p>
                    </div>

                    {/* KYB Status */}
                    <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">KYB Status</span>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${selectedMerchant.kycStatus === "APPROVED"
                                ? "text-green-600 dark:text-green-400"
                                : selectedMerchant.kycStatus === "PENDING"
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-muted-foreground"
                                }`}>
                                {getKYBStatusIcon(selectedMerchant.kycStatus)}
                                {selectedMerchant.kycStatus.replace("_", " ")}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{kybStatusText.message}</p>
                    </div>

                    {/* Production Status */}
                    <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">Production</span>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${productionStatus.color}`}>
                                {selectedMerchant.productionState === "ACTIVE" && <CheckCircle2 className="w-3 h-3" />}
                                {selectedMerchant.productionState === "PENDING_APPROVAL" && <Clock className="w-3 h-3" />}
                                {productionStatus.text}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {selectedMerchant.productionState === "ACTIVE"
                                ? "Live environment active"
                                : "Not yet activated"}
                        </p>
                    </div>
                </div>
            </div>

            {/* KYB UPLOAD SECTION */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">KYB VERIFICATION</h3>
                <KYBUploadSection
                    merchantId={selectedMerchant.id}
                    kycStatus={selectedMerchant.kycStatus}
                    onSubmitKYB={handleSubmitKYB}
                    isSubmitting={submitKYBMutation.isPending}
                />
            </div>

            {/* PRODUCTION ACCESS SECTION */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">PRODUCTION ACCESS</h3>
                <ProductionAccessSection
                    merchantId={selectedMerchant.id}
                    kycStatus={selectedMerchant.kycStatus}
                    productionState={selectedMerchant.productionState}
                    onRequestProduction={handleRequestProduction}
                    isRequesting={requestProductionMutation.isPending}
                    productionCredentials={productionCredentials}
                />
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
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.businessName}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Business Type</p>
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.businessType}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Country</p>
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.country}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Rate Limit</p>
                        <p className="text-sm font-semibold text-foreground">{selectedMerchant.rateLimitPerMinute} requests/minute</p>
                    </div>
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
                                        defaultValue={selectedMerchant.businessName}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">
                                        Business Type *
                                    </label>
                                    <select
                                        defaultValue={selectedMerchant.businessType}
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
                                        defaultValue={selectedMerchant.email}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground mb-2 block">Phone *</label>
                                    <input
                                        type="tel"
                                        defaultValue={selectedMerchant.phone}
                                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
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
