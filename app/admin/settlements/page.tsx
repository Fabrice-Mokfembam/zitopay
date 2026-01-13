"use client";

import {
  Landmark,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
  Building2,
  ShieldCheck,
  ArrowRight,
  Play,
  MoreVertical,
  Wallet,
  AlertCircle,
} from "lucide-react";

// Types for Settlement Batch Data
interface SettlementBatch {
  id: string;
  period: string;
  merchantCount: number;
  totalGross: number;
  totalFees: number;
  totalNet: number;
  status: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'FAILED';
  createdAt: string;
}

// Dummy Data
const DUMMY_BATCHES: SettlementBatch[] = [
  {
    id: "#SET-2026-001",
    period: "Jan 1-7, 2026",
    merchantCount: 450,
    totalGross: 125000000,
    totalFees: 5000000,
    totalNet: 120000000,
    status: "COMPLETED",
    createdAt: "2026-01-08",
  },
  {
    id: "#SET-2026-002",
    period: "Jan 8-14, 2026",
    merchantCount: 482,
    totalGross: 152000000,
    totalFees: 7000000,
    totalNet: 145000000,
    status: "PENDING",
    createdAt: "2026-01-15",
  },
  {
    id: "#SET-2026-003",
    period: "Jan 15, 2026 (Daily)",
    merchantCount: 12,
    totalGross: 5800000,
    totalFees: 300000,
    totalNet: 5500000,
    status: "PROCESSING",
    createdAt: "2026-01-16",
  }
];

export default function SettlementsPage() {
  const StatusBadge = ({ status }: { status: SettlementBatch['status'] }) => {
    const styles = {
      COMPLETED: "bg-green-100 text-green-700",
      PENDING: "bg-orange-100 text-orange-700",
      PROCESSING: "bg-blue-100 text-blue-700",
      FAILED: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Landmark className="w-8 h-8 text-blue-600" />
            Settlements Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage bulk payouts and merchant net balances</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Configure Cycle
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Net Payable", value: "850M", unit: "FCFA", icon: Wallet, color: "blue" },
          { label: "Awaiting Auth", value: "12", unit: "Items", icon: Clock, color: "orange" },
          { label: "Processing", value: "3", unit: "Active", icon: Play, color: "blue" },
          { label: "Settled (30d)", value: "4.2B", unit: "FCFA", icon: CheckCircle2, color: "green" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50' : stat.color === 'orange' ? 'bg-orange-50' : 'bg-green-50'}`}>
                <stat.icon className={`w-5 h-5 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`} />
              </div>
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs font-medium text-gray-500">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Level Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Settlement Batches</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search batch ID..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 text-sm"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Merchants</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Net</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DUMMY_BATCHES.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{batch.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{batch.period}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{batch.merchantCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-blue-600">{batch.totalNet.toLocaleString()} FCFA</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{batch.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {batch.status === 'PENDING' && (
                        <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-all flex items-center gap-1.5">
                          <Play className="w-3 h-3 fill-current" />
                          Authorize
                        </button>
                      )}
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Detail View (Simplified Peek) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Active Batch Breakdown</h3>
              <p className="text-gray-500 text-xs">Merchant-level detail for #SET-2026-002</p>
            </div>
            <button className="text-blue-600 font-medium text-xs flex items-center gap-1 hover:text-blue-700">
              Full List <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: "ABC Corp", id: "M-1234", gross: 10000000, net: 9750000, destination: "Bank (UBA)" },
              { name: "XYZ Ltd", id: "M-5678", gross: 5000000, net: 4850000, destination: "Orange Money" },
              { name: "Glo-Tech", id: "M-9012", gross: 25000000, net: 24200000, destination: "Bank (BGFI)" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-white hover:border-gray-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm group-hover:shadow-md">
                    <Building2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.net.toLocaleString()} FCFA</p>
                  <p className="text-xs text-gray-500">via {item.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Settlement Security Alert */}
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl relative overflow-hidden">
            <ShieldCheck className="w-12 h-12 text-orange-200 absolute -right-2 -bottom-2" />
            <h3 className="text-orange-900 font-bold uppercase tracking-wider text-xs mb-3">Security Protocol</h3>
            <p className="text-orange-800 text-sm font-medium mb-3 leading-relaxed">
              Batch authorization requires **Secondary Admin Approval** for amounts exceeding 100M FCFA.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 rounded-lg border border-orange-200 w-fit">
              <ShieldCheck className="w-3 h-3 text-orange-600" />
              <span className="text-xs font-bold text-orange-900 uppercase">Audit Logging Active</span>
            </div>
          </div>

          {/* Operational Balance */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-6">Operational Wallet</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">UBA Escrow</span>
                  <span className="text-sm font-bold text-gray-900">450.5M</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">MTN Payout Node</span>
                  <span className="text-sm font-bold text-gray-900">12.2M</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[15%]" />
                </div>
                <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1 uppercase">
                  <AlertCircle className="w-3 h-3" /> Low Balance Alert
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-lg transition-all border border-gray-200">
              View All Nodes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
