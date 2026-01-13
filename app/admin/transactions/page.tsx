"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCcw,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ChevronLeft,
  ChevronRight,
  Building2,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Activity,
  Smartphone,
  Landmark,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for Transaction Data
interface Transaction {
  id: string;
  gatewayRef: string;
  merchant: {
    name: string;
    id: string;
  };
  amount: number;
  currency: string;
  type: 'collection' | 'payout' | 'refund';
  merchantAmount: number;
  fees: number;
  gateway: {
    name: string;
    logo: React.ElementType;
  };
  status: 'SUCCESS' | 'FAILED' | 'PENDING_GATEWAY' | 'INTERNAL_ERROR' | 'REFUNDED';
  timestamp: string;
  payer: {
    name: string;
    phone: string;
  };
  errorCode?: string;
  errorDetail?: string;
}

// Dummy Data
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-982415",
    gatewayRef: "824109341",
    merchant: { name: "ABC Corp", id: "M-1234" },
    amount: 10000,
    currency: "FCFA",
    type: "collection",
    merchantAmount: 9700,
    fees: 300,
    gateway: { name: "MTN MoMo", logo: Smartphone },
    status: "FAILED",
    timestamp: "2026-01-13T10:05:34Z",
    payer: { name: "John Doe", phone: "+237 678 901 234" },
    errorCode: "GATEWAY_TIMEOUT",
    errorDetail: "Gateway connection timed out after 30s",
  },
  {
    id: "TXN-982416",
    gatewayRef: "OM-441223",
    merchant: { name: "XYZ Ltd", id: "M-5678" },
    amount: 50000,
    currency: "FCFA",
    type: "collection",
    merchantAmount: 48500,
    fees: 1500,
    gateway: { name: "Orange Money", logo: Smartphone },
    status: "SUCCESS",
    timestamp: "2026-01-13T10:12:15Z",
    payer: { name: "Jane Smith", phone: "+237 690 123 456" },
  },
  {
    id: "TXN-982417",
    gatewayRef: "BANK-9921",
    merchant: { name: "Glo-Tech", id: "M-9012" },
    amount: 250000,
    currency: "FCFA",
    type: "payout",
    merchantAmount: 247500,
    fees: 2500,
    gateway: { name: "UBA Bank", logo: Landmark },
    status: "PENDING_GATEWAY",
    timestamp: "2026-01-13T10:15:00Z",
    payer: { name: "Glo-Tech Salary", phone: "" },
  },
  {
    id: "TXN-982418",
    gatewayRef: "MTN-99812",
    merchant: { name: "ABC Corp", id: "M-1234" },
    amount: 5000,
    currency: "FCFA",
    type: "refund",
    merchantAmount: 5000,
    fees: 0,
    gateway: { name: "MTN MoMo", logo: Smartphone },
    status: "REFUNDED",
    timestamp: "2026-01-13T10:20:45Z",
    payer: { name: "John Doe", phone: "+237 678 901 234" },
  }
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (txn: Transaction) => {
    setSelectedTxn(txn);
    setIsDetailModalOpen(true);
  };

  const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
    const styles = {
      SUCCESS: "bg-green-100 text-green-700",
      FAILED: "bg-red-100 text-red-700",
      PENDING_GATEWAY: "bg-orange-100 text-orange-700",
      INTERNAL_ERROR: "bg-gray-100 text-gray-700",
      REFUNDED: "bg-blue-100 text-blue-700",
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-blue-600" />
            Platform Transactions
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of all payment flows</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ID, Ref, Merchant..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Status
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Live Monitoring Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Collections (60m)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
          </div>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">45.2M</span>
            <span className="text-xs font-medium text-green-600 flex items-center mb-1">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <div className="h-1 w-full bg-gray-50 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full w-3/4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <ArrowDownLeft className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Payouts (60m)</span>
          </div>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">12.8M</span>
            <span className="text-xs font-medium text-green-600 flex items-center mb-1">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +5%
            </span>
          </div>
          <div className="h-1 w-full bg-gray-50 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-red-500 rounded-full w-1/4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Platform Health</span>
          </div>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">97.5%</span>
            <span className="text-xs font-medium text-red-600 flex items-center mb-1">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -0.5%
            </span>
          </div>
          <div className="h-1 w-full bg-gray-50 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[97.5%]" />
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Volume</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gateway</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DUMMY_TRANSACTIONS.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{new Date(txn.timestamp).toLocaleTimeString()}</span>
                      <span className="text-xs text-gray-500">{new Date(txn.timestamp).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-medium text-gray-600 uppercase tracking-tight">{txn.id}</span>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-blue-500">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{txn.merchant.name}</span>
                        <span className="text-xs text-gray-500">{txn.merchant.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-semibold ${txn.type === 'payout' || txn.type === 'refund' ? 'text-red-600' : 'text-green-600'}`}>
                        {txn.type === 'collection' ? '+' : '-'}{txn.amount.toLocaleString()} {txn.currency}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{txn.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center">
                        <txn.gateway.logo className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{txn.gateway.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetailModal(txn)}
                        className="p-1.5 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-all text-gray-400"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-orange-600">
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">50</span> of <span className="font-medium text-gray-900">12,450</span> entries</p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 disabled:opacity-50 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, "...", 500].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${page === 1 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'}`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[95vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${selectedTxn.status === 'SUCCESS' ? 'bg-green-100 text-green-600' :
                    selectedTxn.status === 'FAILED' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Transaction: #{selectedTxn.id}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase">{selectedTxn.type}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className={`text-xs font-bold uppercase ${selectedTxn.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedTxn.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Re-query
                  </button>
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XCircle className="w-8 h-8 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/30">
                {/* Error Alert if FAILED */}
                {selectedTxn.status === 'FAILED' && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-red-900">Failure Reason: {selectedTxn.errorCode}</h4>
                      <p className="text-sm text-red-700 mt-0.5">{selectedTxn.errorDetail}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* General Info */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-3">General Information</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">External ID</span>
                        <span className="text-sm font-mono font-semibold text-gray-900">{selectedTxn.id}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Merchant</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{selectedTxn.merchant.name}</div>
                          <div className="text-xs text-gray-500">{selectedTxn.merchant.id}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Gross Amount</span>
                        <span className="text-sm font-bold text-gray-900">{selectedTxn.amount.toLocaleString()} {selectedTxn.currency}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Platform Fees</span>
                        <span className="text-sm font-semibold text-red-600">-{selectedTxn.fees.toLocaleString()} {selectedTxn.currency}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-500 font-bold">Net Settlement</span>
                        <span className="text-lg font-bold text-green-600">{selectedTxn.merchantAmount.toLocaleString()} {selectedTxn.currency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gateway Data */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-3">Gateway & Routing</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Provider</span>
                        <div className="flex items-center gap-2">
                          <selectedTxn.gateway.logo className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900">{selectedTxn.gateway.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Gateway Reference</span>
                        <span className="text-sm font-mono font-medium text-gray-900 bg-gray-50 px-2 py-0.5 rounded">{selectedTxn.gatewayRef}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Payer Info</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{selectedTxn.payer.name}</div>
                          <div className="text-xs text-gray-500 font-mono tracking-tight">{selectedTxn.payer.phone}</div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-2">Raw Gateway Response</span>
                        <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                          <pre className="text-[10px] text-green-400 font-mono">
                            {JSON.stringify({
                              "status": selectedTxn.status,
                              "external_id": selectedTxn.gatewayRef,
                              "amount": selectedTxn.amount,
                              "error_code": selectedTxn.errorCode || null,
                              "timestamp": selectedTxn.timestamp
                            }, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Life Cycle Log */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">Transaction Life Cycle</h3>
                  <div className="space-y-6 relative ml-4">
                    <div className="absolute left-[-17px] top-2 bottom-2 w-0.5 bg-gray-100" />
                    {[
                      { time: "10:05:01", msg: "Transaction initiated by merchant API", icon: Clock },
                      { time: "10:05:03", msg: `Dispatched to ${selectedTxn.gateway.name} Gateway`, icon: ArrowUpRight },
                      {
                        time: "10:05:34",
                        msg: selectedTxn.status === 'SUCCESS' ? "Gateway confirmed payment success" : "Gateway returned failure response",
                        icon: selectedTxn.status === 'SUCCESS' ? CheckCircle2 : XCircle,
                        color: selectedTxn.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'
                      },
                      { time: "10:05:35", msg: "Merchant webhook dispatched & acknowledged", icon: Activity },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-6 items-start relative">
                        <div className={`w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 ${log.color || 'text-gray-400'} bg-white`}>
                          <log.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 mb-0.5">{log.time}</p>
                          <p className="text-sm font-bold text-gray-800">{log.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center">
                  <h3 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">Internal Management Tools</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
                      Initiate Refund
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
                      Mark as Success (Manual)
                    </button>
                    <button className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
                      Notify Merchant
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-6 font-medium">All manual overrides require mandatory reason text and are logged for audit compliance.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
