"use client";

import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Settings, X, CheckCircle2, Pause, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import { useConfigureGateway, useGetGateways } from "@/features/merchants/hooks/useGateways";
import { toast } from "sonner";

type GatewayStatus = "enabled" | "disabled";

interface Gateway {
    id: string;
    apiCode: string;
    name: string;
    icon: string;
    color: string;
    status: GatewayStatus;
    comingSoon?: boolean;
    minAmount: number;
    maxAmount: number;
    dailyLimit: number;
    isConfigured?: boolean; // Whether this gateway is already configured
}


const DEFAULT_GATEWAYS: Gateway[] = [
    {
        id: "MTN_MOMO",
        apiCode: "MTN_MOMO",
        name: "MTN Mobile Money",
        icon: "M",
        color: "bg-yellow-500",
        status: "enabled",
        minAmount: 1000,
        maxAmount: 1000000,
        dailyLimit: 5000000,
    },
    {
        id: "ORANGE_MONEY",
        apiCode: "ORANGE",
        name: "Orange Money",
        icon: "O",
        color: "bg-orange-500",
        status: "disabled",
        comingSoon: true,
        minAmount: 1000,
        maxAmount: 1000000,
        dailyLimit: 5000000,
    },
];

export default function GatewaysPage() {
    const queryClient = useQueryClient();
    const { merchant, merchantId } = useUserMerchantData();
    const { mutate: configureGateway, isPending: isConfiguring } = useConfigureGateway(merchantId || "");
    const { data: gatewayData } = useGetGateways(merchantId || "");

    // Determine environment based on merchant state
    const environment: "sandbox" | "production" =
        merchant?.productionState === "ACTIVE" ? "production" : "sandbox";

    // Currency display
    const currency = environment === "production" ? "FCFA" : "XAF";

    const [showConfigModal, setShowConfigModal] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

    const gateways = useMemo(() => {
        return DEFAULT_GATEWAYS.map(g => {
            if (!gatewayData?.gateways) return { ...g, isConfigured: false };

            const apiConfig = gatewayData.gateways.find(c => c.gateway === g.apiCode);
            if (apiConfig) {
                return {
                    ...g,
                    status: (apiConfig.enabled ? "enabled" : "disabled") as GatewayStatus,
                    minAmount: parseFloat(apiConfig.minAmount) || g.minAmount,
                    maxAmount: parseFloat(apiConfig.maxAmount) || g.maxAmount,
                    dailyLimit: parseFloat(apiConfig.dailyLimit) || g.dailyLimit,
                    isConfigured: true, // Mark as configured
                };
            }
            return { ...g, isConfigured: false };
        });
    }, [gatewayData]);

    const openConfigModal = (gateway: Gateway) => {
        if (gateway.comingSoon) return;
        
        // Check if gateway is already configured
        if (gateway.isConfigured) {
            toast.info(`${gateway.name} is already configured`, {
                description: "You can update the configuration settings below.",
            });
        }
        
        setSelectedGateway({ ...gateway }); // Create a copy
        setShowConfigModal(true);
    };

    const handleSaveConfig = () => {
        if (!selectedGateway || !merchant) return;

        configureGateway({
            gateway: selectedGateway.apiCode,
            enabled: selectedGateway.status === 'enabled',
            minAmount: selectedGateway.minAmount.toFixed(2),
            maxAmount: selectedGateway.maxAmount.toFixed(2),
            dailyLimit: selectedGateway.dailyLimit.toFixed(2),
        }, {
            onSuccess: () => {
                // Invalidate query to refetch fresh data
                queryClient.invalidateQueries({ queryKey: ['merchants', merchant.id, 'gateways'] });
                setShowConfigModal(false);
                toast.success(`${selectedGateway.name} configured successfully`);
            },
            onError: (error) => {
                toast.error(`Failed to configure ${selectedGateway.name}`);
                console.error(error);
            }
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Payment Gateways</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Connect and manage your payment providers securely
                </p>
            </div>

            {/* GATEWAYS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {gateways.map((gateway) => (
                    <div
                        key={gateway.id}
                        className={`bg-background rounded-xl p-6 border border-border ${gateway.comingSoon ? "opacity-75" : ""}`}
                    >
                        {/* Header with Status */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 ${gateway.apiCode === 'MTN_MOMO' || gateway.apiCode === 'MTN' 
                                    ? "bg-yellow-500" 
                                    : "bg-orange-500"} rounded-lg flex items-center justify-center`}>
                                    {gateway.apiCode === 'MTN_MOMO' || gateway.apiCode === 'MTN' ? (
                                        <span className="text-white font-bold text-lg">MTN</span>
                                    ) : (
                                        <span className="text-white font-bold text-lg">OM</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-foreground">{gateway.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <ShieldCheck className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Secure</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Status Badge */}
                            {gateway.comingSoon ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                    <AlertCircle className="w-3 h-3" />
                                    Coming Soon
                                </span>
                            ) : (
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${gateway.status === "enabled"
                                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                                        }`}
                                >
                                    {gateway.status === "enabled" ? (
                                        <>
                                            <CheckCircle2 className="w-3 h-3" />
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <Pause className="w-3 h-3" />
                                            Disabled
                                        </>
                                    )}
                                </span>
                            )}
                        </div>

                        {/* Configured Message */}
                        {gateway.isConfigured && (
                            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-xs font-medium text-green-700 dark:text-green-400 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Already configured - Click to update settings
                                </p>
                            </div>
                        )}

                        {/* Gateway Limits Info */}
                        {!gateway.comingSoon && (
                            <div className="mb-4 space-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Min Amount:</span>
                                    <span className="font-medium text-foreground">{gateway.minAmount.toLocaleString()} {currency}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Max Amount:</span>
                                    <span className="font-medium text-foreground">{gateway.maxAmount.toLocaleString()} {currency}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Daily Limit:</span>
                                    <span className="font-medium text-foreground">{gateway.dailyLimit.toLocaleString()} {currency}</span>
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        <button
                            onClick={() => openConfigModal(gateway)}
                            disabled={!!gateway.comingSoon}
                            className={`w-full px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${gateway.comingSoon
                                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                : gateway.isConfigured
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            {gateway.comingSoon 
                                ? "Not Available" 
                                : gateway.isConfigured 
                                ? "Update Configuration" 
                                : "Configure Gateway"}
                        </button>
                    </div>
                ))}
            </div>

            {/* CONFIGURE GATEWAY MODAL */}
            {showConfigModal && selectedGateway && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-xl w-full max-w-lg shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        {selectedGateway.isConfigured ? "Update Gateway Configuration" : "Configure Gateway"}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">{selectedGateway.name}</p>
                                    {selectedGateway.isConfigured && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            This gateway is already configured
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto space-y-6">
                                {/* Status Toggle */}
                                <div className="space-y-3">
                                    <label className="text-xs font-medium text-foreground block">Gateway Status</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setSelectedGateway({ ...selectedGateway, status: 'enabled' })}
                                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${selectedGateway.status === 'enabled'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-background border border-border text-foreground hover:bg-muted'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Enabled
                                        </button>
                                        <button
                                            onClick={() => setSelectedGateway({ ...selectedGateway, status: 'disabled' })}
                                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${selectedGateway.status === 'disabled'
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-background border border-border text-foreground hover:bg-muted'
                                                }`}
                                        >
                                            <Pause className="w-4 h-4" />
                                            Disabled
                                        </button>
                                    </div>
                                </div>

                                {/* Transaction Limits */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-medium text-foreground">Transaction Limits</label>
                                        <span className="text-xs text-muted-foreground font-medium">{currency}</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block">Minimum Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.minAmount}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, minAmount: parseFloat(e.target.value) || 0 })}
                                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-16"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">{currency}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block">Maximum Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.maxAmount}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, maxAmount: parseFloat(e.target.value) || 0 })}
                                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-16"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">{currency}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block">Daily Limit</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.dailyLimit}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, dailyLimit: parseFloat(e.target.value) || 0 })}
                                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-16"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">{currency}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-border flex gap-3">
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-xs font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveConfig}
                                    disabled={!merchant || isConfiguring}
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isConfiguring ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Configuration"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}
