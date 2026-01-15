"use client";

import { useState } from "react";
import {
    Upload,
    Rocket,
    BarChart3,
    AlertCircle,
    CheckCircle2,
    Search,
    Filter,
    RefreshCcw,
    XCircle,
    ChevronRight,
    Plus,
    Scaling,
    Smartphone,
    Landmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for Reconciliation Data
interface Mismatch {
    id: string;
    type: 'MISSING_IN_DB' | 'MISSING_IN_GW' | 'AMOUNT_DIFF';
    gatewayId: string;
    zitoPayId: string;
    amountGW: number;
    amountZP: number;
    status: 'unresolved' | 'investigating' | 'resolved';
    gateway: string;
    timestamp: string;
}

// Dummy Data
const DUMMY_MISMATCHES: Mismatch[] = [
    {
        id: "M-001",
        type: "MISSING_IN_DB",
        gatewayId: "824901",
        zitoPayId: "-",
        amountGW: 5000,
        amountZP: 0,
        status: "unresolved",
        gateway: "MTN MoMo",
        timestamp: "2026-01-12T14:30:00Z",
    },
    {
        id: "M-002",
        type: "MISSING_IN_GW",
        gatewayId: "-",
        zitoPayId: "#TXN-112",
        amountGW: 0,
        amountZP: 2500,
        status: "investigating",
        gateway: "Orange Money",
        timestamp: "2026-01-12T15:45:00Z",
    },
    {
        id: "M-003",
        type: "AMOUNT_DIFF",
        gatewayId: "902114",
        zitoPayId: "#TXN-445",
        amountGW: 10000,
        amountZP: 9800,
        status: "unresolved",
        gateway: "UBA Bank",
        timestamp: "2026-01-12T16:20:00Z",
    }
];

export default function ReconciliationPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <RefreshCcw className="w-6 h-6 text-blue-600" />
                        Reconciliation Queue
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Match system records with gateway statements</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all"
                    >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Statement
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium">
                        <Rocket className="w-3.5 h-3.5" />
                        Run Auto-Match
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Reports
                    </button>
                </div>
            </div>

            {/* Discrepancy Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                    { label: "Missing in DB", count: 12, color: "orange", icon: AlertCircle },
                    { label: "Missing in GW", count: 5, color: "red", icon: XCircle },
                    { label: "Amount Diff", count: 3, color: "yellow", icon: Scaling },
                    { label: "Auto-Matched", count: 4502, color: "green", icon: CheckCircle2 }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className={`p-1.5 rounded-lg ${stat.color === 'orange' ? 'bg-orange-50' : stat.color === 'red' ? 'bg-red-50' : stat.color === 'yellow' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                <stat.icon className={`w-4 h-4 ${stat.color === 'orange' ? 'text-orange-600' : stat.color === 'red' ? 'text-red-600' : stat.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`} />
                            </div>
                            <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">{stat.count.toLocaleString()}</span>
                            <span className={`text-[10px] font-medium ${stat.color === 'orange' ? 'text-orange-600' : stat.color === 'red' ? 'text-red-600' : stat.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
                                {stat.color === 'green' ? 'OK' : 'Issues'}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Exception Resolution Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-900">Resolution Queue</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Filter mismatches..."
                                className="pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-xs"
                            />
                        </div>
                        <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Filter className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Issue Type</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Gateway ID</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">ZitoPay ID</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Amt (GW)</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Amt (ZP)</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {DUMMY_MISMATCHES.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'MISSING_IN_DB' ? 'bg-orange-500' : item.type === 'MISSING_IN_GW' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                            <span className="text-xs font-medium text-gray-900">{item.type.replace(/_/g, ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{item.gatewayId}</td>
                                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{item.zitoPayId}</td>
                                    <td className="px-4 py-3 text-xs font-medium text-gray-900">{item.amountGW > 0 ? item.amountGW.toLocaleString() : '-'}</td>
                                    <td className="px-4 py-3 text-xs font-medium text-gray-900">{item.amountZP > 0 ? item.amountZP.toLocaleString() : '-'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'unresolved' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 ml-auto">
                                            {item.type === 'MISSING_IN_DB' ? 'Fix In DB' : 'Deep Query'}
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Settlement Reconciliation Panel */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-900 mb-1">Net Settlement Payout Match</h3>
                        <p className="text-gray-500 text-[10px] max-w-md">Comparing expected aggregate payout vs actual received from partner settlement banks.</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-right">
                            <span className="text-[10px] font-medium text-gray-500 uppercase">Expected</span>
                            <div className="text-base font-bold text-gray-900">120,400,000 <span className="text-[10px] text-gray-500">FCFA</span></div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-medium text-gray-500 uppercase">Received</span>
                            <div className="text-base font-bold text-gray-900">120,395,000 <span className="text-[10px] text-red-500">FCFA</span></div>
                        </div>
                        <div className="text-right border-l border-gray-200 pl-6">
                            <span className="text-[10px] font-medium text-red-500 uppercase">Variance</span>
                            <div className="text-base font-bold text-red-600">-5,000 <span className="text-[10px] text-red-500">FCFA</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal (Simplified) */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden p-5"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-gray-900">Upload Statement</h2>
                                <button onClick={() => setIsUploadModalOpen(false)}>
                                    <XCircle className="w-5 h-5 text-gray-300 hover:text-gray-500 transition-colors" />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-2">Select Gateway</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex items-center gap-3 p-2.5 border-2 border-blue-600 rounded-lg bg-blue-50/50">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <Smartphone className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="font-bold text-gray-900 text-xs">MTN MoMo</span>
                                        </button>
                                        <button className="flex items-center gap-3 p-2.5 border border-gray-200 rounded-lg hover:border-gray-300">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <Landmark className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span className="font-bold text-gray-500 text-xs">Orange Money</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Plus className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm">Drop Gateway Excel/CSV</p>
                                    <p className="text-gray-500 text-[10px] font-medium mt-1">Maximum file size 25MB</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-sm text-xs"
                                        onClick={() => setIsUploadModalOpen(false)}
                                    >
                                        Start Validation
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
