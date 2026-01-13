"use client";

import { useState } from "react";
import {
    Search,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    MoreVertical,
    X,
    Plus,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
} from "lucide-react";

export default function RefundsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewRefundModal, setShowNewRefundModal] = useState(false);

    const stats = {
        total: 125000,
        successful: 45,
        pending: 3,
        failed: 2,
    };

    const refunds = [
        {
            id: "#27-9281-123",
            txId: "#27-9281-023",
            amount: 10000,
            method: "Reversal",
            reason: "Duplicate payment",
            status: "success",
            date: "Jan 12",
            time: "14:23",
        },
        {
            id: "#27-9281-124",
            txId: "#27-9281-024",
            amount: 5000,
            method: "Payout",
            reason: "Order cancelled",
            status: "pending",
            date: "Jan 12",
            time: "13:45",
        },
        {
            id: "#27-9280-125",
            txId: "#27-9280-998",
            amount: 15000,
            method: "Reversal",
            reason: "Technical error",
            status: "failed",
            date: "Jan 11",
            time: "22:10",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            case "pending":
                return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
            case "failed":
                return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Refunds</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Process refunds for customer payments
                    </p>
                </div>
                <button
                    onClick={() => setShowNewRefundModal(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Refund
                </button>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        TOTAL
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        FCFA {stats.total.toLocaleString()}
                    </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        SUCCESS
                    </p>
                    <p className="text-xl font-bold text-foreground">{stats.successful}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        PENDING
                    </p>
                    <p className="text-xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        FAILED
                    </p>
                    <p className="text-xl font-bold text-foreground">{stats.failed}</p>
                </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="bg-background rounded-xl p-4 border border-border space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search refunds..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium">
                        <option>Last 30 Days</option>
                    </select>
                    <select className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium">
                        <option>All Methods</option>
                        <option>Reversal</option>
                        <option>Payout</option>
                    </select>
                    <select className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium">
                        <option>All Status</option>
                    </select>
                    <button className="ml-auto px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Date
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    TX ID
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Amount
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Method
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Reason
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {refunds.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="text-xs font-medium text-foreground">{item.date}</div>
                                        <div className="text-xs text-muted-foreground">{item.time}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-xs font-mono text-foreground font-medium">{item.txId}</div>
                                        <div className="text-xs text-muted-foreground font-mono">{item.id}</div>
                                    </td>
                                    <td className="py-3 px-4 text-xs font-semibold text-foreground">
                                        {item.amount.toLocaleString()} FCFA
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">
                                            {item.method}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-foreground">{item.reason}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {item.status === "success" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {item.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                                            {item.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="p-1 hover:bg-muted rounded transition-colors">
                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Showing 1-20 of 50</div>
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

            {/* NEW REFUND MODAL */}
            {showNewRefundModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">New Refund</h3>
                            <button
                                onClick={() => setShowNewRefundModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Original Transaction ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="#27-9281-023"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Refund Method
                                </label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                                    <option>Reversal (Instant)</option>
                                    <option>Payout (Manual)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Refund Amount (FCFA)
                                </label>
                                <input
                                    type="number"
                                    placeholder="10000"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Original amount: 10,000 FCFA
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Reason (Required)
                                </label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm mb-2">
                                    <option>Duplicate payment</option>
                                    <option>Customer request</option>
                                    <option>Service not delivered</option>
                                    <option>Wrong amount</option>
                                    <option>Technical error</option>
                                    <option>Other</option>
                                </select>
                                <textarea
                                    placeholder="Additional details (optional)"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm resize-none"
                                />
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-foreground">
                                        This action cannot be undone. The customer will receive the refund immediately.
                                    </p>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                Process Refund
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
