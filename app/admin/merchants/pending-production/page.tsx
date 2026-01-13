"use client";

import { useState } from "react";
import {
    Rocket,
    Search,
    Filter,
    Download,
    Clock,
    XCircle,
    Eye,
    ShieldCheck,
    Activity,
    Globe,
    Zap,
    Mail,
    ChevronRight,
    Lock,
    BarChart3,
    Info,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for Production Request Data
interface MerchantInfo {
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    country: string;
    countryCode: string;
    kybStatus: string;
    kybApprovedAt: string;
}

interface SandboxActivity {
    totalTransactions: number;
    totalVolume: string;
    successRate: number;
    failedTransactions: number;
    averageAmount: string;
    lastTransactionAt: string;
    integrationQuality: string;
}

interface SecurityChecklist {
    domainVerified: boolean;
    ipAllowlist: boolean;
    webhookVerified: boolean;
    sslValid: boolean;
}

interface ProductionRequest {
    id: string;
    merchant: MerchantInfo;
    requestedAt: string;
    sandboxActivity: SandboxActivity;
    securityChecklist: SecurityChecklist;
    readinessScore: number;
    riskLevel: 'low' | 'very low' | 'medium' | 'high';
    ageInDays: number;
}

// Dummy Data for Pending Production Request
const DUMMY_PRODUCTION_REQUESTS: ProductionRequest[] = [
    {
        id: "M-1234",
        merchant: {
            businessName: "ABC Corp",
            email: "abc@example.com",
            phone: "+237 6XX XXX XXX",
            businessType: "E-commerce",
            country: "Cameroon",
            countryCode: "CM",
            kybStatus: "Approved",
            kybApprovedAt: "2026-01-10T09:00:00Z",
        },
        requestedAt: "2026-01-10T14:30:00Z",
        sandboxActivity: {
            totalTransactions: 234,
            totalVolume: "2,345,678 FCFA",
            successRate: 97.5,
            failedTransactions: 6,
            averageAmount: "10,025 FCFA",
            lastTransactionAt: "2 hours ago",
            integrationQuality: "Excellent",
        },
        securityChecklist: {
            domainVerified: true,
            ipAllowlist: true,
            webhookVerified: true,
            sslValid: true,
        },
        readinessScore: 92,
        riskLevel: "low",
        ageInDays: 3,
    },
    {
        id: "M-5678",
        merchant: {
            businessName: "XYZ Ltd",
            email: "xyz@example.com",
            phone: "+221 7X XXX XXXX",
            businessType: "Retail",
            country: "Senegal",
            countryCode: "SN",
            kybStatus: "Approved",
            kybApprovedAt: "2026-01-05T14:45:00Z",
        },
        requestedAt: "2026-01-12T10:15:00Z",
        sandboxActivity: {
            totalTransactions: 1456,
            totalVolume: "15,678,900 FCFA",
            successRate: 99.2,
            failedTransactions: 12,
            averageAmount: "10,768 FCFA",
            lastTransactionAt: "30 mins ago",
            integrationQuality: "Excellent",
        },
        securityChecklist: {
            domainVerified: true,
            ipAllowlist: true,
            webhookVerified: true,
            sslValid: true,
        },
        readinessScore: 98,
        riskLevel: "very low",
        ageInDays: 1,
    }
];

export default function PendingProductionPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<ProductionRequest | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const openDetailModal = (request: ProductionRequest) => {
        setSelectedRequest(request);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedRequest(null);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Rocket className="w-8 h-8 text-purple-600" />
                        Pending Production Access
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Review requests to move from sandbox to live environment</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search merchants..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Pending Requests</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">5</span>
                        <span className="text-xs text-purple-600 font-medium">+1 since yesterday</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Oldest Request</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">3d</span>
                        <span className="text-xs text-orange-600 font-medium">Within target</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Avg. Approval</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">12h</span>
                        <span className="text-xs text-green-600 font-medium">Excellent speed</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Ready to go live</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">3</span>
                        <span className="text-xs text-blue-600 font-medium">Score &gt; 90</span>
                    </div>
                </div>
            </div>

            {/* Request Cards */}
            <div className="space-y-6">
                {DUMMY_PRODUCTION_REQUESTS.map((request, index) => (
                    <motion.div
                        key={request.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                        <div className="p-8">
                            {/* Card Header */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
                                        <Rocket className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-xl">{request.merchant.businessName}</h3>
                                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                                                <ShieldCheck className="w-3 h-3" />
                                                KYB Approved
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {request.merchant.email}</span>
                                            <span className="flex items-center gap-1 font-mono text-xs bg-gray-50 px-1.5 py-0.5 rounded">{request.id}</span>
                                            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {request.merchant.country}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="text-right mr-4 px-6 border-r border-gray-100 hidden sm:block">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Requested</p>
                                        <p className="text-gray-900 font-bold">{request.ageInDays} days ago</p>
                                    </div>
                                    <button
                                        onClick={() => openDetailModal(request)}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all shadow-sm"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Review Readiness
                                    </button>
                                    <button className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Grid of Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Activity Stats */}
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-purple-600" />
                                            Sandbox Activity
                                        </h4>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">ACTIVE</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Total Transactions</span>
                                            <span className="font-bold text-gray-900">{request.sandboxActivity.totalTransactions}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Success Rate</span>
                                            <span className="font-bold text-green-600">{request.sandboxActivity.successRate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Total Volume</span>
                                            <span className="font-bold text-gray-900">{request.sandboxActivity.totalVolume}</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${request.sandboxActivity.successRate}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Security Checklist */}
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/50">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                                        <Lock className="w-4 h-4 text-blue-600" />
                                        Security Checklist
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">Domain Verified</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">IP Allowlist Configured</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">Webhook Signatures</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">SSL Certificate Valid</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Readiness Score */}
                            </div>
                        </div>

                        {/* Quick Action Footer */}
                        <div className="bg-gray-50/50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-500" />
                                <p className="text-xs font-medium text-gray-500">
                                    Merchant meets all minimum requirements.
                                </p>
                            </div>
                            <button className="flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">
                                Quick Approve
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))
                }
            </div >

            {/* Detail Modal */}
            <AnimatePresence>
                {
                    isDetailModalOpen && selectedRequest && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeDetailModal}
                                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                            <Rocket className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Review: {selectedRequest.merchant.businessName}</h2>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm text-gray-400 font-mono">{selectedRequest.id}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-sm font-bold text-green-600 uppercase tracking-tight">Production Request</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeDetailModal}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <XCircle className="w-8 h-8 text-gray-400" />
                                    </button>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        {/* Right Panel - Stats & Readiness */}
                                        <div className="lg:col-span-8 space-y-8">
                                            {/* Readiness Breakdown */}
                                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-lg font-bold text-gray-900">Readiness Breakdown</h3>
                                                    <div className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <span className="text-sm font-black">READY</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    {[
                                                        { label: 'KYB Compliance', score: 100, color: 'bg-green-500' },
                                                        { label: 'Sandbox Testing', score: 95, color: 'bg-green-500' },
                                                        { label: 'Integration Quality', score: 90, color: 'bg-green-500' },
                                                        { label: 'Security Configuration', score: 95, color: 'bg-green-500' },
                                                        { label: 'Business Verification', score: 80, color: 'bg-blue-500' }
                                                    ].map((item) => (
                                                        <div key={item.label} className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="font-bold text-gray-600">{item.label}</span>
                                                                <span className="font-black text-gray-900">{item.score}/100</span>
                                                            </div>
                                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Chart Mockup - Transaction Volume */}
                                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                                    Sandbox Performance (Last 30 Days)
                                                </h3>
                                                <div className="h-48 bg-gray-50 rounded-2xl flex items-end justify-between p-6 gap-2">
                                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 80, 100].map((val, i) => (
                                                        <div
                                                            key={i}
                                                            className="bg-purple-100 w-full rounded-t-lg transition-all hover:bg-purple-500"
                                                            style={{ height: `${val}%` }}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2">
                                                    <span>30 Days ago</span>
                                                    <span>Today</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Left Panel - Checklist & Decision */}
                                        <div className="lg:col-span-4 space-y-8">
                                            {/* Security Detailed */}
                                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Verification Audit</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { label: 'Domain api.abccorp.com', status: 'verified' },
                                                        { label: 'IP Allowlist Configured', status: 'verified' },
                                                        { label: 'Webhook Response (245ms)', status: 'verified' },
                                                        { label: 'SSL Certificate (Valid)', status: 'verified' },
                                                        { label: 'Rate Limits Set', status: 'pending' }
                                                    ].map((check) => (
                                                        <div key={check.label} className="flex items-center gap-3">
                                                            {check.status === 'verified' ? (
                                                                <div className="w-5 h-5 bg-green-50 border border-green-200 rounded flex items-center justify-center shrink-0">
                                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-5 h-5 bg-orange-50 border border-orange-200 rounded flex items-center justify-center shrink-0">
                                                                    <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                                                                </div>
                                                            )}
                                                            <span className="text-sm font-medium text-gray-700">{check.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Decision Button Panel */}
                                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-3">
                                                <h3 className="text-gray-900 font-bold text-center mb-4">Action Center</h3>
                                                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Approve Live Access
                                                </button>
                                                <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-lg transition-all">
                                                    Reject Request
                                                </button>
                                                <button className="w-full py-2 bg-transparent text-gray-500 font-medium hover:text-gray-700 transition-colors text-sm">
                                                    Request Additional Info
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
        </div>
    );
}
