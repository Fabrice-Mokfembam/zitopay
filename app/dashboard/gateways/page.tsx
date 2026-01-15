"use client";

import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Settings, X, CheckCircle2, Pause, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { useMerchantAccount } from "@/features/merchants/hooks/useMerchantAccount";
import { useConfigureGateway, useGetGateways } from "@/features/merchants/hooks/useGateways";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
    const { merchant } = useMerchantAccount();
    const { mutate: configureGateway, isPending: isConfiguring } = useConfigureGateway(merchant?.id || "");
    const { data: gatewayData } = useGetGateways(merchant?.id || "");

    const [showConfigModal, setShowConfigModal] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

    const gateways = useMemo(() => {
        return DEFAULT_GATEWAYS.map(g => {
            if (!gatewayData?.gateways) return g;

            const apiConfig = gatewayData.gateways.find(c => c.gateway === g.apiCode);
            if (apiConfig) {
                return {
                    ...g,
                    status: (apiConfig.enabled ? "enabled" : "disabled") as GatewayStatus,
                    minAmount: parseFloat(apiConfig.minAmount) || g.minAmount,
                    maxAmount: parseFloat(apiConfig.maxAmount) || g.maxAmount,
                    dailyLimit: parseFloat(apiConfig.dailyLimit) || g.dailyLimit,
                };
            }
            return g;
        });
    }, [gatewayData]);

    const openConfigModal = (gateway: Gateway) => {
        if (gateway.comingSoon) return;
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
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Payment Gateways
                </h1>
                <p className="text-sm text-muted-foreground">
                    Connect and manage your payment providers securely
                </p>
            </div>

            {/* GATEWAYS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gateways.map((gateway) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={gateway.id}
                        className={`group relative bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${gateway.comingSoon ? "opacity-75" : ""
                            }`}
                    >
                        {/* Status Indicator */}
                        <div className={`absolute top-0 right-0 p-4`}>
                            {gateway.comingSoon ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Coming Soon
                                </span>
                            ) : (
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md ${gateway.status === "enabled"
                                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                        : "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20"
                                        }`}
                                >
                                    {gateway.status === "enabled" ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <Pause className="w-3.5 h-3.5" />
                                            Disabled
                                        </>
                                    )}
                                </span>
                            )}
                        </div>

                        {/* Decoration */}
                        <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-3xl ${gateway.color}`} />

                        <div className="flex flex-col h-full relative z-10">
                            {/* Icon & Name */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl ${gateway.color} bg-opacity-10 flex items-center justify-center text-3xl shadow-inner border border-white/5`}>
                                    {gateway.apiCode === 'MTN' ? (
                                        <div className="font-bold text-yellow-600 dark:text-yellow-400">MTN</div>
                                    ) : (
                                        <div className="font-bold text-orange-600 dark:text-orange-400">OM</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground tracking-tight">{gateway.name}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        <ShieldCheck className="w-3 h-3" />
                                        Secure Connection
                                    </div>
                                </div>
                            </div>



                            {/* Action Button */}
                            <div className="mt-auto">
                                <button
                                    onClick={() => openConfigModal(gateway)}
                                    disabled={!!gateway.comingSoon}
                                    className={`w-full h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${gateway.comingSoon
                                        ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                        : "bg-linear-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:from-primary/90 hover:to-primary active:scale-[0.98]"
                                        }`}
                                >
                                    <Settings className="w-4 h-4" />
                                    {gateway.comingSoon ? "Not Available" : "Configure Gateway"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CONFIGURE GATEWAY MODAL */}
            <AnimatePresence>
                {showConfigModal && selectedGateway && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-card rounded-3xl w-full max-w-lg shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="relative px-6 py-5 border-b border-border flex items-center justify-between bg-muted/20">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Configure Gateway</h3>
                                    <p className="text-sm text-muted-foreground">{selectedGateway.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                                {/* Status Toggle */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-foreground block">Gateway Status</label>
                                    <div className="grid grid-cols-2 gap-3 p-1 bg-muted/50 rounded-xl border border-border">
                                        <button
                                            onClick={() => setSelectedGateway({ ...selectedGateway, status: 'enabled' })}
                                            className={`relative flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedGateway.status === 'enabled'
                                                ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <CheckCircle2 className={`w-4 h-4 ${selectedGateway.status === 'enabled' ? 'text-green-500' : ''}`} />
                                            Enabled
                                        </button>
                                        <button
                                            onClick={() => setSelectedGateway({ ...selectedGateway, status: 'disabled' })}
                                            className={`relative flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedGateway.status === 'disabled'
                                                ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <Pause className={`w-4 h-4 ${selectedGateway.status === 'disabled' ? 'text-orange-500' : ''}`} />
                                            Disabled
                                        </button>
                                    </div>
                                </div>

                                {/* Transaction Limits */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-foreground">Transaction Limits</label>
                                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold bg-muted px-2 py-1 rounded">FCFA</span>
                                    </div>

                                    <div className="grid gap-5">
                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block ml-1">Minimum Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.minAmount}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, minAmount: parseFloat(e.target.value) || 0 })}
                                                    className="w-full pl-4 pr-12 py-3 bg-muted/20 border border-border hover:border-primary/50 focus:border-primary rounded-xl text-sm transition-colors outline-none font-medium tabular-nums"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50 text-xs">FCFA</div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block ml-1">Maximum Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.maxAmount}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, maxAmount: parseFloat(e.target.value) || 0 })}
                                                    className="w-full pl-4 pr-12 py-3 bg-muted/20 border border-border hover:border-primary/50 focus:border-primary rounded-xl text-sm transition-colors outline-none font-medium tabular-nums"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50 text-xs">FCFA</div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1.5 block ml-1">Daily Limit</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={selectedGateway.dailyLimit}
                                                    onChange={(e) => setSelectedGateway({ ...selectedGateway, dailyLimit: parseFloat(e.target.value) || 0 })}
                                                    className="w-full pl-4 pr-12 py-3 bg-muted/20 border border-border hover:border-primary/50 focus:border-primary rounded-xl text-sm transition-colors outline-none font-medium tabular-nums"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50 text-xs">FCFA</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-border bg-muted/10 flex gap-3">
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="flex-1 py-3 px-4 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted text-foreground transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveConfig}
                                    disabled={!merchant || isConfiguring}
                                    className="flex-2 py-3 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                >
                                    {isConfiguring ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            Save Configuration
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
