"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  Plus,
  RotateCcw,
  Download,
  FileText,
  ChevronDown,
  MoreVertical,
  X,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import {
  useDashboardStats,
  useRecentTransactions,
  useTopUpWallet,
  useWithdrawFromWallet,
} from "@/features/merchants/hooks/useMerchant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// ============================================
// COMPONENTS
// ============================================

// Withdraw Modal
function WithdrawModal({
  isOpen,
  onClose,
  merchantId,
  environment,
}: {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  environment: "sandbox" | "production";
}) {
  const [amount, setAmount] = useState("");
  const [recipientMsisdn, setRecipientMsisdn] = useState("");
  const [gateway, setGateway] = useState<"MTN_MOMO" | "ORANGE_MONEY">("MTN_MOMO");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const withdrawMutation = useWithdrawFromWallet(merchantId);

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    // If starts with country code, return as is, otherwise add 237
    if (digits.startsWith("237")) {
      return digits;
    }
    // If starts with 0, replace with 237
    if (digits.startsWith("0")) {
      return "237" + digits.substring(1);
    }
    // Otherwise, add 237 prefix
    return "237" + digits;
  };

  const validateInputs = (): boolean => {
    setError(null);

    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }

    if (!recipientMsisdn || recipientMsisdn.trim().length === 0) {
      setError("Recipient phone number is required");
      return false;
    }

    const formattedPhone = formatPhoneNumber(recipientMsisdn);
    if (formattedPhone.length < 12 || formattedPhone.length > 15) {
      setError("Invalid phone number format. Use format: 237670000000");
      return false;
    }

    return true;
  };

  const handleWithdraw = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(recipientMsisdn);
      const result = await withdrawMutation.mutateAsync({
        gateway,
        amount: parseFloat(amount),
        currency: environment === "sandbox" ? "EUR" : "XAF",
        recipientMsisdn: formattedPhone,
        environment,
      });

      toast.success("Withdrawal initiated successfully!", {
        description: result.message,
      });

      // Reset form
      setAmount("");
      setRecipientMsisdn("");
      setError(null);
      onClose();

      // Invalidate queries to refresh dashboard data
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "transactions"] });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to withdraw funds";
      setError(errorMessage);
      toast.error("Withdrawal failed", {
        description: errorMessage,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border border-border max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Withdraw Funds</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            disabled={withdrawMutation.isPending}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Gateway
            </label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value as "MTN_MOMO" | "ORANGE_MONEY")}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={withdrawMutation.isPending}
            >
              <option value="MTN_MOMO">MTN Mobile Money</option>
              <option value="ORANGE_MONEY">Orange Money</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Withdrawal Amount ({environment === "sandbox" ? "EUR" : "XAF"})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError(null);
              }}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={withdrawMutation.isPending}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Recipient Phone Number
            </label>
            <input
              type="text"
              value={recipientMsisdn}
              onChange={(e) => {
                setRecipientMsisdn(e.target.value);
                setError(null);
              }}
              placeholder="237670000000 or 0670000000"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={withdrawMutation.isPending}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: 237670000000 (E.164 format)
            </p>
          </div>

          {environment === "sandbox" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-xs text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> In sandbox mode, only EUR currency is supported.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={withdrawMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={withdrawMutation.isPending}
            >
              {withdrawMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Withdraw"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Top Up Modal
function TopUpModal({
  isOpen,
  onClose,
  merchantId,
  environment,
}: {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  environment: "sandbox" | "production";
}) {
  const [amount, setAmount] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [gateway, setGateway] = useState<"MTN_MOMO" | "ORANGE_MONEY">("MTN_MOMO");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const topUpMutation = useTopUpWallet(merchantId);

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    // If starts with country code, return as is, otherwise add 237
    if (digits.startsWith("237")) {
      return digits;
    }
    // If starts with 0, replace with 237
    if (digits.startsWith("0")) {
      return "237" + digits.substring(1);
    }
    // Otherwise, add 237 prefix
    return "237" + digits;
  };

  const validateInputs = (): boolean => {
    setError(null);

    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }

    if (!msisdn || msisdn.trim().length === 0) {
      setError("Phone number is required");
      return false;
    }

    const formattedPhone = formatPhoneNumber(msisdn);
    if (formattedPhone.length < 12 || formattedPhone.length > 15) {
      setError("Invalid phone number format. Use format: 237670000000");
      return false;
    }

    return true;
  };

  const handleTopUp = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(msisdn);
      const result = await topUpMutation.mutateAsync({
        gateway,
        amount: parseFloat(amount),
        currency: environment === "sandbox" ? "EUR" : "XAF",
        msisdn: formattedPhone,
        environment,
      });

      toast.success("Top-up initiated successfully!", {
        description: result.message || "Please complete the payment on your phone.",
      });

      // Reset form
      setAmount("");
      setMsisdn("");
      setError(null);
      onClose();

      // Invalidate queries to refresh dashboard data
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "transactions"] });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to top up wallet";
      setError(errorMessage);
      toast.error("Top-up failed", {
        description: errorMessage,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border border-border max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Top Up Wallet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            disabled={topUpMutation.isPending}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Gateway
            </label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value as "MTN_MOMO" | "ORANGE_MONEY")}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={topUpMutation.isPending}
            >
              <option value="MTN_MOMO">MTN Mobile Money</option>
              <option value="ORANGE_MONEY">Orange Money</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Amount ({environment === "sandbox" ? "EUR" : "XAF"})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError(null);
              }}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={topUpMutation.isPending}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Phone Number
            </label>
            <input
              type="text"
              value={msisdn}
              onChange={(e) => {
                setMsisdn(e.target.value);
                setError(null);
              }}
              placeholder="237670000000 or 0670000000"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={topUpMutation.isPending}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: 237670000000 (E.164 format). You&apos;ll receive a payment prompt on this number.
            </p>
          </div>

          {environment === "sandbox" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-xs text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> In sandbox mode, only EUR currency is supported.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={topUpMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleTopUp}
              className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={topUpMutation.isPending}
            >
              {topUpMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Top Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon mapping for stats
const iconMap: Record<string, typeof Wallet> = {
  "Available Balance": Wallet,
  "Total Revenue": DollarSign,
  "Transactions": Activity,
  "Success Rate": CheckCircle2,
  "Pending": Clock,
};

// Color mapping for stats
const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  "Available Balance": {
    bg: "bg-blue-50 dark:bg-blue-900/10",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
  },
  "Total Revenue": {
    bg: "bg-green-50 dark:bg-green-900/10",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
  },
  "Transactions": {
    bg: "bg-purple-50 dark:bg-purple-900/10",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
  },
  "Success Rate": {
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  "Pending": {
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400",
  },
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

export default function DashboardPage() {
  const router = useRouter();
  const { merchantId, merchant } = useUserMerchantData();
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [period] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  // Determine environment based on merchant state
  const environment: "sandbox" | "production" =
    merchant?.productionState === "ACTIVE" ? "production" : "sandbox";

  // Fetch dashboard data
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats(
    merchantId || '',
    period,
    !!merchantId
  );

  const { data: transactionsData, isLoading: isLoadingTransactions } = useRecentTransactions(
    merchantId || '',
    10,
    undefined,
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

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case 'all': return 'All Time';
      default: return 'Last 30 Days';
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Business Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your transactions and business performance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Environment Badge */}
          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
            environment === "sandbox"
              ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
              : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              environment === "sandbox" ? "bg-orange-500" : "bg-green-500"
            }`} />
            {environment === "sandbox" ? "Sandbox Mode" : "Production Mode"}
          </div>

          {/* Date Range Selector */}
          <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            📅 {getPeriodLabel(period)}
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Action Buttons */}
          <button
            onClick={() => {
              if (!merchantId) {
                toast.error("Merchant ID not found");
                return;
              }
              setWithdrawModalOpen(true);
            }}
            className="px-4 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Withdraw
          </button>
          <button
            onClick={() => {
              if (!merchantId) {
                toast.error("Merchant ID not found");
                return;
              }
              setTopUpModalOpen(true);
            }}
            className="px-4 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2"
          >
            <ArrowUpFromLine className="w-4 h-4" />
            Top Up
          </button>
        </div>
      </div>

      {/* SECTION 1: KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {isLoadingStats ? (
          // Skeleton Loaders
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-background rounded-xl p-4 border border-border animate-pulse"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-muted rounded-lg" />
                <div className="w-12 h-4 bg-muted rounded" />
              </div>
              <div className="w-24 h-3 bg-muted rounded mb-2" />
              <div className="w-32 h-6 bg-muted rounded mb-2" />
              <div className="w-20 h-3 bg-muted rounded" />
            </div>
          ))
        ) : (
          statsData?.stats.map((stat, index) => {
            const Icon = iconMap[stat.label] || Wallet;
            const colors = colorMap[stat.label] || colorMap["Available Balance"];
            return (
              <div
                key={index}
                className={`${colors.bg} rounded-xl p-4 border ${colors.border} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-white dark:bg-background rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      stat.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-foreground mb-1">
                  {stat.value} {stat.currency}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* SECTION 2: RECENT TRANSACTIONS */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
          <button
            onClick={() => router.push('/dashboard/transactions')}
            className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

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
                Array.from({ length: 6 }).map((_, i) => (
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
              ) : transactionsData?.transactions && transactionsData.transactions.length > 0 ? (
                transactionsData.transactions.slice(0, 6).map((tx) => (
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
                        {tx.id.slice(0, 20)}...
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
      </div>


      {/* MODALS */}
      {merchantId && (
        <>
          <WithdrawModal
            isOpen={withdrawModalOpen}
            onClose={() => setWithdrawModalOpen(false)}
            merchantId={merchantId}
            environment={environment}
          />
          <TopUpModal
            isOpen={topUpModalOpen}
            onClose={() => setTopUpModalOpen(false)}
            merchantId={merchantId}
            environment={environment}
          />
        </>
      )}
    </div>
  );
}
