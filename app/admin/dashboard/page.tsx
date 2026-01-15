"use client";

import {
    Building2,
    Users,
    TrendingUp,
    DollarSign,
    CheckCircle2,
    XCircle,
    Clock,
    RefreshCw,
    ArrowUp,
    ArrowDown,
    ChevronDown,
    AlertCircle,
    FileText,
    Rocket,
    CreditCard,
} from "lucide-react";

export default function AdminDashboardPage() {
    // Platform Metrics
    const platformMetrics = [
        {
            label: "TOTAL MERCHANTS",
            value: "1,234",
            change: "+12%",
            changeValue: "+132",
            trend: "up",
            icon: Building2,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-200",
        },
        {
            label: "ACTIVE MERCHANTS",
            value: "987",
            change: "+8%",
            changeValue: "+73",
            trend: "up",
            icon: CheckCircle2,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200",
        },
        {
            label: "PLATFORM REVENUE",
            value: "FCFA 125M",
            change: "+15%",
            changeValue: "+16M",
            trend: "up",
            icon: DollarSign,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            borderColor: "border-purple-200",
        },
        {
            label: "TOTAL VOLUME",
            value: "FCFA 2.5B",
            change: "+10%",
            changeValue: "+227M",
            trend: "up",
            icon: TrendingUp,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-200",
        },
    ];

    // Platform Health
    const healthMetrics = [
        {
            label: "SUCCESS RATE",
            value: "96%",
            change: "+2%",
            status: "Excellent",
            trend: "up",
            icon: CheckCircle2,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200",
        },
        {
            label: "FAILED TRANSACTIONS",
            value: "234",
            change: "-5%",
            changeValue: "-12",
            status: "Improved",
            trend: "down",
            icon: XCircle,
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            borderColor: "border-red-200",
        },
        {
            label: "PENDING KYB",
            value: "12",
            change: "0%",
            status: "Needs review",
            trend: "neutral",
            icon: Clock,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-200",
        },
        {
            label: "RECON ISSUES",
            value: "5",
            change: "-3",
            status: "Improved",
            trend: "down",
            icon: RefreshCw,
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600",
            borderColor: "border-yellow-200",
        },
    ];

    // Gateway Performance
    const gatewayPerformance = [
        {
            name: "MTN Mobile Money",
            successful: 1600000,
            failed: 65000,
            successRate: 96,
            color: "bg-green-500",
        },
        {
            name: "Orange Money",
            successful: 625000,
            failed: 40000,
            successRate: 94,
            color: "bg-blue-500",
        },
        {
            name: "Moov Money",
            successful: 250000,
            failed: 22000,
            successRate: 92,
            color: "bg-purple-500",
        },
    ];

    // Pending Actions
    const pendingActions = [
        {
            type: "KYB Reviews Needed",
            count: 8,
            description: "8 merchants awaiting KYB approval",
            icon: FileText,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            action: "Review Now",
            href: "/admin/merchants/pending-kyb",
        },
        {
            type: "Reconciliation Issues",
            count: 3,
            description: "3 unresolved settlement mismatches",
            icon: RefreshCw,
            color: "text-red-600",
            bgColor: "bg-red-50",
            action: "View Queue",
            href: "/admin/reconciliation",
        },
    ];

    // Recent Activity
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

            {/* PLATFORM METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {platformMetrics.map((metric, index) => (
                    <div
                        key={index}
                        className={`${metric.bgColor} rounded-lg p-5 border ${metric.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                            <span
                                className={`flex items-center gap-1 text-sm font-semibold ${metric.trend === "up" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {metric.trend === "up" ? (
                                    <ArrowUp className="w-4 h-4" />
                                ) : (
                                    <ArrowDown className="w-4 h-4" />
                                )}
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
                ))}
            </div>

            {/* PLATFORM HEALTH */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {healthMetrics.map((metric, index) => (
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
                ))}
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
                    {gatewayPerformance.map((gateway, index) => (
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
                    ))}
                </div>
            </div>

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
