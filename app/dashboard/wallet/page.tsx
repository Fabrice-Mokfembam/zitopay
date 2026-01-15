"use client";

import { useState } from "react";
import {
    Wallet as WalletIcon,
    Lock,
    TrendingUp,
    TrendingDown,
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    X,
    RefreshCw,
} from "lucide-react";
import { useWalletSummary, useWalletActivity } from "@/features/wallet";

export default function WalletPage() {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [topUpAmount, setTopUpAmount] = useState("");
    const [withdrawMethod, setWithdrawMethod] = useState("bank");
    const [topUpMethod, setTopUpMethod] = useState("mobile");

    // Fetch wallet data using hooks
    const { data: balanceData, isLoading: isLoadingSummary, error: summaryError } = useWalletSummary();
    const { data: recentActivity, isLoading: isLoadingActivity, error: activityError } = useWalletActivity({ limit: 20 });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "credit":
                return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
            case "withdrawal":
                return <ArrowUpRight className="w-4 h-4 text-red-600" />;
            case "fee":
                return <TrendingDown className="w-4 h-4 text-orange-600" />;
            default:
                return <RefreshCw className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            case "pending":
                return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
            case "failed":
                return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const setQuickAmount = (amount: number, type: "withdraw" | "topup") => {
        if (type === "withdraw") {
            setWithdrawAmount(amount === (balanceData?.available || 0) ? (balanceData?.available || 0).toString() : amount.toString());
        } else {
            setTopUpAmount(amount.toString());
        }
    };

    // Loading state
    if (isLoadingSummary || isLoadingActivity) {
        return (
            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Wallet & Balance</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Manage your funds, view balance history, and process withdrawals
                    </p>
                </div>

                {/* Loading Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-muted/50 rounded-xl p-6 border border-border animate-pulse">
                            <div className="h-10 w-10 bg-muted rounded-lg mb-3" />
                            <div className="h-3 w-24 bg-muted rounded mb-2" />
                            <div className="h-6 w-32 bg-muted rounded mb-1" />
                            <div className="h-3 w-20 bg-muted rounded mb-4" />
                            <div className="h-8 w-full bg-muted rounded" />
                        </div>
                    ))}
                </div>

                <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="h-6 w-48 bg-muted rounded mb-6 animate-pulse" />
                    <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
                </div>
            </div>
        );
    }

    // Error state
    if (summaryError || activityError) {
        return (
            <div className="p-6">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">
                        Failed to Load Wallet Data
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        {summaryError?.message || activityError?.message || "An error occurred while fetching wallet data"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // No data state
    if (!balanceData || !recentActivity) {
        return (
            <div className="p-6">
                <div className="bg-muted/50 border border-border rounded-xl p-6 text-center">
                    <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-foreground mb-2">No Wallet Data</h3>
                    <p className="text-sm text-muted-foreground">
                        Unable to load wallet information at this time.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Wallet & Balance</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Manage your funds, view balance history, and process withdrawals
                </p>
            </div>

            {/* BALANCE OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Available Balance */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <WalletIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                            {balanceData!.trend}
                        </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        💰 AVAILABLE BALANCE
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                        FCFA {balanceData!.available.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                        Last updated: {balanceData!.lastUpdated}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowWithdrawModal(true)}
                            className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                        >
                            💸 Withdraw
                        </button>
                        <button
                            onClick={() => setShowTopUpModal(true)}
                            className="flex-1 px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
                        >
                            ➕ Top Up
                        </button>
                    </div>
                </div>

                {/* Pending Balance */}
                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        🔒 PENDING BALANCE
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                        FCFA {balanceData!.pending.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                        3 transactions processing
                    </p>
                    <button className="w-full px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        View Details →
                    </button>
                </div>

                {/* Total Collected */}
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <ArrowDownLeft className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        📊 TOTAL COLLECTED
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                        FCFA {balanceData!.totalCollected.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">This month</p>
                    <button className="w-full px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        View Transactions →
                    </button>
                </div>

                {/* Total Withdrawn */}
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        📤 TOTAL WITHDRAWN
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                        FCFA {balanceData!.totalWithdrawn.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">This month</p>
                    <button className="w-full px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        View History →
                    </button>
                </div>
            </div>

            {/* BALANCE CHART */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">📈 Balance History</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                            7 Days
                        </button>
                        <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium">
                            30 Days
                        </button>
                        <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                            90 Days
                        </button>
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Balance history chart will be displayed here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Area chart showing balance over time
                        </p>
                    </div>
                </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
                    <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline">
                        View All →
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Date/Time
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Type
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Amount
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Balance After
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity!.map((activity, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="text-xs font-medium text-foreground">{activity.date}</div>
                                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(activity.type)}
                                            <div>
                                                <div className="text-xs font-medium text-foreground">{activity.label}</div>
                                                {activity.reference && (
                                                    <div className="text-xs text-muted-foreground">{activity.reference}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`text-xs font-semibold ${activity.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            {activity.amount > 0 ? "+" : ""}
                                            {activity.amount.toLocaleString()} FCFA
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs font-medium text-foreground">
                                        {activity.balanceAfter.toLocaleString()} FCFA
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                                activity.status
                                            )}`}
                                        >
                                            {activity.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {activity.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                                            {activity.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Showing 1-10 of 156</div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-medium">
                            1
                        </button>
                        <button className="px-3 py-1 hover:bg-muted rounded text-xs font-medium">2</button>
                        <button className="px-3 py-1 hover:bg-muted rounded text-xs font-medium">3</button>
                        <button className="p-2 hover:bg-muted rounded transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* WITHDRAW MODAL */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Withdraw Funds</h3>
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-3 text-xs">
                                <span className="text-muted-foreground">Available Balance:</span>
                                <span className="font-bold text-foreground ml-2">
                                    FCFA {balanceData!.available.toLocaleString()}
                                </span>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Withdrawal Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        FCFA
                                    </span>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="100,000"
                                        className="w-full pl-14 pr-4 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Min: 10,000 FCFA | Max: {balanceData!.available.toLocaleString()} FCFA
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setQuickAmount(10000, "withdraw")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    10K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(50000, "withdraw")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    50K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(100000, "withdraw")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    100K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(balanceData!.available, "withdraw")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    All
                                </button>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Withdrawal Method *
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                                        <input
                                            type="radio"
                                            name="withdrawMethod"
                                            value="bank"
                                            checked={withdrawMethod === "bank"}
                                            onChange={(e) => setWithdrawMethod(e.target.value)}
                                            className="mt-0.5"
                                        />
                                        <div className="flex-1">
                                            <div className="text-xs font-medium text-foreground">Bank Transfer</div>
                                            <div className="text-xs text-muted-foreground">Account: **** **** 1234</div>
                                            <div className="text-xs text-muted-foreground">
                                                Fee: 1,000 FCFA | Time: 1-2 business days
                                            </div>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                                        <input
                                            type="radio"
                                            name="withdrawMethod"
                                            value="mobile"
                                            checked={withdrawMethod === "mobile"}
                                            onChange={(e) => setWithdrawMethod(e.target.value)}
                                            className="mt-0.5"
                                        />
                                        <div className="flex-1">
                                            <div className="text-xs font-medium text-foreground">Mobile Money</div>
                                            <div className="text-xs text-muted-foreground">MTN: +237 670 123 456</div>
                                            <div className="text-xs text-muted-foreground">
                                                Fee: 500 FCFA | Time: Instant
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Withdrawal Amount:</span>
                                    <span className="font-medium">{withdrawAmount || "0"} FCFA</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Processing Fee:</span>
                                    <span className="font-medium">{withdrawMethod === "bank" ? "1,000" : "500"} FCFA</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="font-semibold">You will receive:</span>
                                    <span className="font-bold">
                                        {(parseInt(withdrawAmount || "0") - (withdrawMethod === "bank" ? 1000 : 500)).toLocaleString()} FCFA
                                    </span>
                                </div>
                            </div>

                            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                Withdraw {withdrawAmount || "0"} FCFA
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOP UP MODAL */}
            {showTopUpModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Top Up Balance</h3>
                            <button
                                onClick={() => setShowTopUpModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-3 text-xs">
                                <span className="text-muted-foreground">Current Balance:</span>
                                <span className="font-bold text-foreground ml-2">
                                    FCFA {balanceData!.available.toLocaleString()}
                                </span>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Top-Up Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        FCFA
                                    </span>
                                    <input
                                        type="number"
                                        value={topUpAmount}
                                        onChange={(e) => setTopUpAmount(e.target.value)}
                                        placeholder="50,000"
                                        className="w-full pl-14 pr-4 py-2 bg-muted border border-border rounded-lg text-sm"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Min: 5,000 FCFA | Max: 1,000,000 FCFA
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setQuickAmount(5000, "topup")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    5K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(10000, "topup")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    10K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(50000, "topup")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    50K
                                </button>
                                <button
                                    onClick={() => setQuickAmount(100000, "topup")}
                                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/80"
                                >
                                    100K
                                </button>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Payment Method *
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                                        <input
                                            type="radio"
                                            name="topUpMethod"
                                            value="mobile"
                                            checked={topUpMethod === "mobile"}
                                            onChange={(e) => setTopUpMethod(e.target.value)}
                                            className="mt-0.5"
                                        />
                                        <div className="flex-1">
                                            <div className="text-xs font-medium text-foreground">Mobile Money</div>
                                            <div className="text-xs text-muted-foreground">Pay with MTN or Orange Money</div>
                                            <div className="text-xs text-muted-foreground">Fee: 2% | Time: Instant</div>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                                        <input
                                            type="radio"
                                            name="topUpMethod"
                                            value="bank"
                                            checked={topUpMethod === "bank"}
                                            onChange={(e) => setTopUpMethod(e.target.value)}
                                            className="mt-0.5"
                                        />
                                        <div className="flex-1">
                                            <div className="text-xs font-medium text-foreground">Bank Transfer</div>
                                            <div className="text-xs text-muted-foreground">Transfer to our account</div>
                                            <div className="text-xs text-muted-foreground">Fee: Free | Time: 1-2 business days</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Top-Up Amount:</span>
                                    <span className="font-medium">{topUpAmount || "0"} FCFA</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Processing Fee:</span>
                                    <span className="font-medium">
                                        {topUpMethod === "mobile" ? Math.round(parseInt(topUpAmount || "0") * 0.02) : "0"} FCFA
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="font-semibold">Total to pay:</span>
                                    <span className="font-bold">
                                        {(
                                            parseInt(topUpAmount || "0") +
                                            (topUpMethod === "mobile" ? Math.round(parseInt(topUpAmount || "0") * 0.02) : 0)
                                        ).toLocaleString()}{" "}
                                        FCFA
                                    </span>
                                </div>
                            </div>

                            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
