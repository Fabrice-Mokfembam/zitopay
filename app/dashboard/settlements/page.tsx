"use client";

import { useState } from "react";

// Settlement type definition
interface Settlement {
  id: string;
  period: string;
  amount: number;
  status: "pending" | "completed" | "processing" | "failed";
  expectedDate?: string;
  completedDate?: string;
  bankRef: string | null;
  transactions: {
    collections: number;
    payouts: number;
    refunds: number;
  };
  breakdown: {
    collections: number;
    payouts: number;
    refunds: number;
    fees: number;
  };
}
import {
  Search,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function SettlementsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);

  const stats = {
    pending: 125000,
    thisMonth: 450000,
    lastMonth: 380000,
    ytd: 2500000,
  };

  const settlements: Settlement[] = [
    {
      id: "SET-001",
      period: "Jan 1-7, 2026",
      amount: 125000,
      status: "pending",
      expectedDate: "Jan 10, 2026",
      bankRef: null,
      transactions: { collections: 45, payouts: 3, refunds: 1 },
      breakdown: {
        collections: 150000,
        payouts: 20000,
        refunds: 5000,
        fees: 0,
      },
    },
    {
      id: "SET-002",
      period: "Dec 25-31, 2025",
      amount: 98000,
      status: "completed",
      completedDate: "Jan 3, 2026",
      bankRef: "BNK-REF-12345",
      transactions: { collections: 38, payouts: 2, refunds: 0 },
      breakdown: {
        collections: 120000,
        payouts: 15000,
        refunds: 0,
        fees: 7000,
      },
    },
    {
      id: "SET-003",
      period: "Dec 18-24, 2025",
      amount: 112000,
      status: "completed",
      completedDate: "Dec 27, 2025",
      bankRef: "BNK-REF-12344",
      transactions: { collections: 42, payouts: 1, refunds: 1 },
      breakdown: {
        collections: 135000,
        payouts: 10000,
        refunds: 5000,
        fees: 8000,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "failed":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const openDetailModal = (settlement: Settlement) => {
    setSelectedSettlement(settlement);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Settlements</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Track your settlement periods and bank transfers
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            PENDING
          </p>
          <p className="text-xl font-bold text-foreground">
            FCFA {stats.pending.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            THIS MONTH
          </p>
          <p className="text-xl font-bold text-foreground">
            FCFA {stats.thisMonth.toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            LAST MONTH
          </p>
          <p className="text-xl font-bold text-foreground">
            FCFA {stats.lastMonth.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            TOTAL YTD
          </p>
          <p className="text-xl font-bold text-foreground">
            FCFA {stats.ytd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-background rounded-xl p-4 border border-border space-y-4">
        <div className="flex flex-wrap gap-3">
          <select className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium">
            <option>All Periods</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <select className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Failed</option>
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
                  Period
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Statement
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Bank Ref
                </th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr
                  key={settlement.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => openDetailModal(settlement)}
                >
                  <td className="py-3 px-4 text-xs font-medium text-foreground">
                    {settlement.period}
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-foreground">
                    {settlement.amount.toLocaleString()} FCFA
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        settlement.status
                      )}`}
                    >
                      {settlement.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {settlement.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                      {settlement.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                      {settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {settlement.status === "completed" ? (
                      <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        PDF
                      </button>
                    ) : (
                      <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        View
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground font-mono">
                    {settlement.bankRef || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Showing 1-10 of 52</div>
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

      {/* SETTLEMENT DETAIL MODAL */}
      {showDetailModal && selectedSettlement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl border border-border max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                Settlement: {selectedSettlement.period}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(
                    selectedSettlement.status
                  )}`}
                >
                  {selectedSettlement.status === "completed" && <CheckCircle2 className="w-4 h-4 mr-2" />}
                  {selectedSettlement.status === "pending" && <Clock className="w-4 h-4 mr-2" />}
                  {selectedSettlement.status.charAt(0).toUpperCase() + selectedSettlement.status.slice(1)}
                  {selectedSettlement.status === "pending" && (
                    <span className="ml-2 text-xs">
                      (Expected: {selectedSettlement.expectedDate})
                    </span>
                  )}
                </span>
              </div>

              {/* Breakdown */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Breakdown</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Collections:</span>
                    <span className="font-semibold text-foreground">
                      {selectedSettlement.breakdown.collections.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payouts:</span>
                    <span className="font-semibold text-foreground">
                      -{selectedSettlement.breakdown.payouts.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Refunds:</span>
                    <span className="font-semibold text-foreground">
                      -{selectedSettlement.breakdown.refunds.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Fees:</span>
                    <span className="font-semibold text-foreground">
                      -{selectedSettlement.breakdown.fees.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-bold text-foreground">Net Settlement:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {selectedSettlement.amount.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Transactions</h4>
                <p className="text-xs text-muted-foreground">
                  {selectedSettlement.transactions.collections} collections,{" "}
                  {selectedSettlement.transactions.payouts} payouts,{" "}
                  {selectedSettlement.transactions.refunds} refund(s)
                </p>
              </div>

              {/* Bank Details */}
              {selectedSettlement.status === "completed" && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Bank Details</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="font-mono">**** **** 1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span>Afriland First Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="font-mono">{selectedSettlement.bankRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span>{selectedSettlement.completedDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                {selectedSettlement.status === "completed" && (
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Statement
                  </button>
                )}
                <button className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                  View Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
