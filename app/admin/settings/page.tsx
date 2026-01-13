"use client";

import { useState } from "react";
import {
    Settings,
    CreditCard,
    Server,
    Shield,
    Save,
    RotateCcw,
    Trash2,
    Database,
    Smartphone,
    Mail,
    Globe,
    AlertTriangle,
    Lock,
    Wifi,
    FileText,
    CheckCircle2,
    Activity,
    AlertOctagon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlatformSettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Mock States for Toggles
    const [gateways, setGateways] = useState({
        mtn: true,
        orange: true,
        bank: false
    });

    const [currency, setCurrency] = useState({
        fcfa: true,
        eur: false,
        usd: false
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "payments", label: "Payments & Fees", icon: CreditCard },
        { id: "gateways", label: "Gateways", icon: Server },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Settings className="w-8 h-8 text-blue-600" />
                        Platform Settings
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Configure global behavior, gateways, and system-wide parameters</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                        Reset Defaults
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-70"
                    >
                        {isSaving ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex gap-1 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Main Settings Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === "general" && (
                            <>
                                {/* General Settings */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-gray-500" />
                                        Platform Identity
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Platform Name</label>
                                            <input
                                                type="text"
                                                defaultValue="ZitoPay"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Support Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="email"
                                                    defaultValue="support@zitopay.africa"
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Support Phone</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    defaultValue="+237 600 000 000"
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Maintenance Mode */}
                                <div className={`border rounded-lg p-5 transition-colors ${maintenanceMode ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${maintenanceMode ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                                                <AlertOctagon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">Maintenance Mode</h3>
                                                <p className="text-xs text-gray-500 mt-1">When enabled, the dashboard is read-only for merchants. APIs return 503.</p>
                                                {maintenanceMode && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200 mt-2">
                                                        <Activity className="w-3 h-3" />
                                                        System Offline
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-orange-500' : 'bg-gray-300'}`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "payments" && (
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gray-500" />
                                        Default Fee Structure
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Active Fee Version</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm">
                                                <option>v2026.01.v1 (Current)</option>
                                                <option>v2025.12.v3 (Legacy)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Mobile Money Fee</div>
                                            <div className="text-2xl font-bold text-gray-900 mt-1">2.5%</div>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Card Process Fee</div>
                                            <div className="text-2xl font-bold text-gray-900 mt-1">3.8%</div>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">Payout Fee</div>
                                            <div className="text-2xl font-bold text-gray-900 mt-1">100 FCFA</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency Configuration</h3>
                                    <div className="space-y-3">
                                        {[
                                            { code: 'XAF', name: 'West/Central African CFA', flag: '🇨🇲' },
                                            { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
                                            { code: 'USD', name: 'US Dollar', flag: '🇺🇸' }
                                        ].map((curr) => (
                                            <div key={curr.code} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{curr.flag}</span>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">{curr.code}</div>
                                                        <div className="text-xs text-gray-500">{curr.name}</div>
                                                    </div>
                                                </div>
                                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${curr.code === 'XAF' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {curr.code === 'XAF' ? 'PRIMARY' : 'ENABLED'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "gateways" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* MTN Widget */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-white text-sm">MTN</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-sm">MTN Mobile Money</h4>
                                                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Operational
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setGateways(prev => ({ ...prev, mtn: !prev.mtn }))}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${gateways.mtn ? 'bg-green-500' : 'bg-gray-300'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${gateways.mtn ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <div className="flex justify-between"><span>Success Rate:</span> <span className="font-mono font-semibold text-gray-700">98.2%</span></div>
                                            <div className="flex justify-between"><span>Avg Latency:</span> <span className="font-mono font-semibold text-gray-700">1.2s</span></div>
                                        </div>
                                    </div>

                                    {/* Orange Widget */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">OM</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-sm">Orange Money</h4>
                                                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Operational
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setGateways(prev => ({ ...prev, orange: !prev.orange }))}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${gateways.orange ? 'bg-green-500' : 'bg-gray-300'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${gateways.orange ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <div className="flex justify-between"><span>Success Rate:</span> <span className="font-mono font-semibold text-gray-700">97.5%</span></div>
                                            <div className="flex justify-between"><span>Avg Latency:</span> <span className="font-mono font-semibold text-gray-700">2.1s</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Retry Logic Configuration</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-700">Max Auto-Retries (Webhooks)</label>
                                            <input type="number" defaultValue="3" className="w-20 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-center" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-700">Backoff Strategy</label>
                                            <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
                                                <option>Exponential</option>
                                                <option>Linear</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-gray-500" />
                                        Access Control
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900">Enforce 2FA for Admins</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">Require Two-Factor Authentication for all administrative accounts.</p>
                                                </div>
                                            </div>
                                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                                                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">IP Whitelist (CIDR)</label>
                                            <textarea
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm h-24"
                                                placeholder="192.168.1.0/24"
                                                defaultValue="10.0.0.1/32"
                                            />
                                            <p className="text-xs text-gray-500">Enter one IP range per line. Leave empty to allow all (Not Recommended).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - System Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-900 text-white rounded-lg p-5 shadow-sm">
                            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-400" />
                                System Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 text-xs">Database Load</span>
                                    <span className="text-green-400 font-mono text-xs">12%</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-green-400 h-full w-[12%]"></div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 text-xs">API Latency</span>
                                    <span className="text-green-400 font-mono text-xs">45ms</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-green-400 h-full w-[25%]"></div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 text-xs">Error Rate</span>
                                    <span className="text-green-400 font-mono text-xs">0.01%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                Maintenance Actions
                            </h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors text-left group">
                                    <span className="font-medium text-gray-700 text-xs">Clear System Cache</span>
                                    <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </button>
                                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors text-left group">
                                    <span className="font-medium text-gray-700 text-xs">Purge Temp Files</span>
                                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                                </button>
                                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors text-left group">
                                    <span className="font-medium text-gray-700 text-xs">Restart Webhooks</span>
                                    <Wifi className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
