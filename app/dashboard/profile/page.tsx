"use client";

import { useState, useEffect } from "react";
import { Edit, X, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useUpdateMerchantProfile } from "@/features/merchants/hooks/useMerchant";
import { useUserMerchantData } from "@/features/merchants/context/MerchantContext";
import type { UpdateMerchantProfileRequest } from "@/features/merchants/types/index";

export default function ProfilePage() {
    const { merchant, isLoading, refetch } = useUserMerchantData();
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState<UpdateMerchantProfileRequest>({
        businessName: merchant?.businessName || "",
        email: merchant?.email || "",
        phone: merchant?.phone || "",
        businessType: merchant?.businessType || "",
        country: merchant?.country || "",
    });

    const updateMerchantMutation = useUpdateMerchantProfile();

    // Update form data when merchant data loads
    useEffect(() => {
        if (merchant) {
            setFormData({
                businessName: merchant.businessName || "",
                email: merchant.email || "",
                phone: merchant.phone || "",
                businessType: merchant.businessType || "",
                country: merchant.country || "",
            });
        }
    }, [merchant]);

    const handleInputChange = (field: keyof UpdateMerchantProfileRequest, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!merchant) return;

        try {
            const result = await updateMerchantMutation.mutateAsync(formData);
            
            // Refresh merchant context with updated data
            await refetch();
            
            toast.success('Profile Updated Successfully!', {
                description: 'Your profile information has been updated.',
            });
            
            setShowEditModal(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            toast.error('Update Failed', {
                description: errorMessage,
            });
            console.error("Failed to update profile:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!merchant) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">No merchant data available</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-4 pl-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Profile</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Manage your merchant profile information
                    </p>
                </div>
                <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Profile
                </button>
            </div>

            {/* Profile Information Card */}
            <div className="bg-background rounded-xl p-5 border border-border">
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-base">
                        {merchant.businessName ? merchant.businessName.substring(0, 2).toUpperCase() : 'M'}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-foreground">{merchant.businessName}</h2>
                        <p className="text-xs text-muted-foreground">{merchant.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Business Name</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.businessName}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Business Type</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.businessType || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Email</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.email}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Phone</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.phone || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Country</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.country || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Rate Limit</p>
                        <p className="text-xs font-semibold text-foreground">{merchant.rateLimitPerMinute} requests/minute</p>
                    </div>
                </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-background rounded-xl p-5 border border-border">
                <h3 className="text-xs font-semibold text-foreground mb-3">ACCOUNT STATUS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">KYB Status</p>
                        <p className={`text-xs font-semibold ${
                            merchant.kycStatus === 'APPROVED' ? 'text-green-600 dark:text-green-400' :
                            merchant.kycStatus === 'PENDING' ? 'text-orange-600 dark:text-orange-400' :
                            merchant.kycStatus === 'REJECTED' ? 'text-red-600 dark:text-red-400' :
                            'text-muted-foreground'
                        }`}>
                            {merchant.kycStatus}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">Sandbox Status</p>
                        <p className={`text-xs font-semibold ${
                            merchant.sandboxState === 'ACTIVE' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                        }`}>
                            {merchant.sandboxState}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">Production Status</p>
                        <p className={`text-xs font-semibold ${
                            merchant.productionState === 'ACTIVE' ? 'text-green-600 dark:text-green-400' :
                            merchant.productionState === 'PENDING_APPROVAL' ? 'text-orange-600 dark:text-orange-400' :
                            'text-muted-foreground'
                        }`}>
                            {merchant.productionState}
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div 
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowEditModal(false)}
                >
                    <div 
                        className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <User className="w-4 h-4 text-orange-500" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">Edit Profile</h3>
                            </div>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-medium text-foreground mb-1.5 block">
                                        Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter business name"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-medium text-foreground mb-1.5 block">
                                        Business Type *
                                    </label>
                                    <select
                                        value={formData.businessType}
                                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                                        className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select business type</option>
                                        <option value="Limited Liability Company">Limited Liability Company</option>
                                        <option value="Corporation">Corporation</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-medium text-foreground mb-1.5 block">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-medium text-foreground mb-1.5 block">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-medium text-foreground mb-1.5 block">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter country"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3 border-t border-border">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    disabled={updateMerchantMutation.isPending}
                                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={updateMerchantMutation.isPending}
                                    className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {updateMerchantMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
