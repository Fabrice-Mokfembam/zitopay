"use client";

import { useState } from "react";
import { Download, Calendar, BarChart3, DollarSign, TrendingUp, Activity, X } from "lucide-react";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import {
  useDashboardSummary,
  useDashboardStats,
  useVolumeOverTime,
  useSuccessVsFailed,
  useGatewayBreakdown,
  useCollectionsVsPayouts,
  useExportTransactions,
} from "@/features/reports/queries";
import MetricCard from "./components/MetricCard";
import ChartCard from "./components/ChartCard";
import ScheduledReportsList from "./components/ScheduledReportsList";
import { toast } from "sonner";

export default function ReportsPage() {
  const { merchant } = useUserMerchantData();
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d" | "all">("30d");
  const [chartDays, setChartDays] = useState(30);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"CSV" | "EXCEL">("CSV");

  // API Hooks
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: stats, isLoading: statsLoading } = useDashboardStats(
    merchant?.id || "",
    selectedPeriod
  );
  const { data: volumeData, isLoading: volumeLoading } = useVolumeOverTime(chartDays);
  const { data: successData, isLoading: successLoading } = useSuccessVsFailed();
  const { data: gatewayData, isLoading: gatewayLoading } = useGatewayBreakdown();
  const { data: collectionsData, isLoading: collectionsLoading } = useCollectionsVsPayouts();
  const exportMutation = useExportTransactions();

  const handleExport = async () => {
    try {
      const blob = await exportMutation.mutateAsync({
        format: exportFormat,
        filters: {},
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions_${new Date().toISOString().split("T")[0]}.${
        exportFormat === "CSV" ? "csv" : "xlsx"
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Report exported successfully");
      setShowExportModal(false);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to export report");
    }
  };

  const formatAmount = (amount: string | number): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatCurrency = (amount: string): string => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Analyze your business performance and export reports
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as "7d" | "30d" | "90d" | "all")}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <MetricCard key={i} label="" value="" isLoading={true} />
            ))}
          </>
        ) : stats && stats.stats && stats.stats.length > 0 ? (
          stats.stats.map((stat, index) => {
            const icons = [DollarSign, Activity, BarChart3, TrendingUp, Calendar];
            const bgColors = [
              "bg-purple-50",
              "bg-blue-50",
              "bg-green-50",
              "bg-emerald-50",
              "bg-orange-50",
            ];
            const iconColors = [
              "text-purple-600",
              "text-blue-600",
              "text-green-600",
              "text-emerald-600",
              "text-orange-600",
            ];
            const Icon = icons[index % icons.length];

            return (
              <MetricCard
                key={index}
                label={stat.label}
                value={stat.value}
                currency={stat.currency}
                change={stat.change}
                trend={stat.trend}
                subtitle={stat.subtitle}
                icon={<Icon className="w-4 h-4 text-white" />}
                bgColor={bgColors[index % bgColors.length]}
                iconColor={iconColors[index % iconColors.length]}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-sm text-gray-500">No stats data available</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Transactions Today
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.totalTransactionsToday}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              This Week
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.totalTransactionsThisWeek}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              This Month
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.totalTransactionsThisMonth}
            </p>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Over Time */}
        <ChartCard
          title="Transaction Volume"
          subtitle="Collections vs Payouts over time"
          isLoading={volumeLoading}
          actions={
            <div className="flex gap-2">
              {(Array.isArray([7, 30, 90]) ? [7, 30, 90] : []).map((days) => (
                <button
                  key={days}
                  onClick={() => setChartDays(days)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    chartDays === days
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          }
        >
          {volumeData && volumeData.data && Array.isArray(volumeData.data) ? (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  Volume chart: {volumeData.data.length} data points
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Collections and payouts over the last {chartDays} days
                </p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  No volume data available
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Collections and payouts over the last {chartDays} days
                </p>
              </div>
            </div>
          )}
        </ChartCard>

        {/* Success vs Failed */}
        <ChartCard
          title="Transaction Status"
          subtitle="Success vs Failed transactions"
          isLoading={successLoading}
        >
        {successData && successData.total > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-900">Successful</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {((successData.successful / successData.total) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">({successData.successful} transactions)</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-gray-900">Failed</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {((successData.failed / successData.total) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">({successData.failed} transactions)</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${(successData.successful / successData.total) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-sm text-gray-500">No transaction status data available</p>
          </div>
        )}
        </ChartCard>
      </div>

      {/* Gateway Breakdown */}
      <ChartCard
        title="Gateway Performance"
        subtitle="Transaction distribution by gateway"
        isLoading={gatewayLoading}
      >
        {gatewayData && gatewayData.breakdown && gatewayData.breakdown.length > 0 ? (
          <div className="space-y-4">
            {gatewayData.breakdown.map((gateway) => (
              <div key={gateway.gateway}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{gateway.gateway}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {gateway.percentage}% ({formatAmount(gateway.count)})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      gateway.gateway === "MTN_MOMO"
                        ? "bg-yellow-500"
                        : gateway.gateway === "ORANGE_MONEY"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${gateway.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-sm text-gray-500">No gateway data available</p>
          </div>
        )}
      </ChartCard>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <ScheduledReportsList />
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Export Report</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">Format *</label>
                <div className="flex gap-3">
                  {(["CSV", "EXCEL"] as const).map((format) => (
                    <label key={format} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="exportFormat"
                        value={format}
                        checked={exportFormat === format}
                        onChange={(e) => setExportFormat(e.target.value as "CSV" | "EXCEL")}
                      />
                      <span className="text-xs text-gray-700 uppercase">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={exportMutation.isPending}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exportMutation.isPending ? "Exporting..." : "Export"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
