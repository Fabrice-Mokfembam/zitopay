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
    Upload,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";

export default function PayoutsPage() {
    const { merchant } = useUserMerchantData();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSinglePayoutModal, setShowSinglePayoutModal] = useState(false);
    const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

    // Determine environment based on merchant state
    const environment: "sandbox" | "production" =
        merchant?.productionState === "ACTIVE" ? "production" : "sandbox";

    // Currency display
    const currency = environment === "production" ? "FCFA" : "XAF";

    const stats = {
        total: 850000,
        successful: 456,
        pending: 8,
        failed: 12,
    };

    const payouts = [
        {
            id: "#27-9281-456",
            recipient: "+237 670 123 456",
            amount: 50000,
            gateway: "MTN",
            status: "success",
            date: "Jan 12",
            time: "14:23",
        },
        {
            id: "#27-9281-457",
            recipient: "+237 690 234 567",
            amount: 25000,
            gateway: "Orange",
            status: "pending",
            date: "Jan 12",
            time: "13:45",
        },
        {
            id: "#27-9280-458",
            recipient: "+237 677 345 678",
            amount: 75000,
            gateway: "MTN",
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
                    <h1 className="text-xl font-bold text-foreground">Payouts</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Send money to customers and vendors
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowSinglePayoutModal(true)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Single
                    </button>
                    <button
                        onClick={() => setShowBulkUploadModal(true)}
                        className="px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Bulk Upload
                    </button>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        TOTAL
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        {currency} {stats.total.toLocaleString()}
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
                        placeholder="Search payouts..."
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
                        <option>All Gateways</option>
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
                                    ID
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Recipient
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Amount
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                                    Gateway
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
                            {payouts.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="text-xs font-medium text-foreground">{item.date}</div>
                                        <div className="text-xs text-muted-foreground">{item.time}</div>
                                    </td>
                                    <td className="py-3 px-4 text-xs font-mono text-foreground">{item.id}</td>
                                    <td className="py-3 px-4 text-xs text-foreground">{item.recipient}</td>
                                    <td className="py-3 px-4 text-xs font-semibold text-foreground">
                                        {item.amount.toLocaleString()} {currency}
                                    </td>
                                    <td className="py-3 px-4 text-xs text-foreground">{item.gateway}</td>
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
                    <div className="text-xs text-muted-foreground">Showing 1-20 of 456</div>
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

            {/* SINGLE PAYOUT MODAL */}
            {showSinglePayoutModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">New Payout</h3>
                            <button
                                onClick={() => setShowSinglePayoutModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Recipient Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+237 670 123 456"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Amount ({currency})
                                </label>
                                <input
                                    type="number"
                                    placeholder="50000"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Gateway
                                </label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                                    <option>MTN Mobile Money</option>
                                    <option>Orange Money</option>
                                    <option>Moov Money</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Reference/Description
                                </label>
                                <input
                                    type="text"
                                    placeholder="Salary payment"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3 text-xs">
                                <div className="flex justify-between mb-1">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-medium">50,000 {currency}</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-muted-foreground">Fee:</span>
                                    <span className="font-medium">500 {currency}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-bold">50,500 {currency}</span>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                Send Payout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* BULK UPLOAD MODAL */}
            {showBulkUploadModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Bulk Payout Upload</h3>
                            <button
                                onClick={() => setShowBulkUploadModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm font-medium text-foreground mb-1">
                                    Drop CSV file here or click to browse
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Maximum file size: 5MB
                                </p>
                                <input type="file" accept=".csv" className="hidden" />
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-xs font-medium text-foreground mb-2">CSV Format:</p>
                                <pre className="text-xs text-muted-foreground font-mono">
                                    phone,amount,gateway,reference{"\n"}
                                    +237670123456,10000,MTN,Salary{"\n"}
                                    +237690234567,15000,Orange,Commission
                                </pre>
                            </div>
                            <button className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
