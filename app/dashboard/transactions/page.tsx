"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  MoreVertical,
  X,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import { useRecentTransactions } from "@/features/merchants/hooks/useMerchant";

type TransactionType = "all" | "collection" | "payout";

export default function TransactionsPage() {
  const { merchantId } = useUserMerchantData();
  const [activeTab, setActiveTab] = useState<TransactionType>("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch transactions using the same hook as dashboard
  // Pass type filter based on activeTab
  const transactionType: 'collection' | 'payout' | 'refund' | undefined = 
    activeTab === "all" ? undefined : activeTab;
  const { data: transactionsData, isLoading: isLoadingTransactions, error: transactionsError } = useRecentTransactions(
    merchantId || '',
    50, // Fetch more transactions for pagination (reduced from 100 to avoid API limits)
    transactionType,
    !!merchantId
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "PENDING_GATEWAY":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
      case "FAILED":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400";
    }
  };

  const formatAmount = (amount: number, currency: string = "XAF") => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4" />;
      case "PENDING_GATEWAY":
        return <Clock className="w-4 h-4" />;
      case "FAILED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };


  const openDetailModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  // Get transactions from API data
  const transactions = transactionsData?.transactions || [];
  
  // Debug logging (remove in production)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Transactions Page Debug:', {
      merchantId,
      activeTab,
      transactionType,
      hasData: !!transactionsData,
      transactionsCount: transactions.length,
      isLoading: isLoadingTransactions,
      error: transactionsError?.message,
      errorDetails: transactionsError
    });
  }

  // Pagination calculations
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleTabChange = (tab: TransactionType) => {
    setActiveTab(tab);
    setCurrentPage(1);
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
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "all"
              ? "bg-orange-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => handleTabChange("collection")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "collection"
              ? "bg-green-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          <ArrowDownToLine className="w-4 h-4" />
          Collections
        </button>
        <button
          onClick={() => handleTabChange("payout")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "payout"
              ? "bg-blue-500 text-white"
              : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          <ArrowUpFromLine className="w-4 h-4" />
          Payouts
        </button>
      </div>


      {/* TRANSACTIONS TABLE */}
      <div className="bg-background rounded-xl p-6 border border-border">
        {transactionsError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-900 dark:text-red-100 font-semibold mb-1">
              Error loading transactions
            </p>
            <p className="text-xs text-red-800 dark:text-red-200">
              {transactionsError.message || 'An unknown error occurred. Please try again.'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-2">
                <summary className="text-xs text-red-700 dark:text-red-300 cursor-pointer">
                  Show error details
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {JSON.stringify(transactionsError, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
        {!merchantId && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              Merchant ID not found. Please ensure you&apos;re logged in.
            </p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Date & Time
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
              {isLoadingTransactions ? (
                // Skeleton Loaders
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 px-4">
                      <div className="w-20 h-3 bg-muted rounded mb-1 animate-pulse" />
                      <div className="w-16 h-3 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-32 h-3 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-3 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-6 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-3 bg-muted rounded mb-1 animate-pulse" />
                      <div className="w-16 h-3 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-3 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : transactions.length > 0 && paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="text-xs text-foreground font-medium">{tx.date}</div>
                      <div className="text-xs text-muted-foreground">{tx.time}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs text-foreground font-mono">
                        {tx.id.length > 20 ? `${tx.id.slice(0, 20)}...` : tx.id}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium text-foreground capitalize">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          tx.status
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === "SUCCESS"
                              ? "bg-green-500"
                              : tx.status === "PENDING_GATEWAY"
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                        />
                        {tx.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-foreground">
                        {formatAmount(tx.amount, tx.currency)}
                      </div>
                      {tx.fees > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Fee: {formatAmount(tx.fees, tx.currency)}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-foreground">
                        {tx.gateway.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <p className="text-sm text-muted-foreground">No transactions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {transactions.length > 0 && (
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-orange-500 text-white"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-xs text-muted-foreground">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 hover:bg-muted rounded text-xs font-medium text-foreground"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        )}
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
                  {selectedTransaction.status === "SUCCESS"
                    ? "Transaction completed successfully"
                    : selectedTransaction.status === "PENDING_GATEWAY"
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
                    <span className="font-medium text-foreground">{selectedTransaction.gateway?.replace("_", " ") || "N/A"}</span>
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
                  {selectedTransaction.fees > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fees:</span>
                      <span className="text-foreground">{formatAmount(selectedTransaction.fees, selectedTransaction.currency)}</span>
                    </div>
                  )}
                  {selectedTransaction.fees > 0 && (
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Net Amount:</span>
                      <span className="font-bold text-foreground">
                        {formatAmount(selectedTransaction.amount - selectedTransaction.fees, selectedTransaction.currency)}
                      </span>
                    </div>
                  )}
                </div>
              </div>


              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
                {selectedTransaction.status === "SUCCESS" && (
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refund
                  </button>
                )}
                {selectedTransaction.status === "FAILED" && (
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
