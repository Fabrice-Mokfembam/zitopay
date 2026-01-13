"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  AlertCircle,
  Plus,
  RotateCcw,
  Download,
  FileText,
  ChevronDown,
  RefreshCw,
  MoreVertical,
} from "lucide-react";

export default function DashboardPage() {
  // Dummy data - will be replaced with real API data
  const stats = [
    {
      label: "COLLECTIONS",
      value: "FCFA 2,450,000",
      change: "+12.5%",
      trend: "up",
      icon: ArrowDownToLine,
      bgColor: "bg-green-50 dark:bg-green-900/10",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      label: "PAYOUTS",
      value: "FCFA 850,000",
      change: "-5.2%",
      trend: "down",
      icon: ArrowUpFromLine,
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      label: "NET REVENUE",
      value: "FCFA 1,600,000",
      change: "+18.3%",
      trend: "up",
      icon: TrendingUp,
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      label: "BALANCE",
      value: "FCFA 450,000",
      status: "Available",
      icon: Wallet,
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      hasAction: true,
    },
    {
      label: "SUCCESS RATE",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      subtitle: "1,234 / 1,310 transactions",
      icon: CheckCircle2,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
  ];

  const quickStats = [
    { label: "TRANSACTIONS", value: "1,234", subtitle: "This period" },
    { label: "AVG TIME", value: "45s", subtitle: "To complete" },
    { label: "TOTAL FEES", value: "FCFA 45,000", subtitle: "Gateway + Platform" },
    { label: "PENDING", value: "12", subtitle: "Awaiting confirm" },
  ];

  const transactions = [
    {
      date: "Oct 24",
      time: "14:23",
      id: "#27-9281-023",
      status: "success",
      amount: "$120.00",
      gateway: "MTN",
    },
    {
      date: "Oct 24",
      time: "13:45",
      id: "#27-9281-024",
      status: "pending",
      amount: "$43.90",
      gateway: "Orange",
    },
    {
      date: "Oct 23",
      time: "22:10",
      id: "#27-9280-998",
      status: "failed",
      amount: "$210.00",
      gateway: "MTN",
    },
    {
      date: "Oct 23",
      time: "18:34",
      id: "#27-9280-997",
      status: "success",
      amount: "$1,450.00",
      gateway: "Moov",
    },
  ];

  const alerts = [
    {
      type: "warning",
      title: "KYB Status: Pending Review",
      message: "Your KYB documents are under review. Estimated: 2-3 days",
      action: "View Status",
    },
    {
      type: "info",
      title: "Production Access Available",
      message: "Your KYB is approved! Request production access now",
      action: "Request Access",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Business Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor your transactions and business performance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sandbox Mode Badge */}
          <div className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Sandbox Mode
          </div>

          {/* Date Range Selector */}
          <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            📅 Last 30 Days
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Action Buttons */}
          <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors">
            Withdraw
          </button>
          <button className="px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            Top Up
          </button>
        </div>
      </div>

      {/* SECTION 1: KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-4 border ${stat.borderColor}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 bg-white dark:bg-background rounded-lg flex items-center justify-center shadow-sm`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                {stat.change && (
                  <span
                    className={`text-xs font-semibold ${stat.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                      }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-foreground mb-1">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              )}
              {stat.status && (
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.status}
                  </span>
                </div>
              )}
              {stat.hasAction && (
                <button className="mt-3 w-full py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                  Withdraw
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* SECTION 2: CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Volume Chart */}
        <div className="lg:col-span-2 bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Transaction Volume
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
            </div>
            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Chart will be displayed here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Line chart showing Collections, Payouts, and Net Revenue
              </p>
            </div>
          </div>
        </div>

        {/* Gateway Breakdown */}
        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Gateway Breakdown</h3>
              <p className="text-xs text-muted-foreground mt-0.5">By volume</p>
            </div>
          </div>

          {/* Pie Chart Placeholder */}
          <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border mb-4">
            <p className="text-xs text-muted-foreground">Pie Chart</p>
          </div>

          {/* Gateway List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-xs font-medium text-foreground">MTN</span>
              </div>
              <span className="text-xs font-semibold text-foreground">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-xs font-medium text-foreground">Orange</span>
              </div>
              <span className="text-xs font-semibold text-foreground">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-xs font-medium text-foreground">Moov</span>
              </div>
              <span className="text-xs font-semibold text-foreground">10%</span>
            </div>
          </div>

          <button className="mt-4 w-full py-2 text-xs font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg transition-colors">
            View Details →
          </button>
        </div>
      </div>

      {/* SECTION 3: QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-background rounded-xl p-4 border border-border hover:border-orange-200 dark:hover:border-orange-800 transition-colors"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <p className="text-xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* SECTION 4: RECENT TRANSACTIONS */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
          <button className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Transaction ID
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
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="text-xs text-foreground font-medium">{tx.date}</div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
                  </td>
                  <td className="py-3 px-4 text-xs text-foreground font-mono">{tx.id}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${tx.status === "success"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : tx.status === "pending"
                            ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                            : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${tx.status === "success"
                            ? "bg-green-500"
                            : tx.status === "pending"
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                      />
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-foreground">
                    {tx.amount}
                  </td>
                  <td className="py-3 px-4 text-xs text-foreground">{tx.gateway}</td>
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
      </div>

      {/* SECTION 5: ALERTS & NOTIFICATIONS */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Alerts & Notifications
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${alert.type === "warning"
                  ? "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800"
                  : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle
                      className={`w-4 h-4 ${alert.type === "warning"
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-blue-600 dark:text-blue-400"
                        }`}
                    />
                    <h4 className="text-xs font-semibold text-foreground">{alert.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                </div>
                <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline whitespace-nowrap">
                  {alert.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: QUICK ACTIONS */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors">
            <Plus className="w-4 h-4" />
            New Payout
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <RotateCcw className="w-4 h-4" />
            Refund
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <FileText className="w-4 h-4" />
            API Docs
          </button>
        </div>
      </div>
    </div>
  );
}
