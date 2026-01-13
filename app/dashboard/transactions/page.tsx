"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  MoreVertical,
  X,
  Copy,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TransactionType = "all" | "collection" | "payout";
type TransactionStatus = "all" | "success" | "pending" | "failed" | "refunded";

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<TransactionType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus>("all");
  const [selectedGateway, setSelectedGateway] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("last30");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Dummy data - will be replaced with real API data
  const stats = {
    totalVolume: 2500000,
    successful: 1234,
    failed: 45,
    pending: 12,
  };

  const transactions = [
    {
      id: "#27-9281-023",
      type: "collection",
      status: "success",
      amount: 10000,
      currency: "FCFA",
      gateway: "MTN",
      customer: "+237 670 123 456",
      date: "Jan 12, 2026",
      time: "14:23:45",
      reference: "MTN-REF-123456789",
    },
    {
      id: "#27-9281-024",
      type: "payout",
      status: "pending",
      amount: 5000,
      currency: "FCFA",
      gateway: "Orange",
      customer: "+237 690 234 567",
      date: "Jan 12, 2026",
      time: "13:45:12",
      reference: "ORG-REF-987654321",
    },
    {
      id: "#27-9280-998",
      type: "collection",
      status: "failed",
      amount: 15000,
      currency: "FCFA",
      gateway: "MTN",
      customer: "+237 677 345 678",
      date: "Jan 11, 2026",
      time: "22:10:33",
      reference: "MTN-REF-111222333",
      failureReason: "Insufficient balance",
    },
    {
      id: "#27-9280-997",
      type: "collection",
      status: "success",
      amount: 1450000,
      currency: "FCFA",
      gateway: "Bank",
      customer: "+237 680 456 789",
      date: "Jan 11, 2026",
      time: "18:34:22",
      reference: "BANK-REF-444555666",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "failed":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map((t) => t.id));
    }
  };

  const handleSelectTransaction = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id));
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  const openDetailModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Transactions</h1>
        <p className="text-xs text-muted-foreground mt-1">
          View and manage all your payment transactions
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "all"
              ? "bg-orange-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setActiveTab("collection")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "collection"
              ? "bg-green-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          <ArrowDownToLine className="w-4 h-4" />
          Collections
        </button>
        <button
          onClick={() => setActiveTab("payout")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "payout"
              ? "bg-blue-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          <ArrowUpFromLine className="w-4 h-4" />
          Payouts
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            💰 TOTAL VOLUME
          </p>
          <p className="text-xl font-bold text-foreground mb-1">
            FCFA {stats.totalVolume.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">This period</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            ✅ SUCCESSFUL
          </p>
          <p className="text-xl font-bold text-foreground mb-1">{stats.successful}</p>
          <p className="text-xs text-green-600 dark:text-green-400">
            {((stats.successful / (stats.successful + stats.failed + stats.pending)) * 100).toFixed(1)}% Completed
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            ❌ FAILED
          </p>
          <p className="text-xl font-bold text-foreground mb-1">{stats.failed}</p>
          <p className="text-xs text-red-600 dark:text-red-400">
            {((stats.failed / (stats.successful + stats.failed + stats.pending)) * 100).toFixed(1)}% Need review
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            ⏳ PENDING
          </p>
          <p className="text-xl font-bold text-foreground mb-1">{stats.pending}</p>
          <p className="text-xs text-orange-600 dark:text-orange-400">
            {((stats.pending / (stats.successful + stats.failed + stats.pending)) * 100).toFixed(1)}% Processing
          </p>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-background rounded-xl p-4 border border-border space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, amount, phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <option value="today">Today</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>

          <select
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <option value="all">All Gateways</option>
            <option value="mtn">MTN Mobile Money</option>
            <option value="orange">Orange Money</option>
            <option value="moov">Moov Money</option>
            <option value="bank">Bank Transfer</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as TransactionStatus)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <option value="all">All Status</option>
            <option value="success">✅ Success</option>
            <option value="pending">⏳ Pending</option>
            <option value="failed">❌ Failed</option>
            <option value="refunded">🔄 Refunded</option>
          </select>

          <button className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors">
            Clear Filters
          </button>

          <div className="ml-auto flex gap-2">
            <button className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        {/* Table Header with Bulk Actions */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedTransactions.length === transactions.length}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
            <span className="text-xs font-medium text-foreground">
              {selectedTransactions.length > 0
                ? `${selectedTransactions.length} selected`
                : "Select all"}
            </span>
          </div>
          {selectedTransactions.length > 0 && (
            <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2">
              Bulk Actions
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <input type="checkbox" className="rounded border-border opacity-0" />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Date/Time
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Transaction ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Gateway
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => openDetailModal(tx)}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(tx.id)}
                      onChange={() => handleSelectTransaction(tx.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs font-medium text-foreground">{tx.date}</div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs font-mono text-foreground font-medium">{tx.id}</div>
                    <div className="text-xs text-muted-foreground">{tx.customer}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {tx.type === "collection" ? (
                        <>
                          <ArrowDownToLine className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-foreground">Collection</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpFromLine className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-foreground">Payout</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {getStatusIcon(tx.status)}
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </div>
                    {tx.failureReason && (
                      <div className="text-xs text-red-600 dark:text-red-400 mt-1">{tx.failureReason}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs font-semibold text-foreground">
                      {tx.amount.toLocaleString()} {tx.currency}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-foreground">{tx.gateway}</div>
                  </td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
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
          <div className="text-xs text-muted-foreground">
            Showing 1-{transactions.length} of 1,234 transactions
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-medium">
              1
            </button>
            <button className="px-3 py-1 hover:bg-muted rounded text-xs font-medium text-foreground">
              2
            </button>
            <button className="px-3 py-1 hover:bg-muted rounded text-xs font-medium text-foreground">
              3
            </button>
            <span className="text-xs text-muted-foreground">...</span>
            <button className="px-3 py-1 hover:bg-muted rounded text-xs font-medium text-foreground">
              62
            </button>
            <button className="p-2 hover:bg-muted rounded transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* TRANSACTION DETAIL MODAL */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Transaction Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`rounded-lg p-4 border ${getStatusColor(selectedTransaction.status)}`}>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(selectedTransaction.status)}
                  <span className="text-sm font-semibold">
                    {selectedTransaction.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs">
                  {selectedTransaction.status === "success"
                    ? "Transaction completed successfully"
                    : selectedTransaction.status === "pending"
                      ? "Transaction is being processed"
                      : "Transaction failed"}
                </p>
              </div>

              {/* Transaction Information */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Transaction Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono font-medium text-foreground">{selectedTransaction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-foreground">
                      {selectedTransaction.type === "collection" ? "📥 Collection" : "📤 Payout"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {selectedTransaction.date} {selectedTransaction.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gateway:</span>
                    <span className="font-medium text-foreground">{selectedTransaction.gateway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gateway Reference:</span>
                    <span className="font-mono text-xs text-foreground">{selectedTransaction.reference}</span>
                  </div>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Amount Breakdown</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Amount:</span>
                    <span className="font-semibold text-foreground">
                      {selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gateway Fee:</span>
                    <span className="text-foreground">200 FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee:</span>
                    <span className="text-foreground">100 FCFA</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-medium text-foreground">Net Amount:</span>
                    <span className="font-bold text-foreground">
                      {(selectedTransaction.amount - 300).toLocaleString()} {selectedTransaction.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Customer Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone Number:</span>
                    <span className="font-medium text-foreground">{selectedTransaction.customer}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
                {selectedTransaction.status === "success" && (
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refund
                  </button>
                )}
                {selectedTransaction.status === "failed" && (
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
