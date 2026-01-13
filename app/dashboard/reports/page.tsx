"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    Download,
    Calendar,
    BarChart3,
    FileText,
    DollarSign,
    Activity,
    Clock,
    ChevronDown,
    X,
    Plus,
} from "lucide-react";

export default function ReportsPage() {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("30d");
    const [reportType, setReportType] = useState("transaction");
    const [exportFormat, setExportFormat] = useState("csv");
    const [scheduleFrequency, setScheduleFrequency] = useState("daily");

    const metrics = {
        revenue: { value: 1600000, change: 12, trend: "up" },
        volume: { value: 2500000, change: 8, trend: "up" },
        transactions: { value: 1234, change: 15, trend: "up" },
        successRate: { value: 96, change: 2, trend: "up" },
    };

    const gatewayPerformance = [
        { name: "MTN", percentage: 65, amount: 1600000 },
        { name: "Orange", percentage: 25, amount: 625000 },
        { name: "Moov", percentage: 10, amount: 250000 },
    ];

    const transactionStatus = [
        { label: "Success", percentage: 96, count: 1234, color: "green" },
        { label: "Pending", percentage: 2, count: 25, color: "orange" },
        { label: "Failed", percentage: 2, count: 25, color: "red" },
    ];

    const topMetrics = {
        peakTime: "2:00 PM - 4:00 PM",
        avgTransaction: 2025,
        largestTransaction: 500000,
        mostUsedGateway: "MTN Mobile Money (65%)",
        bestDay: "Friday (avg 45 transactions)",
    };

    const scheduledReports = [
        {
            id: 1,
            name: "Daily Transaction Summary",
            email: "admin@example.com",
            frequency: "Daily",
        },
        {
            id: 2,
            name: "Weekly Revenue Report",
            email: "finance@example.com",
            frequency: "Weekly",
        },
        {
            id: 3,
            name: "Monthly Settlement Report",
            email: "accounting@example.com",
            frequency: "Monthly",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Analyze your business performance and export reports
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors"
                    >
                        <option value="7d">📅 Last 7 Days</option>
                        <option value="30d">📅 Last 30 Days</option>
                        <option value="90d">📅 Last 90 Days</option>
                        <option value="custom">📅 Custom Range</option>
                    </select>
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* OVERVIEW METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Revenue */}
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`flex items-center gap-1 text-xs font-semibold ${metrics.revenue.trend === "up" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {metrics.revenue.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            +{metrics.revenue.change}%
                        </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        REVENUE
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        FCFA {metrics.revenue.value.toLocaleString()}
                    </p>
                </div>

                {/* Volume */}
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`flex items-center gap-1 text-xs font-semibold ${metrics.volume.trend === "up" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {metrics.volume.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            +{metrics.volume.change}%
                        </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        VOLUME
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        FCFA {metrics.volume.value.toLocaleString()}
                    </p>
                </div>

                {/* Transactions */}
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`flex items-center gap-1 text-xs font-semibold ${metrics.transactions.trend === "up" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {metrics.transactions.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            +{metrics.transactions.change}%
                        </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        TRANSACTIONS
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        {metrics.transactions.value.toLocaleString()}
                    </p>
                </div>

                {/* Success Rate */}
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`flex items-center gap-1 text-xs font-semibold ${metrics.successRate.trend === "up" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {metrics.successRate.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            +{metrics.successRate.change}%
                        </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        SUCCESS RATE
                    </p>
                    <p className="text-xl font-bold text-foreground">{metrics.successRate.value}%</p>
                </div>
            </div>

            {/* REVENUE TREND CHART */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">📈 Revenue Trend</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Collections, Payouts, and Net Revenue</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted">
                            7 Days
                        </button>
                        <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium">
                            30 Days
                        </button>
                        <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted">
                            90 Days
                        </button>
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-muted-foreground">Revenue trend chart will be displayed here</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Line chart showing Collections (green), Payouts (orange), Net Revenue (purple)
                        </p>
                    </div>
                </div>
            </div>

            {/* GATEWAY PERFORMANCE & TRANSACTION STATUS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gateway Performance */}
                <div className="bg-background rounded-xl p-6 border border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Gateway Performance</h3>
                    <div className="space-y-4">
                        {gatewayPerformance.map((gateway) => (
                            <div key={gateway.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-foreground">{gateway.name}</span>
                                    <span className="text-xs font-semibold text-foreground">
                                        {gateway.percentage}% ({gateway.amount.toLocaleString()} FCFA)
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${gateway.name === "MTN"
                                                ? "bg-yellow-500"
                                                : gateway.name === "Orange"
                                                    ? "bg-orange-500"
                                                    : "bg-blue-500"
                                            }`}
                                        style={{ width: `${gateway.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction Status */}
                <div className="bg-background rounded-xl p-6 border border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Transaction Status</h3>
                    <div className="space-y-3">
                        {transactionStatus.map((status) => (
                            <div key={status.label} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-3 h-3 rounded-full ${status.color === "green"
                                                ? "bg-green-500"
                                                : status.color === "orange"
                                                    ? "bg-orange-500"
                                                    : "bg-red-500"
                                            }`}
                                    />
                                    <span className="text-xs font-medium text-foreground">{status.label}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-foreground">{status.percentage}%</p>
                                    <p className="text-xs text-muted-foreground">({status.count})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TOP METRICS */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Top Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Peak Transaction Time</p>
                            <p className="text-sm font-semibold text-foreground">{topMetrics.peakTime}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Average Transaction</p>
                            <p className="text-sm font-semibold text-foreground">
                                {topMetrics.avgTransaction.toLocaleString()} FCFA
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Largest Transaction</p>
                            <p className="text-sm font-semibold text-foreground">
                                {topMetrics.largestTransaction.toLocaleString()} FCFA
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Most Used Gateway</p>
                            <p className="text-sm font-semibold text-foreground">{topMetrics.mostUsedGateway}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Best Day</p>
                            <p className="text-sm font-semibold text-foreground">{topMetrics.bestDay}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK REPORTS */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Quick Reports</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        Transaction Report
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        <DollarSign className="w-4 h-4" />
                        Revenue Report
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        <TrendingUp className="w-4 h-4" />
                        Performance Report
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4" />
                        Settlement Report
                    </button>
                </div>

                {/* Scheduled Reports */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-foreground">Scheduled Reports</h4>
                        <button
                            onClick={() => setShowScheduleModal(true)}
                            className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" />
                            Schedule
                        </button>
                    </div>
                    <div className="space-y-2">
                        {scheduledReports.map((report) => (
                            <div
                                key={report.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs font-medium text-foreground">{report.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {report.frequency} → {report.email}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-xs text-red-600 hover:underline">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* EXPORT REPORT MODAL */}
            {showExportModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Export Report</h3>
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Report Type *</label>
                                <div className="space-y-2">
                                    {["transaction", "revenue", "performance", "settlement"].map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value={type}
                                                checked={reportType === type}
                                                onChange={(e) => setReportType(e.target.value)}
                                            />
                                            <span className="text-xs text-foreground capitalize">{type} Report</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Date Range *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="date"
                                        className="px-3 py-2 bg-muted border border-border rounded-lg text-xs"
                                        defaultValue="2026-01-01"
                                    />
                                    <input
                                        type="date"
                                        className="px-3 py-2 bg-muted border border-border rounded-lg text-xs"
                                        defaultValue="2026-01-31"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Format *</label>
                                <div className="flex gap-3">
                                    {["csv", "excel", "pdf"].map((format) => (
                                        <label key={format} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="exportFormat"
                                                value={format}
                                                checked={exportFormat === format}
                                                onChange={(e) => setExportFormat(e.target.value)}
                                            />
                                            <span className="text-xs text-foreground uppercase">{format}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Include:</label>
                                <div className="space-y-2">
                                    {[
                                        "Transaction details",
                                        "Amount breakdown",
                                        "Fee information",
                                        "Customer information",
                                    ].map((item) => (
                                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="rounded" />
                                            <span className="text-xs text-foreground">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCHEDULE REPORT MODAL */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Schedule Report</h3>
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Report Type *</label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                                    <option>Transaction Report</option>
                                    <option>Revenue Report</option>
                                    <option>Performance Report</option>
                                    <option>Settlement Report</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Frequency *</label>
                                <div className="flex gap-3">
                                    {["daily", "weekly", "monthly"].map((freq) => (
                                        <label key={freq} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="frequency"
                                                value={freq}
                                                checked={scheduleFrequency === freq}
                                                onChange={(e) => setScheduleFrequency(e.target.value)}
                                            />
                                            <span className="text-xs text-foreground capitalize">{freq}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Send Time</label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                                    <option>08:00 AM</option>
                                    <option>12:00 PM</option>
                                    <option>06:00 PM</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Recipients * (comma-separated emails)
                                </label>
                                <input
                                    type="text"
                                    placeholder="admin@example.com, finance@example.com"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">Format</label>
                                <div className="flex gap-3">
                                    {["csv", "excel", "pdf"].map((format) => (
                                        <label key={format} className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="scheduleFormat" defaultChecked={format === "csv"} />
                                            <span className="text-xs text-foreground uppercase">{format}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowScheduleModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                                    Schedule Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
