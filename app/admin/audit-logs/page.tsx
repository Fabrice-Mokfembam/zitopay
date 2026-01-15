"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Download,
    Calendar,
    ChevronDown,
    ChevronUp,
    ShieldAlert,
    User,
    CreditCard,
    Settings,
    FileText,
    CheckCircle2,
    XCircle,
    Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface AuditLog {
    id: string;
    timestamp: string;
    actor: {
        name: string;
        role: string;
        email: string;
    };
    action: string;
    target: string;
    ipAddress: string;
    details: {
        before?: any;
        after?: any;
        [key: string]: any;
    };
    severity: "low" | "medium" | "high" | "critical";
}

// Mock Data
const MOCK_LOGS: AuditLog[] = [
    {
        id: "LOG-9283",
        timestamp: "2026-01-13T14:05:01",
        actor: { name: "John Doe", role: "Super Admin", email: "john@zitopay.africa" },
        action: "APPROVED_PRODUCTION_ACCESS",
        target: "ABC Corp (#M-9824)",
        ipAddress: "192.168.1.45",
        severity: "medium",
        details: {
            before: { status: "pending_review" },
            after: { status: "active", approvedAt: "2026-01-13T14:05:01" }
        }
    },
    {
        id: "LOG-9282",
        timestamp: "2026-01-13T13:45:22",
        actor: { name: "Jane Smith", role: "Super Admin", email: "jane@zitopay.africa" },
        action: "CHANGED_GLOBAL_FEES",
        target: "Fee Version 2026.01",
        ipAddress: "10.0.0.12",
        severity: "critical",
        details: {
            before: { percentage: 0.0250 },
            after: { percentage: 0.0275 }
        }
    },
    {
        id: "LOG-9281",
        timestamp: "2026-01-13T11:20:10",
        actor: { name: "Mark Support", role: "Support Admin", email: "mark@zitopay.africa" },
        action: "VIEWED_SENSITIVE_DATA",
        target: "Transaction #TXN-4451",
        ipAddress: "172.16.0.5",
        severity: "low",
        details: {
            reason: "Customer support ticket #4521"
        }
    },
    {
        id: "LOG-9280",
        timestamp: "2026-01-12T09:15:00",
        actor: { name: "SYSTEM", role: "Automation", email: "system@zitopay.africa" },
        action: "AUTO_SETTLEMENT_EXECUTION",
        target: "Batch #BATCH-2026-01-12",
        ipAddress: "127.0.0.1",
        severity: "medium",
        details: {
            processedCount: 1450,
            totalAmount: "45,000,000 FCFA"
        }
    }
];

export default function AuditLogsPage() {
    const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleExpand = (id: string) => {
        setExpandedLogId(expandedLogId === id ? null : id);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical": return "bg-red-100 text-red-700 border-red-200";
            case "high": return "bg-orange-100 text-orange-700 border-orange-200";
            case "medium": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    const getActionIcon = (action: string) => {
        if (action.includes("APPROVED")) return CheckCircle2;
        if (action.includes("FEES") || action.includes("SETTINGS")) return Settings;
        if (action.includes("VIEWED")) return Eye;
        if (action.includes("SETTLEMENT")) return CreditCard;
        return FileText;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShieldAlert className="w-8 h-8 text-blue-600" />
                        Platform Audit Logs
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Immutable record of all administrative actions and system events</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        Export to CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Actor, Target ID, or Action..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm whitespace-nowrap text-gray-700 font-medium">
                        <Filter className="w-4 h-4" />
                        Filter Action
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm whitespace-nowrap text-gray-700 font-medium">
                        <Calendar className="w-4 h-4" />
                        Date Range
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm whitespace-nowrap text-gray-700 font-medium">
                        <User className="w-4 h-4" />
                        By Admin
                    </button>
                </div>
            </div>

            {/* Logs List */}
            <div className="space-y-4">
                {MOCK_LOGS.map((log) => {
                    const Icon = getActionIcon(log.action);
                    const isExpanded = expandedLogId === log.id;

                    return (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm ${isExpanded ? 'border-blue-200 ring-2 ring-blue-500/10' : 'border-gray-200'}`}
                        >
                            {/* Log Summary Row */}
                            <div
                                onClick={() => toggleExpand(log.id)}
                                className="p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                            >
                                <div className="flex items-center gap-4 min-w-[200px]">
                                    <div className={`p-2 rounded-lg ${getSeverityColor(log.severity).replace('border', '')} bg-opacity-20`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 font-mono tracking-tight">{log.timestamp.replace('T', ' ')}</div>
                                        <div className="text-xs text-gray-400 font-mono">{log.id}</div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                                        <span className="font-semibold text-gray-900 text-sm">{log.action}</span>
                                        <span className="hidden md:inline text-gray-300">|</span>
                                        <span className="text-sm text-gray-600">Target: <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{log.target}</span></span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                        <User className="w-3 h-3" />
                                        {log.actor.name} ({log.actor.role})
                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <span>IP: {log.ipAddress}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)} uppercase`}>
                                        {log.severity}
                                    </span>
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Detailed Diff View */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-gray-100 bg-gray-50/50"
                                    >
                                        <div className="p-6">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Change Manifest</h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                                                {log.details.before && (
                                                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                                        <div className="text-red-800 font-semibold mb-2 flex items-center gap-2 text-xs">
                                                            <XCircle className="w-4 h-4" /> BEFORE
                                                        </div>
                                                        <pre className="text-red-700 whitespace-pre-wrap overflow-x-auto text-xs">
                                                            {JSON.stringify(log.details.before, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}

                                                {log.details.after && (
                                                    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                                        <div className="text-green-800 font-semibold mb-2 flex items-center gap-2 text-xs">
                                                            <CheckCircle2 className="w-4 h-4" /> AFTER
                                                        </div>
                                                        <pre className="text-green-700 whitespace-pre-wrap overflow-x-auto text-xs">
                                                            {JSON.stringify(log.details.after, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}

                                                {!log.details.before && !log.details.after && (
                                                    <div className="bg-white border border-gray-200 rounded-lg p-4 col-span-2">
                                                        <div className="text-gray-700 font-semibold mb-2 text-xs">Event Details:</div>
                                                        <pre className="text-gray-600 whitespace-pre-wrap text-xs">
                                                            {JSON.stringify(log.details, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
