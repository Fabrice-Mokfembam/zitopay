"use client";

import { useState } from "react";
import {
    Network,
    Plus,
    CheckCircle2,
    Clock,
    X,
    Loader2,
    AlertCircle,
    Trash2,
    XCircle,
    Info,
} from "lucide-react";
import { toast } from "sonner";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import { useGetIps, useAddIp, useDeleteIp } from "@/features/merchants/hooks/useIps";
import type { IpAddress } from "@/features/merchants/types/index";

export default function IpsPage() {
    const { merchantId } = useUserMerchantData();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIp, setSelectedIp] = useState<IpAddress | null>(null);
    const [ipInput, setIpInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [ipError, setIpError] = useState<string | null>(null);

    // Fetch IPs
    const { data: ipsData, isLoading: isLoadingIps } = useGetIps(
        merchantId || "",
        !!merchantId
    );

    const ips = ipsData?.ips || [];

    // Add IP mutation
    const addIpMutation = useAddIp(merchantId || "");
    const deleteIpMutation = useDeleteIp(merchantId || "");

    const getStatusConfig = (status: IpAddress["status"]) => {
        switch (status) {
            case "APPROVED":
                return {
                    color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
                    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                    label: "Approved",
                };
            case "PENDING":
                return {
                    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
                    icon: <Clock className="w-3.5 h-3.5" />,
                    label: "Pending Review",
                };
            case "REJECTED":
                return {
                    color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
                    icon: <XCircle className="w-3.5 h-3.5" />,
                    label: "Rejected",
                };
            default:
                return {
                    color: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
                    icon: <Clock className="w-3.5 h-3.5" />,
                    label: "Pending",
                };
        }
    };

    const validateIp = (ip: string): boolean => {
        const trimmedIp = ip.trim();

        // Basic IPv4 validation
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/;
        // Basic IPv6 validation (simplified)
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(\/\d{1,3})?$/;

        if (!trimmedIp) {
            setIpError("IP address cannot be empty");
            return false;
        }

        if (!ipv4Regex.test(trimmedIp) && !ipv6Regex.test(trimmedIp) && !trimmedIp.includes(":")) { // Simple check to allow complex IPv6
            setIpError("Invalid IP address format. Use IPv4 (e.g. 192.168.1.1) or CIDR (e.g. 192.168.1.0/24)");
            return false;
        }

        setIpError(null);
        return true;
    };

    const handleAddIp = async () => {
        if (!merchantId) {
            toast.error("Merchant ID not found");
            return;
        }

        const trimmedIp = ipInput.trim();

        if (!validateIp(trimmedIp)) {
            return;
        }

        try {
            await addIpMutation.mutateAsync({
                ipAddress: trimmedIp,
                description: descriptionInput.trim() || undefined
            });

            toast.success("IP address submitted successfully!", {
                description: "Your IP is now pending admin approval.",
            });

            setShowAddModal(false);
            setIpInput("");
            setDescriptionInput("");
            setIpError(null);
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string }; status?: number }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to add IP address";

            toast.error("Failed to add IP address", {
                description: errorMessage,
            });
        }
    };

    const handleDeleteIp = async () => {
        if (!selectedIp || !merchantId) return;

        try {
            await deleteIpMutation.mutateAsync(selectedIp.id);

            toast.success("IP address removed successfully");
            setShowDeleteModal(false);
            setSelectedIp(null);
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string }; status?: number }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to delete IP address";

            toast.error("Failed to delete IP address", {
                description: errorMessage,
            });
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">IP Whitelist</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Manage allowed IP addresses for API access
                    </p>
                </div>
                <button
                    onClick={() => {
                        setShowAddModal(true);
                        setIpInput("");
                        setDescriptionInput("");
                        setIpError(null);
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add IP Address
                </button>
            </div>

            {/* IPS LIST */}
            {isLoadingIps ? (
                <div className="bg-background rounded-xl border border-border p-12 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : ips.length === 0 ? (
                <div className="bg-background rounded-xl border border-border p-12 text-center">
                    <Network className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground mb-1">No IP addresses whitelisted</p>
                    <p className="text-xs text-muted-foreground">
                        Add an IP address to secure your API access
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {ips.map((ip) => {
                        const statusConfig = getStatusConfig(ip.status);

                        return (
                            <div
                                key={ip.id}
                                className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Network className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-base font-bold text-foreground font-mono">{ip.ipAddress}</h3>
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                                            >
                                                {statusConfig.icon}
                                                {statusConfig.label}
                                            </span>
                                        </div>

                                        {ip.description && (
                                            <p className="text-sm text-muted-foreground mb-3">{ip.description}</p>
                                        )}

                                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                                            <p>Added: {formatDate(ip.createdAt)}</p>

                                            {ip.status === "APPROVED" && ip.verifiedAt && (
                                                <p>Approved: {formatDate(ip.verifiedAt)}</p>
                                            )}
                                        </div>

                                        {ip.status === "REJECTED" && ip.rejectionReason && (
                                            <div className="mt-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3 text-xs">
                                                <p className="font-semibold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    Rejection Reason:
                                                </p>
                                                <p className="text-red-600 dark:text-red-300">
                                                    {ip.rejectionReason}
                                                </p>
                                            </div>
                                        )}

                                        {ip.status === "PENDING" && (
                                            <div className="mt-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                                                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                                <p>This IP is waiting for admin approval.</p>
                                            </div>
                                        )}
                                    </div>

                                    {(ip.status === "PENDING" || ip.status === "REJECTED") && (
                                        <button
                                            onClick={() => {
                                                setSelectedIp(ip);
                                                setShowDeleteModal(true);
                                            }}
                                            className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                            title="Delete IP"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ADD IP MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-xl border border-border shadow-2xl max-w-md w-full">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <h3 className="text-lg font-bold text-foreground">Add IP Address</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setIpInput("");
                                    setDescriptionInput("");
                                    setIpError(null);
                                }}
                                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    IP Address or CIDR *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 192.168.1.1 or 192.168.1.0/24"
                                    value={ipInput}
                                    onChange={(e) => {
                                        setIpInput(e.target.value);
                                        setIpError(null);
                                    }}
                                    className={`w-full px-4 py-2.5 bg-muted/20 border rounded-lg text-sm transition-colors outline-none font-mono ${ipError
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-border hover:border-primary/50 focus:border-primary"
                                        }`}
                                />
                                {ipError && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {ipError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Description (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Office Static IP"
                                    value={descriptionInput}
                                    onChange={(e) => setDescriptionInput(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-lg text-sm transition-colors outline-none hover:border-primary/50 focus:border-primary"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <p className="text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Admin Approval Required
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Newly added IP addresses must be approved by an administrator before they can be used.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setIpInput("");
                                        setDescriptionInput("");
                                        setIpError(null);
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddIp}
                                    disabled={addIpMutation.isPending || !ipInput.trim()}
                                    className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {addIpMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit for Approval"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE IP MODAL */}
            {showDeleteModal && selectedIp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-xl border border-border shadow-2xl max-w-sm w-full">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Delete IP Address?</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Are you sure you want to delete <strong>{selectedIp.ipAddress}</strong>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteIp}
                                    disabled={deleteIpMutation.isPending}
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    {deleteIpMutation.isPending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
