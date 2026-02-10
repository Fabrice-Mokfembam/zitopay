'use client';

import { useState } from 'react';
import { useGetFirstMerchant, useUpdateMerchantProfile } from '@/features/merchants/hooks';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data: merchantData, isLoading: isLoadingMerchant } = useGetFirstMerchant();
  const updateMerchantProfile = useUpdateMerchantProfile();
  
  const [feePayer, setFeePayer] = useState<'PAYER' | 'MERCHANT'>('PAYER');

  // Update form when merchant data loads
  if (merchantData?.merchant && feePayer === 'PAYER') {
    setFeePayer(merchantData.merchant.feePayer || 'PAYER');
  }

  const handleFeePayerChange = async (newFeePayer: 'PAYER' | 'MERCHANT') => {
    try {
      setFeePayer(newFeePayer);
      await updateMerchantProfile.mutateAsync({ feePayer: newFeePayer });
      toast.success(`Fee payer setting updated to ${newFeePayer === 'PAYER' ? 'Customer (Payer)' : 'Merchant'}`);
    } catch (error) {
      toast.error('Failed to update fee payer setting');
      // Revert on error
      setFeePayer(feePayer);
    }
  };

  if (isLoadingMerchant) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Fee Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Who pays transaction fees?</label>
              <p className="text-sm text-gray-600 mb-4">
                Choose whether transaction fees are charged to the customer or deducted from your received amount.
              </p>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="feePayer"
                    value="PAYER"
                    checked={feePayer === 'PAYER'}
                    onChange={(e) => handleFeePayerChange(e.target.value as 'PAYER' | 'MERCHANT')}
                    className="w-4 h-4 text-blue-600"
                    disabled={updateMerchantProfile.isPending}
                  />
                  <div>
                    <div className="font-medium">Customer (Payer)</div>
                    <div className="text-sm text-gray-600">
                      Customers pay the base amount plus fees. You receive the full base amount.
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="feePayer"
                    value="MERCHANT"
                    checked={feePayer === 'MERCHANT'}
                    onChange={(e) => handleFeePayerChange(e.target.value as 'PAYER' | 'MERCHANT')}
                    className="w-4 h-4 text-blue-600"
                    disabled={updateMerchantProfile.isPending}
                  />
                  <div>
                    <div className="font-medium">Merchant</div>
                    <div className="text-sm text-gray-600">
                      Customers pay only the base amount. Fees are deducted from your received amount.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
