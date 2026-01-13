"use client";

import { useState } from "react";
import {
    LifeBuoy,
    Book,
    Search,
    MessageSquare,
    Phone,
    AlertTriangle,
    ExternalLink,
    CheckCircle2,
    FileText,
    ChevronRight,
    Server,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState("documentation");
    const [searchQuery, setSearchQuery] = useState("");

    const docsCategories = [
        {
            title: "Onboarding & KYB",
            icon: FileText,
            color: "bg-blue-50 text-blue-600 border-blue-200",
            articles: ["Verifying Merchant Documents", "Updating KYB Status", "Handling Rejections"]
        },
        {
            title: "Finance & Settlements",
            icon: CheckCircle2,
            color: "bg-green-50 text-green-600 border-green-200",
            articles: ["Processing Manual Payouts", "Reconciliation Disputes", "Fee Structure Guide"]
        },
        {
            title: "Technical Issues",
            icon: Server,
            color: "bg-purple-50 text-purple-600 border-purple-200",
            articles: ["Webhook Debugging", "API Rate Limits", "Gateway Error Codes"]
        },
        {
            title: "Platform Admin",
            icon: Activity,
            color: "bg-orange-50 text-orange-600 border-orange-200",
            articles: ["Creating Admin Users", "Audit Log Analysis", "Maintenance Mode"]
        }
    ];

    const supportTickets = [
        { id: "#4521", subject: "Withdrawal Failure - ABC Corp", status: "open", priority: "high", time: "2 hours ago" },
        { id: "#4520", subject: "API Key Reset Request", status: "closed", priority: "low", time: "1 day ago" },
        { id: "#4519", subject: "Transaction Dispute #TX992", status: "pending", priority: "medium", time: "2 days ago" }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <LifeBuoy className="w-8 h-8 text-blue-600" />
                        Help & Support Center
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">SOPs, Documentation, and Support Ticket Management</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex gap-1 w-fit">
                {['documentation', 'support'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "documentation" && (
                        <div className="space-y-6">
                            {/* Search Hero */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white relative overflow-hidden shadow-sm">
                                <div className="relative z-10 max-w-2xl">
                                    <h2 className="text-lg font-semibold mb-3">How can we help you today?</h2>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search guides, error codes, or articles..."
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400/30 outline-none text-sm shadow-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12" />
                            </div>

                            {/* Categories Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {docsCategories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <div key={category.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                            <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 text-sm mb-3">{category.title}</h3>
                                            <ul className="space-y-1.5">
                                                {category.articles.map((article) => (
                                                    <li key={article} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                        <ChevronRight className="w-3 h-3" />
                                                        {article}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                                <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                    <Book className="w-4 h-4 text-gray-500" />
                                    Internal Quick Links
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Emergency Response Plan', 'Compliance Handbook 2026', 'Brand Assets', 'API Specs (Private)'].map((link) => (
                                        <a href="#" key={link} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "support" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Ticket Queue */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 text-sm">Active Support Tickets (Zendesk)</h3>
                                    <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                                        View All <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {supportTickets.map((ticket) => (
                                        <div key={ticket.id} className="bg-white border border-gray-200 p-4 rounded-lg flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${ticket.priority === 'high' ? 'bg-red-500' : ticket.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="font-mono text-xs text-gray-400 font-medium">{ticket.id}</span>
                                                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
                                                    </div>
                                                    <div className="text-xs text-gray-500">{ticket.time} • via Email</div>
                                                </div>
                                            </div>
                                            <div className="px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium uppercase text-gray-600">
                                                {ticket.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Operations & Contact */}
                            <div className="space-y-4">
                                {/* Escalation Contact */}
                                <div className="bg-red-50 border border-red-100 p-5 rounded-lg">
                                    <h3 className="font-semibold text-red-800 text-sm mb-1.5 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        Emergency Escalation
                                    </h3>
                                    <p className="text-xs text-red-700 mb-3 leading-relaxed">
                                        For P0 incidents (System Outage, Data Breach), contact the on-call engineer immediately.
                                    </p>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100 shadow-sm mb-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-600 text-xs">JD</div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm">John Doe</div>
                                            <div className="text-xs text-green-600 font-medium">● ON CALL</div>
                                        </div>
                                        <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                            <Phone className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* External Links */}
                                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-3">External Portals</h3>
                                    <div className="space-y-1.5">
                                        <a href="#" className="flex p-2.5 hover:bg-gray-50 rounded-lg text-xs text-gray-700 font-medium transition-colors justify-between items-center group">
                                            MTN Partner Portal
                                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                                        </a>
                                        <a href="#" className="flex p-2.5 hover:bg-gray-50 rounded-lg text-xs text-gray-700 font-medium transition-colors justify-between items-center group">
                                            Orange Money Business
                                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                                        </a>
                                        <a href="#" className="flex p-2.5 hover:bg-gray-50 rounded-lg text-xs text-gray-700 font-medium transition-colors justify-between items-center group">
                                            Stripe Dashboard
                                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
