"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Building2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ban,
  Rocket,
} from "lucide-react";

// --- Types ---

interface Merchant {
  id: string;
  businessName: string;
  email: string;
  merchantId: string;
  kybStatus: "APPROVED" | "PENDING" | "REJECTED" | "NOT_SUBMITTED";
  environment: "SANDBOX" | "PRODUCTION_ACTIVE" | "PRODUCTION_PENDING" | "PRODUCTION_SUSPENDED";
  status: "ACTIVE" | "SUSPENDED" | "DISABLED";
  createdAt: string;
}

// --- Dummy Data ---

const DUMMY_MERCHANTS: Merchant[] = [
  {
    id: "1",
    businessName: "ABC Corp",
    email: "abc@example.com",
    merchantId: "M-1234",
    kybStatus: "APPROVED",
    environment: "PRODUCTION_ACTIVE",
    status: "ACTIVE",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "2",
    businessName: "XYZ Ltd",
    email: "xyz@example.com",
    merchantId: "M-5678",
    kybStatus: "PENDING",
    environment: "SANDBOX",
    status: "ACTIVE",
    createdAt: "Jan 09, 2026",
  },
  {
    id: "3",
    businessName: "123 Inc",
    email: "123@example.com",
    merchantId: "M-9012",
    kybStatus: "REJECTED",
    environment: "SANDBOX",
    status: "ACTIVE",
    createdAt: "Jan 08, 2026",
  },
  {
    id: "4",
    businessName: "Tech Solutions",
    email: "tech@example.com",
    merchantId: "M-3456",
    kybStatus: "APPROVED",
    environment: "PRODUCTION_ACTIVE",
    status: "SUSPENDED",
    createdAt: "Jan 07, 2026",
  },
  {
    id: "5",
    businessName: "Global Local",
    email: "info@global-local.com",
    merchantId: "M-7890",
    kybStatus: "NOT_SUBMITTED",
    environment: "SANDBOX",
    status: "ACTIVE",
    createdAt: "Jan 05, 2026",
  },
];

const STATS = [
  { label: "Total Merchants", value: "1,234", color: "bg-blue-50 text-blue-700", type: "TOTAL" },
  { label: "Active Merchants", value: "856", color: "bg-green-50 text-green-700", type: "ACTIVE" },
  { label: "Sandbox Only", value: "366", color: "bg-yellow-50 text-yellow-700", type: "SANDBOX" },
  { label: "Production", value: "490", color: "bg-teal-50 text-teal-700", type: "PRODUCTION" },
  { label: "Suspended", value: "12", color: "bg-red-50 text-red-700", type: "SUSPENDED" },
];

export default function AdminMerchantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Select All
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMerchants(DUMMY_MERCHANTS.map((m) => m.id));
    } else {
      setSelectedMerchants([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedMerchants.includes(id)) {
      setSelectedMerchants(selectedMerchants.filter((item) => item !== id));
    } else {
      setSelectedMerchants([...selectedMerchants, id]);
    }
  };

  // Helper to render Status Badges
  const renderKybBadge = (status: Merchant["kybStatus"]) => {
    switch (status) {
      case "APPROVED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3" /> Approved</span>;
      case "PENDING":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><Clock className="w-3 h-3" /> Pending</span>;
      case "REJECTED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3" /> Rejected</span>;
      case "NOT_SUBMITTED":
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Submitted</span>;
    }
  };

  const renderEnvBadge = (env: Merchant["environment"]) => {
    switch (env) {
      case "PRODUCTION_ACTIVE":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"><Rocket className="w-3 h-3" /> Prod Active</span>;
      case "PRODUCTION_PENDING":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><Clock className="w-3 h-3" /> Prod Pending</span>;
      case "PRODUCTION_SUSPENDED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><Ban className="w-3 h-3" /> Prod Suspended</span>;
      case "SANDBOX":
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Sandbox Only</span>;
    }
  };

  const renderStatusBadge = (status: Merchant["status"]) => {
    switch (status) {
      case "ACTIVE":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case "SUSPENDED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Suspended</span>;
      case "DISABLED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Disabled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Merchants
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage and monitor all merchant accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 text-gray-700">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-medium hover:bg-blue-700 text-white">
            <Plus className="w-3.5 h-3.5" /> Add Merchant
          </button>
        </div>
      </div>

      {/* --- Quick Stats --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {STATS.map((stat) => (
          <div key={stat.type} className={`p-3 rounded-lg border ${stat.color.replace('text-', 'border-').replace('50', '200')} ${stat.color} cursor-pointer hover:opacity-90 transition-opacity`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{stat.label}</p>
            <p className="text-lg font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* --- Search & Filter --- */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 text-gray-700">
            <Filter className="w-3.5 h-3.5" /> Filter <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* --- Merchants Table --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 w-4">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={handleSelectAll}
                    checked={selectedMerchants.length === DUMMY_MERCHANTS.length && DUMMY_MERCHANTS.length > 0}
                  />
                </th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">KYB Status</th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Environment</th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="p-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DUMMY_MERCHANTS.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedMerchants.includes(merchant.id)}
                      onChange={() => handleSelectOne(merchant.id)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-xs text-gray-900 group-hover:text-blue-600 transition-colors">{merchant.businessName}</p>
                        <p className="text-[10px] text-gray-500">{merchant.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{merchant.merchantId}</span>
                  </td>
                  <td className="p-3">
                    {renderKybBadge(merchant.kybStatus)}
                  </td>
                  <td className="p-3">
                    {renderEnvBadge(merchant.environment)}
                  </td>
                  <td className="p-3">
                    {renderStatusBadge(merchant.status)}
                  </td>
                  <td className="p-3 text-xs text-gray-600">
                    {merchant.createdAt}
                  </td>
                  <td className="p-3">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        <div className="p-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{DUMMY_MERCHANTS.length}</span> of <span className="font-medium">1,234</span> merchants
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400 px-1 text-xs">...</span>
              <button
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${currentPage === 50 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                onClick={() => setCurrentPage(50)}
              >
                50
              </button>
            </div>
            <button
              className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 50}
              onClick={() => setCurrentPage(prev => Math.min(50, prev + 1))}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
