"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Download,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    AlertCircle,
    FileText,
    Mail,
    Globe,
    Layers,
    CheckSquare,
    MessageSquare,
    ExternalLink,
    ShieldCheck,
    Building2,
    FileCheck,
    FileWarning,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for KYB Data
interface KYBDocument {
    id: string;
    type: string;
    name: string;
    size: string;
    status: 'valid' | 'warning' | 'invalid';
}

interface MerchantInfo {
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    country: string;
    countryCode: string;
}

interface KYBSubmission {
    id: string;
    merchant: MerchantInfo;
    submittedAt: string;
    documents: KYBDocument[];
    notes: string;
    isResubmission: boolean;
    priority: 'urgent' | 'attention' | 'recent';
    ageInDays: number;
}

// Dummy Data for Pending KYB
const DUMMY_PENDING_KYB: KYBSubmission[] = [
    {
        id: "M-1234",
        merchant: {
            businessName: "ABC Corp",
            email: "abc@example.com",
            phone: "+237 6XX XXX XXX",
            businessType: "E-commerce",
            country: "Cameroon",
            countryCode: "CM",
        },
        submittedAt: "2026-01-08T10:30:00Z",
        documents: [
            { id: "doc1", type: "Business Registration", name: "business_reg.pdf", size: "2.3 MB", status: "valid" },
            { id: "doc2", type: "Tax ID Certificate", name: "tax_cert.pdf", size: "1.8 MB", status: "valid" },
            { id: "doc3", type: "Director ID Card", name: "director_id.jpg", size: "1.2 MB", status: "valid" },
            { id: "doc4", type: "Proof of Address", name: "address_proof.pdf", size: "900 KB", status: "valid" },
        ],
        notes: "First-time submission, all documents appear valid",
        isResubmission: false,
        priority: "urgent",
        ageInDays: 5,
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
        },
        submittedAt: "2026-01-10T14:45:00Z",
        documents: [
            { id: "doc5", type: "Business Registration", name: "registration_new.pdf", size: "1.5 MB", status: "valid" },
            { id: "doc6", type: "Tax ID Certificate", name: "tax_updated.pdf", size: "2.1 MB", status: "valid" },
            { id: "doc7", type: "Director ID Card", name: "id_scan.jpg", size: "3.8 MB", status: "warning" },
        ],
        notes: "Resubmission after rejection - updated tax cert",
        isResubmission: true,
        priority: "attention",
        ageInDays: 3,
    },
    {
        id: "M-9012",
        merchant: {
            businessName: "123 Inc",
            email: "info@123inc.com",
            phone: "+225 0X XXX XXXX",
            businessType: "Services",
            country: "Côte d'Ivoire",
            countryCode: "CI",
        },
        submittedAt: "2026-01-12T09:15:00Z",
        documents: [
            { id: "doc8", type: "Business Registration", name: "123_biz.pdf", size: "1.1 MB", status: "valid" },
            { id: "doc9", type: "Director ID Card", name: "ceo_id.pdf", size: "2.4 MB", status: "valid" },
        ],
        notes: "Quick review needed for seasonal expansion",
        isResubmission: false,
        priority: "recent",
        ageInDays: 1,
    }
];

export default function PendingKYBPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMerchant, setSelectedMerchant] = useState<KYBSubmission | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const openReviewModal = (merchant: KYBSubmission) => {
        setSelectedMerchant(merchant);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        setSelectedMerchant(null);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-8 h-8 text-blue-600" />
                        Pending KYB Review
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Review and approve merchant business documentation</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search merchants..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
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
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Layers className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Total Pending</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">12</span>
                        <span className="text-xs text-blue-600 font-medium">+2 today</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Oldest Submission</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">5d</span>
                        <span className="text-xs text-orange-600 font-medium">Needs attention</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Avg. Review Time</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">1.2d</span>
                        <span className="text-xs text-green-600 font-medium">Optimized</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Approved Today</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">8</span>
                        <span className="text-xs text-purple-600 font-medium">Target: 10</span>
                    </div>
                </div>
            </div>

            {/* Submission Cards */}
            <div className="space-y-4">
                {DUMMY_PENDING_KYB.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                {/* Merchant Info */}
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.priority === 'urgent' ? 'bg-red-50 text-red-600' :
                                        item.priority === 'attention' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg">{item.merchant.businessName}</h3>
                                            {item.isResubmission && (
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                                                    Resubmission
                                                </span>
                                            )}
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${item.priority === 'urgent' ? 'bg-red-50 text-red-600 border-red-100' :
                                                item.priority === 'attention' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-green-50 text-green-600 border-green-100'
                                                }`}>
                                                {item.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {item.merchant.email}</span>
                                            <span className="flex items-center gap-1 font-mono text-xs bg-gray-50 px-1.5 py-0.5 rounded">{item.id}</span>
                                            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {item.merchant.country} ({item.merchant.countryCode})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Submission Age */}
                                <div className="flex items-center gap-8 px-6 lg:border-x border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Submitted</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Clock className={`w-4 h-4 ${item.ageInDays >= 5 ? 'text-red-500' : 'text-gray-400'}`} />
                                            <span className={`font-bold ${item.ageInDays >= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                                {item.ageInDays} days ago
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Documents</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <FileText className="w-4 h-4 text-blue-500" />
                                            <span className="font-bold text-gray-900">{item.documents.length} Uploaded</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => openReviewModal(item)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all text-sm"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Review Docs
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-colors" title="Quick Approve">
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors" title="Quick Reject">
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Document List Preview */}
                            <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {item.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all">
                                        {doc.status === 'valid' ? (
                                            <FileCheck className="w-8 h-8 text-green-500 bg-green-50 p-1.5 rounded-lg shrink-0" />
                                        ) : (
                                            <FileWarning className="w-8 h-8 text-orange-500 bg-orange-50 p-1.5 rounded-lg shrink-0" />
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{doc.type}</p>
                                            <p className="text-xs text-gray-400 truncate">{doc.name} • {doc.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Admin Note Preview */}
                            {item.notes && (
                                <div className="mt-4 flex items-start gap-2 bg-blue-50/30 p-3 rounded-xl border border-blue-50/50">
                                    <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <p className="text-sm text-blue-700 font-medium italic">&quot;{item.notes}&quot;</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                    Load More Submissions
                </button>
            </div>

            {/* Review Modal */}
            <AnimatePresence>
                {isReviewModalOpen && selectedMerchant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeReviewModal}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">{selectedMerchant.merchant.businessName}</h2>
                                        <p className="text-sm text-gray-500 font-mono">{selectedMerchant.id}</p>
                                    </div>
                                    <div className="h-8 w-px bg-gray-200 mx-2" />
                                    <div className="text-sm">
                                        <p className="text-gray-500 text-xs">Submitted On</p>
                                        <p className="text-gray-900 font-medium">{new Date(selectedMerchant.submittedAt).toLocaleDateString()} at {new Date(selectedMerchant.submittedAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeReviewModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <XCircle className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto w-full">
                                <div className="flex flex-col lg:flex-row min-h-full">
                                    {/* Left Column - Doc List */}
                                    <div className="w-full lg:w-72 border-r border-gray-200 p-6 space-y-6 shrink-0 bg-gray-50">
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                                            <div className="space-y-3">
                                                {selectedMerchant.documents.map((doc) => (
                                                    <div
                                                        key={doc.id}
                                                        className={`p-3 rounded-lg border transition-all cursor-pointer group ${doc.id === 'doc1' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:border-blue-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <FileText className={`w-4 h-4 ${doc.id === 'doc1' ? 'text-blue-600' : 'text-gray-400'}`} />
                                                                <div className="min-w-0">
                                                                    <p className={`text-sm font-medium truncate ${doc.id === 'doc1' ? 'text-blue-700' : 'text-gray-900'}`}>{doc.type}</p>
                                                                    <p className="text-xs text-gray-500 truncate">{doc.size}</p>
                                                                </div>
                                                            </div>
                                                            {doc.status === 'valid' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Request More Info
                                        </button>

                                        <div className="pt-6 border-t border-gray-200">
                                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Checklist</h3>
                                            <div className="space-y-3">
                                                {['Business Name Matches', 'Registration Valid', 'Document Legible', 'Not Expired'].map((item) => (
                                                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                                        <div className="relative">
                                                            <input type="checkbox" className="peer sr-only" />
                                                            <div className="w-4 h-4 border border-gray-300 rounded group-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                                                                <CheckSquare className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Preview Area */}
                                    <div className="flex-1 p-6 bg-gray-100/50">
                                        <div className="h-full flex flex-col gap-6">
                                            {/* Doc Preview Wrapper */}
                                            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                                                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                                                    <span className="text-sm font-medium text-gray-900">Preview: Business Registration.pdf</span>
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
                                                    {/* Simulated PDF Preview */}
                                                    <div className="w-full max-w-xl aspect-[1/1.414] bg-white shadow-lg border border-gray-200 rounded p-8 flex flex-col gap-6 scale-95">
                                                        <div className="flex justify-between items-start">
                                                            <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                                            <div className="text-right">
                                                                <div className="h-3 w-32 bg-gray-100 rounded mb-2" />
                                                                <div className="h-2 w-24 bg-gray-50 rounded ml-auto" />
                                                            </div>
                                                        </div>
                                                        <div className="h-6 w-48 bg-gray-100 rounded mx-auto mt-8" />
                                                        <div className="space-y-3 mt-4">
                                                            <div className="h-3 w-full bg-gray-50 rounded" />
                                                            <div className="h-3 w-full bg-gray-50 rounded" />
                                                            <div className="h-3 w-3/4 bg-gray-50 rounded" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decision Panel */}
                                            <div className="shrink-0 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 mb-3">Final Decision</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50 text-gray-600 hover:text-green-700 transition-all font-medium group">
                                                            <CheckCircle className="w-5 h-5 mb-1 text-gray-400 group-hover:text-green-600" />
                                                            Approve KYB
                                                        </button>
                                                        <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-700 transition-all font-medium group">
                                                            <XCircle className="w-5 h-5 mb-1 text-gray-400 group-hover:text-red-600" />
                                                            Reject KYB
                                                        </button>
                                                        <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-all font-medium group">
                                                            <MessageSquare className="w-5 h-5 mb-1 text-gray-400 group-hover:text-blue-600" />
                                                            Request More
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 block">Review Notes (Internal)</label>
                                                    <textarea
                                                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[80px] text-sm"
                                                        placeholder="Add internal notes about this review..."
                                                    />
                                                </div>

                                                <div className="flex justify-end gap-3 pt-2">
                                                    <button
                                                        onClick={closeReviewModal}
                                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all text-sm">
                                                        Submit Decision
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
