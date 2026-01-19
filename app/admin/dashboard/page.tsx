"use client";

import {
    Building2,
    TrendingUp,
    DollarSign,
    CheckCircle2,
    XCircle,
    Clock,
    RefreshCw,
    ArrowUp,
    ArrowDown,
    ChevronDown,
    FileText,
} from "lucide-react";
import { usePlatformMetrics, useHealthMetrics, useGatewayPerformance } from "@/features/admin/queries";

// Skeleton loader component for metric cards
function MetricCardSkeleton() {
    return (
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between mb-3">
                <div className="w-5 h-5 bg-gray-300 rounded" />
                <div className="w-16 h-4 bg-gray-300 rounded" />
            </div>
            <div className="w-32 h-3 bg-gray-300 rounded mb-2" />
            <div className="w-24 h-8 bg-gray-300 rounded mt-2" />
            <div className="w-40 h-3 bg-gray-300 rounded mt-1" />
        </div>
    );
}

// Skeleton loader for gateway performance
function GatewayPerformanceSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="w-40 h-6 bg-gray-300 rounded animate-pulse" />
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
                            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                        </div>
                        <div className="flex gap-1 h-8">
                            <div className="flex-1 bg-gray-200 rounded-l animate-pulse" />
                            <div className="flex-1 bg-gray-200 rounded-r animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    // Fetch dashboard data using hooks
    const { data: platformMetrics, isLoading: isLoadingPlatform, error: platformError } = usePlatformMetrics();
    const { data: healthMetrics, isLoading: isLoadingHealth, error: healthError } = useHealthMetrics();
    const { data: gatewayPerformance, isLoading: isLoadingGateway, error: gatewayError } = useGatewayPerformance();

    // Map platform metrics to UI format
    const platformMetricsData = platformMetrics ? [
        {
            label: "TOTAL MERCHANTS",
            value: platformMetrics.totalMerchants.value,
            change: platformMetrics.totalMerchants.change,
            changeValue: platformMetrics.totalMerchants.change,
            trend: platformMetrics.totalMerchants.trend,
            icon: Building2,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-200",
        },
        {
            label: "ACTIVE MERCHANTS",
            value: platformMetrics.activeMerchants.value,
            change: platformMetrics.activeMerchants.change,
            changeValue: platformMetrics.activeMerchants.change,
            trend: platformMetrics.activeMerchants.trend,
            icon: CheckCircle2,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200",
        },
        {
            label: "PLATFORM REVENUE",
            value: platformMetrics.platformRevenue.value,
            change: platformMetrics.platformRevenue.change,
            changeValue: platformMetrics.platformRevenue.change,
            trend: platformMetrics.platformRevenue.trend,
            icon: DollarSign,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            borderColor: "border-purple-200",
        },
        {
            label: "TOTAL VOLUME",
            value: platformMetrics.totalVolume.value,
            change: platformMetrics.totalVolume.change,
            changeValue: platformMetrics.totalVolume.change,
            trend: platformMetrics.totalVolume.trend,
            icon: TrendingUp,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-200",
        },
    ] : [];

    // Map health metrics to UI format
    const healthMetricsData = healthMetrics ? [
        {
            label: "SUCCESS RATE",
            value: healthMetrics.successRate.value,
            change: healthMetrics.successRate.change,
            status: healthMetrics.successRate.status,
            trend: healthMetrics.successRate.trend,
            icon: CheckCircle2,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200",
        },
        {
            label: "FAILED TRANSACTIONS",
            value: healthMetrics.failedTransactions.value,
            change: healthMetrics.failedTransactions.change,
            changeValue: healthMetrics.failedTransactions.changeValue,
            status: healthMetrics.failedTransactions.status,
            trend: healthMetrics.failedTransactions.trend,
            icon: XCircle,
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            borderColor: "border-red-200",
        },
        {
            label: "PENDING KYB",
            value: healthMetrics.pendingKyb.value,
            change: healthMetrics.pendingKyb.change,
            status: healthMetrics.pendingKyb.status,
            trend: healthMetrics.pendingKyb.trend,
            icon: Clock,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-200",
        },
        {
            label: "RECON ISSUES",
            value: healthMetrics.reconIssues.value,
            change: healthMetrics.reconIssues.change,
            status: healthMetrics.reconIssues.status,
            trend: healthMetrics.reconIssues.trend,
            icon: RefreshCw,
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600",
            borderColor: "border-yellow-200",
        },
    ] : [];

    // Pending Actions (static for now - can be moved to API later)
    const pendingActions = [
        {
            type: "KYB Reviews Needed",
            count: parseInt(healthMetrics?.pendingKyb.value || "0"),
            description: `${healthMetrics?.pendingKyb.value || "0"} merchants awaiting KYB approval`,
            icon: FileText,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            action: "Review Now",
            href: "/admin/merchants/pending-kyb",
        },
        {
            type: "Reconciliation Issues",
            count: parseInt(healthMetrics?.reconIssues.value || "0"),
            description: `${healthMetrics?.reconIssues.value || "0"} unresolved settlement mismatches`,
            icon: RefreshCw,
            color: "text-red-600",
            bgColor: "bg-red-50",
            action: "View Queue",
            href: "/admin/reconciliation",
        },
    ];

    // Recent Activity (static for now - can be moved to API later)
    const recentActivity = [
        {
            type: "kyb",
            title: 'Merchant "ABC Corp" submitted KYB documents',
            time: "5 minutes ago",
            color: "text-orange-600",
        },
        {
            type: "production",
            title: 'Merchant "XYZ Ltd" requested production access',
            time: "10 minutes ago",
            color: "text-green-600",
        },
        {
            type: "recon",
            title: "Settlement reconciliation issue detected",
            subtitle: "Gateway: MTN | Amount: 50,000 FCFA",
            time: "15 minutes ago",
            color: "text-red-600",
        },
        {
            type: "approval",
            title: 'Admin "John" approved KYB for "123 Inc"',
            time: "20 minutes ago",
            color: "text-blue-600",
        },
        {
            type: "transaction",
            title: "Large transaction detected: 5,000,000 FCFA",
            subtitle: "Merchant: ABC Corp | Gateway: MTN",
            time: "25 minutes ago",
            color: "text-purple-600",
        },
    ];

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Dashboard</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Monitor ZitoPay platform health and performance
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        📅 Last 30 Days
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ERROR MESSAGES */}
            {(platformError || healthError || gatewayError) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-semibold mb-1">Error loading dashboard data</p>
                    <p className="text-xs text-red-600">
                        {platformError?.message || healthError?.message || gatewayError?.message}
                    </p>
                </div>
            )}

            {/* PLATFORM METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoadingPlatform ? (
                    // Skeleton loaders
                    Array.from({ length: 4 }).map((_, index) => (
                        <MetricCardSkeleton key={index} />
                    ))
                ) : (
                    platformMetricsData.map((metric, index) => (
                        <div
                            key={index}
                            className={`${metric.bgColor} rounded-lg p-5 border ${metric.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                                <span
                                    className={`flex items-center gap-1 text-sm font-semibold ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"
                                        }`}
                                >
                                    {metric.trend === "up" ? (
                                        <ArrowUp className="w-4 h-4" />
                                    ) : metric.trend === "down" ? (
                                        <ArrowDown className="w-4 h-4" />
                                    ) : null}
                                    {metric.change}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {metric.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {metric.changeValue} vs last month
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* PLATFORM HEALTH */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoadingHealth ? (
                    // Skeleton loaders
                    Array.from({ length: 4 }).map((_, index) => (
                        <MetricCardSkeleton key={index} />
                    ))
                ) : (
                    healthMetricsData.map((metric, index) => (
                        <div
                            key={index}
                            className={`${metric.bgColor} rounded-lg p-5 border ${metric.borderColor}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                                <span
                                    className={`text-sm font-semibold ${metric.trend === "up"
                                        ? "text-green-600"
                                        : metric.trend === "down"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {metric.change}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {metric.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{metric.status}</p>
                        </div>
                    ))
                )}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            📈 Platform Revenue Trend
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
                                7 Days
                            </button>
                            <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                                30 Days
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
                                90 Days
                            </button>
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">
                            Chart will be displayed here
                            <br />
                            <span className="text-xs">
                                (Line chart: Total Revenue, Gateway Fees, Platform Fees)
                            </span>
                        </p>
                    </div>
                </div>

                {/* Merchant Growth Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            📊 Merchant Growth
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
                                7 Days
                            </button>
                            <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                                30 Days
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
                                90 Days
                            </button>
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">
                            Chart will be displayed here
                            <br />
                            <span className="text-xs">
                                (Area chart: New Merchants, Cumulative Total)
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* GATEWAY PERFORMANCE */}
            {isLoadingGateway ? (
                <GatewayPerformanceSkeleton />
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            🎯 Gateway Performance
                        </h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            View Details →
                        </button>
                    </div>

                    <div className="space-y-4">
                        {gatewayPerformance && gatewayPerformance.length > 0 ? (
                            gatewayPerformance.map((gateway, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-900">
                                            {gateway.name}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {gateway.successRate}% Success
                                        </span>
                                    </div>
                                    <div className="flex gap-1 h-8">
                                        <div
                                            className={`${gateway.color} rounded-l flex items-center justify-center text-xs font-medium text-white`}
                                            style={{
                                                width: `${gateway.successRate}%`,
                                            }}
                                        >
                                            {(gateway.successful / 1000).toFixed(0)}K
                                        </div>
                                        <div
                                            className="bg-red-500 rounded-r flex items-center justify-center text-xs font-medium text-white"
                                            style={{
                                                width: `${100 - gateway.successRate}%`,
                                            }}
                                        >
                                            {(gateway.failed / 1000).toFixed(0)}K
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No gateway performance data available
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* PENDING ACTIONS & RECENT ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            ⏳ Pending Actions{" "}
                            <span className="text-sm font-normal text-gray-500">
                                ({pendingActions.reduce((sum, action) => sum + action.count, 0)} total)
                            </span>
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {pendingActions.map((action, index) => (
                            <div
                                key={index}
                                className={`${action.bgColor} rounded-lg p-4 border border-gray-200`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <action.icon className={`w-5 h-5 ${action.color} mt-0.5`} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {action.type}{" "}
                                                <span className={`${action.color}`}>({action.count})</span>
                                            </p>
                                            <p className="text-xs text-gray-600 mt-0.5">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700">
                                    {action.action} →
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View All Pending Actions →
                    </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">📰 Recent Activity</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            View All →
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.title}
                                        </p>
                                        {activity.subtitle && (
                                            <p className="text-xs text-gray-600 mt-0.5">
                                                {activity.subtitle}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700 ml-4">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
