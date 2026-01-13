"use client";

import { useState } from "react";
import { Settings, X, CheckCircle2, Pause } from "lucide-react";

type GatewayStatus = "enabled" | "disabled";

interface Gateway {
    id: string;
    name: string;
    icon: string;
    status: GatewayStatus;
    volume: number | null;
    successRate: number | null;
    minAmount: number;
    maxAmount: number;
    dailyLimit: number;
    gatewayFee: number;
    platformFee: number;
}

export default function GatewaysPage() {
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
    const [feeOverride, setFeeOverride] = useState(false);

    const [gateways, setGateways] = useState<Gateway[]>([
        {
            id: "mtn",
            name: "MTN Mobile Money",
            icon: "💳",
            status: "enabled",
            volume: 65,
            successRate: 96,
            minAmount: 1000,
            maxAmount: 1000000,
            dailyLimit: 5000000,
            gatewayFee: 2.5,
            platformFee: 0.5,
        },
        {
            id: "orange",
            name: "Orange Money",
            icon: "🍊",
            status: "enabled",
            volume: 25,
            successRate: 94,
            minAmount: 1000,
            maxAmount: 1000000,
            dailyLimit: 5000000,
            gatewayFee: 2.5,
            platformFee: 0.5,
        },
        {
            id: "moov",
            name: "Moov Money",
            icon: "📱",
            status: "disabled",
            volume: null,
            successRate: null,
            minAmount: 1000,
            maxAmount: 1000000,
            dailyLimit: 5000000,
            gatewayFee: 2.5,
            platformFee: 0.5,
        },
        {
            id: "bank",
            name: "Bank Transfer",
            icon: "🏦",
            status: "disabled",
            volume: null,
            successRate: null,
            minAmount: 5000,
            maxAmount: 10000000,
            dailyLimit: 50000000,
            gatewayFee: 1.0,
            platformFee: 0.5,
        },
    ]);

    const openConfigModal = (gateway: Gateway) => {
        setSelectedGateway(gateway);
        setShowConfigModal(true);
    };

    const handleSaveConfig = () => {
        if (selectedGateway) {
            setGateways((prev) =>
                prev.map((g) =>
                    g.id === selectedGateway.id ? selectedGateway : g
                )
            );
        }
        setShowConfigModal(false);
    };

    const toggleGatewayStatus = () => {
        if (selectedGateway) {
            setSelectedGateway({
                ...selectedGateway,
                status: selectedGateway.status === "enabled" ? "disabled" : "enabled",
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Payment Gateways</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Configure and manage your payment methods
                </p>
            </div>

            {/* GATEWAYS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gateways.map((gateway) => (
                    <div
                        key={gateway.id}
                        className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{gateway.icon}</div>
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground">{gateway.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${gateway.status === "enabled"
                                                    ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                                    : "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400"
                                                }`}
                                        >
                                            {gateway.status === "enabled" ? (
                                                <>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Enabled
                                                </>
                                            ) : (
                                                <>
                                                    <Pause className="w-3 h-3" />
                                                    Disabled
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Volume</p>
                                <p className="text-lg font-bold text-foreground">
                                    {gateway.volume !== null ? `${gateway.volume}%` : "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                                <p className="text-lg font-bold text-foreground">
                                    {gateway.successRate !== null ? `${gateway.successRate}%` : "-"}
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => openConfigModal(gateway)}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${gateway.status === "enabled"
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-orange-500 text-white hover:bg-orange-600"
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            {gateway.status === "enabled" ? "Configure" : "Enable"}
                        </button>
                    </div>
                ))}
            </div>

            {/* CONFIGURE GATEWAY MODAL */}
            {showConfigModal && selectedGateway && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">
                                Configure {selectedGateway.name}
                            </h3>
                            <button
                                onClick={() => setShowConfigModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Status */}
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Status</label>
                                <div className="flex gap-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={selectedGateway.status === "enabled"}
                                            onChange={toggleGatewayStatus}
                                        />
                                        <span className="text-xs text-foreground">Enabled</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={selectedGateway.status === "disabled"}
                                            onChange={toggleGatewayStatus}
                                        />
                                        <span className="text-xs text-foreground">Disabled</span>
                                    </label>
                                </div>
                            </div>

                            {/* Transaction Limits */}
                            <div className="pt-4 border-t border-border">
                                <label className="text-xs font-medium text-foreground mb-3 block">
                                    Transaction Limits
                                </label>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">
                                            Min Amount (FCFA)
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedGateway.minAmount}
                                            onChange={(e) =>
                                                setSelectedGateway({
                                                    ...selectedGateway,
                                                    minAmount: parseInt(e.target.value),
                                                })
                                            }
                                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">
                                            Max Amount (FCFA)
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedGateway.maxAmount}
                                            onChange={(e) =>
                                                setSelectedGateway({
                                                    ...selectedGateway,
                                                    maxAmount: parseInt(e.target.value),
                                                })
                                            }
                                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">
                                            Daily Limit (FCFA)
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedGateway.dailyLimit}
                                            onChange={(e) =>
                                                setSelectedGateway({
                                                    ...selectedGateway,
                                                    dailyLimit: parseInt(e.target.value),
                                                })
                                            }
                                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Fee Override */}
                            <div className="pt-4 border-t border-border">
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Fee Override (Optional)
                                </label>
                                <p className="text-xs text-muted-foreground mb-3">
                                    Use custom fees instead of default
                                </p>
                                <label className="flex items-center gap-2 cursor-pointer mb-3">
                                    <input
                                        type="checkbox"
                                        checked={feeOverride}
                                        onChange={(e) => setFeeOverride(e.target.checked)}
                                        className="rounded border-border"
                                    />
                                    <span className="text-xs text-foreground">Enable fee override</span>
                                </label>

                                {feeOverride && (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1 block">
                                                Gateway Fee (%)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={selectedGateway.gatewayFee}
                                                onChange={(e) =>
                                                    setSelectedGateway({
                                                        ...selectedGateway,
                                                        gatewayFee: parseFloat(e.target.value),
                                                    })
                                                }
                                                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground mb-1 block">
                                                Platform Fee (%)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={selectedGateway.platformFee}
                                                onChange={(e) =>
                                                    setSelectedGateway({
                                                        ...selectedGateway,
                                                        platformFee: parseFloat(e.target.value),
                                                    })
                                                }
                                                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-border">
                                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
                                    Test Connection
                                </button>
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveConfig}
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                                >
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
