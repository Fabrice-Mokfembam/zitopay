"use client";

import { useState, useEffect } from "react";
import {
    Settings,
    Server,
    Shield,
    Save,
    RotateCcw,
    Mail,
    AlertTriangle,
    Lock,
    CheckCircle2,
    User,
    Copy,
    ExternalLink,
    XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentAdmin, useUpdateAdminProfile } from "@/features/auth/hooks/useAuth";
import {
    usePlatformSettings,
    useUpdateMerchantRegistrationSettings,
    useGlobalGateways,
    useUpdateGlobalGateway
} from "@/features/admin/queries";
import { toast } from "sonner";
import { UpdateGlobalGatewayRequest } from "@/features/admin/types";

export default function PlatformSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Admin profile state
    const [email, setEmail] = useState("");

    // Merchant registration settings state
    const [allowSelfRegistration, setAllowSelfRegistration] = useState(true);
    const [applicationFormUrl, setApplicationFormUrl] = useState("");

    // Hooks
    const { data: adminData, isLoading: adminLoading } = useCurrentAdmin();
    const updateProfileMutation = useUpdateAdminProfile();
    const { data: platformSettingsData, isLoading: platformSettingsLoading } = usePlatformSettings();
    const updateMerchantRegistrationMutation = useUpdateMerchantRegistrationSettings();

    // Gateway Hooks
    const { data: globalGatewaysResponse, isLoading: gatewaysLoading } = useGlobalGateways();
    const updateGatewayMutation = useUpdateGlobalGateway();

    // Load admin data into form
    useEffect(() => {
        if (adminData?.admin) {
            setEmail(adminData.admin.email);
        }
    }, [adminData]);

    useEffect(() => {
        if (!platformSettingsData?.settings) {
            return;
        }

        const allowSetting = platformSettingsData.settings.find((s) => s.key === "allow_merchant_self_registration");
        const formUrlSetting = platformSettingsData.settings.find((s) => s.key === "merchant_application_form_url");

        if (allowSetting?.value != null) {
            setAllowSelfRegistration(allowSetting.value === "true");
        }
        if (formUrlSetting?.value != null) {
            setApplicationFormUrl(formUrlSetting.value);
        }
    }, [platformSettingsData]);


    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    const handleMerchantRegistrationSave = async () => {
        try {
            const result = await updateMerchantRegistrationMutation.mutateAsync({
                allowSelfRegistration,
                applicationFormUrl: applicationFormUrl || "",
            });
            toast.success(result.message || "Settings updated successfully");
        } catch (err: unknown) {
            const error = err as { message?: string; response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || error.message || "Failed to update settings");
        }
    };

    const handleProfileUpdate = async () => {
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            const result = await updateProfileMutation.mutateAsync({ email: email.trim() });
            toast.success(result.message || "Profile updated successfully");

            // Show verification reminder if email changed
            if (result.message?.includes("verify")) {
                toast.info("Please verify your new email address");
            }
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    const handleGatewayUpdate = async (code: string, updates: UpdateGlobalGatewayRequest) => {
        try {
            await updateGatewayMutation.mutateAsync({ code, data: updates });
            toast.success("Gateway settings updated");
        } catch (err) {
            toast.error("Failed to update gateway settings");
            console.error(err);
        }
    };

    const tabs = [
        { id: "profile", label: "Profile Settings", icon: User },
        { id: "registration", label: "Merchant Registration", icon: Settings },
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
                    {activeTab === "profile" ? (
                        <button
                            onClick={handleProfileUpdate}
                            disabled={updateProfileMutation.isPending || !email.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-70"
                        >
                            {updateProfileMutation.isPending ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Update Profile
                                </>
                            )}
                        </button>
                    ) : activeTab === "registration" ? (
                        <button
                            onClick={handleMerchantRegistrationSave}
                            disabled={updateMerchantRegistrationMutation.isPending || platformSettingsLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-70"
                        >
                            {updateMerchantRegistrationMutation.isPending ? (
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
                    ) : (
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
                    )}
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
                    className="space-y-6"
                >
                    {/* Main Settings Panel */}
                    <div className="space-y-6">
                        {activeTab === "profile" && (
                            <>
                                {/* Profile Settings */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-500" />
                                        Personal Information
                                    </h3>
                                    {adminLoading ? (
                                        <div className="space-y-4">
                                            <div className="animate-pulse space-y-2">
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="animate-pulse space-y-2">
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="admin@zitopay.com"
                                                        required
                                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                                    />
                                                </div>
                                                {adminData?.admin && !adminData.admin.emailVerified && (
                                                    <p className="text-xs text-orange-600">Email not verified. Please verify your email address.</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Role</label>
                                                <input
                                                    type="text"
                                                    value={adminData?.admin?.role === "admin" ? "Super Admin" : adminData?.admin?.role || "Admin"}
                                                    disabled
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Account Settings */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-gray-500" />
                                        Account Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Change Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                            />
                                            <p className="text-xs text-gray-500">Leave blank to keep current password</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "registration" && (
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Merchant Registration</h3>

                                    {platformSettingsLoading ? (
                                        <div className="space-y-4">
                                            <div className="animate-pulse space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="animate-pulse space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">Allow Merchant Self-Registration</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">If disabled, users must apply via an external application form.</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setAllowSelfRegistration((prev) => !prev)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${allowSelfRegistration ? 'bg-green-500' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${allowSelfRegistration ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </label>

                                            {!allowSelfRegistration && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <label className="text-sm font-medium text-gray-700">Application Form URL</label>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={async () => {
                                                                    if (!applicationFormUrl.trim()) {
                                                                        toast.error("No URL to copy");
                                                                        return;
                                                                    }
                                                                    try {
                                                                        await navigator.clipboard.writeText(applicationFormUrl.trim());
                                                                        toast.success("Copied to clipboard");
                                                                    } catch {
                                                                        toast.error("Failed to copy");
                                                                    }
                                                                }}
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                                            >
                                                                <Copy className="w-3.5 h-3.5" />
                                                                Copy
                                                            </button>
                                                            <a
                                                                href={applicationFormUrl.trim() || "#"}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                aria-disabled={!applicationFormUrl.trim()}
                                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border ${applicationFormUrl.trim()
                                                                    ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                                    : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                                                    }`}
                                                            >
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                                Open
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <textarea
                                                        value={applicationFormUrl}
                                                        onChange={(e) => setApplicationFormUrl(e.target.value)}
                                                        placeholder="https://forms.google.com/..."
                                                        rows={2}
                                                        spellCheck={false}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono break-all resize-none"
                                                    />
                                                    <p className="text-xs text-gray-500">Google Form URL for merchant applications. Displayed when self-registration is disabled.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Platform Settings</h3>
                                    {platformSettingsLoading ? (
                                        <div className="animate-pulse space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-56"></div>
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {(platformSettingsData?.settings || []).map((setting) => (
                                                <div key={setting.id} className="p-3 rounded-lg border border-gray-200">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-mono text-gray-900 break-words">{setting.key}</p>
                                                            <p className="mt-1 text-sm text-gray-700 break-words whitespace-pre-wrap">{setting.value}</p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                if (!setting.value?.trim()) {
                                                                    toast.error("No value to copy");
                                                                    return;
                                                                }
                                                                try {
                                                                    await navigator.clipboard.writeText(setting.value.trim());
                                                                    toast.success("Copied to clipboard");
                                                                } catch {
                                                                    toast.error("Failed to copy");
                                                                }
                                                            }}
                                                            className="shrink-0 p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                                                            title="Copy value"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    {setting.description && (
                                                        <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "gateways" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {gatewaysLoading ? (
                                        Array.from({ length: 2 }).map((_, i) => (
                                            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 animate-pulse h-40" />
                                        ))
                                    ) : (
                                        globalGatewaysResponse?.gateways?.map((gateway) => (
                                            <div key={gateway.code} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm ${gateway.code === 'MTN_MOMO' ? 'bg-yellow-400' : 'bg-orange-500'}`}>
                                                            {gateway.code === 'MTN_MOMO' ? 'MTN' : 'OM'}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm">{gateway.name}</h4>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className={`text-xs font-medium flex items-center gap-1 ${gateway.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {gateway.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                                    {gateway.isActive ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleGatewayUpdate(gateway.code, { isActive: !gateway.isActive })}
                                                        disabled={updateGatewayMutation.isPending}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${gateway.isActive ? 'bg-green-500' : 'bg-gray-300'} ${updateGatewayMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${gateway.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                                    </button>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100 flex gap-4">
                                                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={gateway.collectionsEnabled}
                                                                onChange={() => handleGatewayUpdate(gateway.code, { collectionsEnabled: !gateway.collectionsEnabled })}
                                                                className="sr-only peer"
                                                                disabled={!gateway.isActive}
                                                            />
                                                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                                        </div>
                                                        Collections
                                                    </label>

                                                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={gateway.disbursementsEnabled}
                                                                onChange={() => handleGatewayUpdate(gateway.code, { disbursementsEnabled: !gateway.disbursementsEnabled })}
                                                                className="sr-only peer"
                                                                disabled={!gateway.isActive}
                                                            />
                                                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                                        </div>
                                                        Disbursements
                                                    </label>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {!gatewaysLoading && (!globalGatewaysResponse?.gateways || globalGatewaysResponse.gateways.length === 0) && (
                                        <div className="col-span-1 md:col-span-2 p-8 text-center bg-gray-50 border border-gray-200 rounded-lg border-dashed">
                                            <Server className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                            <h3 className="text-sm font-medium text-gray-900">No Gateways Found</h3>
                                            <p className="text-xs text-gray-500 mt-1">Global gateway configurations will appear here.</p>
                                        </div>
                                    )}
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
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
