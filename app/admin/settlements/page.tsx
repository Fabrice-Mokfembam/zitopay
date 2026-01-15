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
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-blue-600" />
            Settlements Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage bulk payouts and merchant net balances</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            Configure Cycle
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export All
          </button>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { label: "Net Payable", value: "850M", unit: "FCFA", icon: Wallet, color: "blue" },
          { label: "Awaiting Auth", value: "12", unit: "Items", icon: Clock, color: "orange" },
          { label: "Processing", value: "3", unit: "Active", icon: Play, color: "blue" },
          { label: "Settled (30d)", value: "4.2B", unit: "FCFA", icon: CheckCircle2, color: "green" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`p-1.5 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50' : stat.color === 'orange' ? 'bg-orange-50' : 'bg-green-50'}`}>
                <stat.icon className={`w-4 h-4 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`} />
              </div>
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-[10px] font-medium text-gray-500">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Level Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Settlement Batches</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search batch..."
                className="pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 text-xs"
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
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Batch ID</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Merchants</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Net</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DUMMY_BATCHES.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-xs font-semibold text-gray-900">{batch.id}</td>
                  <td className="px-4 py-2.5 text-xs font-medium text-gray-600">{batch.period}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">{batch.merchantCount}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-semibold text-blue-600">{batch.totalNet.toLocaleString()} FCFA</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-500 font-medium">{batch.createdAt}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {batch.status === 'PENDING' && (
                        <button className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-medium rounded-md transition-all flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          Auth
                        </button>
                      )}
                      <button className="p-1 hover:bg-gray-100 rounded-md transition-all text-gray-400 hover:text-gray-900">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-md transition-all text-gray-400">
                        <MoreVertical className="w-3.5 h-3.5" />
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
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Active Batch Breakdown</h3>
              <p className="text-gray-500 text-xs">Merchant-level detail for #SET-2026-002</p>
            </div>
            <button className="text-blue-600 font-medium text-xs flex items-center gap-1 hover:text-blue-700">
              Full List <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {[
              { name: "ABC Corp", id: "M-1234", gross: 10000000, net: 9750000, destination: "Bank (UBA)" },
              { name: "XYZ Ltd", id: "M-5678", gross: 5000000, net: 4850000, destination: "Orange Money" },
              { name: "Glo-Tech", id: "M-9012", gross: 25000000, net: 24200000, destination: "Bank (BGFI)" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 hover:bg-white hover:border-gray-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm group-hover:shadow-md">
                    <Building2 className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">{item.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">{item.net.toLocaleString()} FCFA</p>
                  <p className="text-[10px] text-gray-500">via {item.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Settlement Security Alert */}
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl relative overflow-hidden">
            <ShieldCheck className="w-10 h-10 text-orange-200 absolute -right-2 -bottom-2" />
            <h3 className="text-orange-900 font-bold uppercase tracking-wider text-[10px] mb-2">Security Protocol</h3>
            <p className="text-orange-800 text-xs font-medium mb-3 leading-relaxed">
              Batch authorization requires **Secondary Admin Approval** for amounts exceeding 100M FCFA.
            </p>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg border border-orange-200 w-fit">
              <ShieldCheck className="w-3 h-3 text-orange-600" />
              <span className="text-[10px] font-bold text-orange-900 uppercase">Audit Logging Active</span>
            </div>
          </div>

          {/* Operational Balance */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-4">Operational Wallet</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-500">UBA Escrow</span>
                  <span className="text-xs font-bold text-gray-900">450.5M</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-500">MTN Payout Node</span>
                  <span className="text-xs font-bold text-gray-900">12.2M</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[15%]" />
                </div>
                <p className="text-[10px] text-red-500 font-bold mt-1.5 flex items-center gap-1 uppercase">
                  <AlertCircle className="w-3 h-3" /> Low Balance Alert
                </p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-all border border-gray-200">
              View All Nodes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
