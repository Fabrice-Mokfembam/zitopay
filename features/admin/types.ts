export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface SystemStats {
  totalMerchants: number;
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
}

// Admin Dashboard Types
export interface MetricValue {
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface HealthMetricValue {
  value: string;
  change: string;
  status: string;
  trend: "up" | "down" | "neutral";
  changeValue?: number;
}

export interface PlatformMetricsResponse {
  totalMerchants: MetricValue;
  activeMerchants: MetricValue;
  platformRevenue: MetricValue;
  totalVolume: MetricValue;
}

export interface HealthMetricsResponse {
  successRate: HealthMetricValue;
  failedTransactions: HealthMetricValue;
  pendingKyb: HealthMetricValue;
  reconIssues: HealthMetricValue;
}

export interface GatewayPerformance {
  name: string;
  successful: number;
  failed: number;
  successRate: number;
  color: string;
}

export type GatewayPerformanceResponse = GatewayPerformance[];

// Admin Bypass Password (Master Key) Types
export interface GenerateBypassPasswordRequest {
  durationHours?: number;
}

export interface GenerateBypassPasswordResponse {
  success: boolean;
  bypassPassword: string;
  expiresAt: string;
  expiresIn: number;
  message: string;
}

// Admin Merchant Users Types
export interface MerchantUser {
  merchantUserId: string;
  role: string;
  merchantUserCreatedAt: string;

  userId: string;
  userEmail: string;
  userRole: string;
  emailVerified: boolean;
  userCreatedAt: string;
  userUpdatedAt: string;

  merchantId: string;
  businessName: string;
  merchantEmail: string | null;
  merchantPhone: string | null;
  businessType: string | null;
  country: string | null;
  enabled: boolean;
  kycStatus: string;
  sandboxState: string;
  productionState: string;
  sandboxApiKey: string;
  productionApiKey: string | null;
  rateLimitPerMinute: number;
  merchantCreatedAt: string;
  merchantUpdatedAt: string;

  // Extended properties for management
  accountStatus?: AccountStatus;
  canCollect?: boolean;
  canDisburse?: boolean;
}

export interface MerchantUsersResponse {
  merchantUsers: MerchantUser[];
  total: number;
}

export interface CreateMerchantRequest {
  email: string;
  businessName: string;
  phone?: string;
  businessType?: string;
  country?: string;
}

export interface CreateMerchantResponse {
  success: boolean;
  message: string;
  merchant: {
    userId: string;
    merchantId: string;
    email: string;
    businessName: string;
    sandboxApiKey: string;
  };
}

export interface UpdateMerchantRegistrationSettingsRequest {
  allowSelfRegistration: boolean;
  applicationFormUrl: string;
}

export interface UpdateMerchantRegistrationSettingsResponse {
  success: boolean;
  message: string;
  config: {
    allowSelfRegistration: boolean;
    applicationFormUrl: string;
  };
}

export interface PlatformSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetPlatformSettingsResponse {
  settings: PlatformSetting[];
  total: number;
}

// Admin Transactions Types
export interface AdminTransaction {
  transactionId: string;
  transactionType: 'COLLECTION' | 'DISBURSEMENT';
  status: string;
  amount: string;
  currency: string;
  environment: string;
  gateway: string;
  gatewayReference: string | null;
  failureReason: string | null;
  correlationId: string;
  refunded: boolean;
  refundedAmount: string;
  fullyRefunded: boolean;
  createdAt: string;
  completedAt: string | null;

  quoteId: string;
  gatewayFee: string;
  platformFee: string;
  totalAmount: string;
  netToMerchant: string;
  payerMsisdn: string | null;

  merchantId: string;
  merchantBusinessName: string;
  merchantEmail: string | null;
  merchantPhone: string | null;

  payoutId: string | null;
  payoutRecipientMsisdn: string | null;
  payoutReference: string | null;
  payoutStatus: string | null;
  payoutGatewayReference: string | null;
  payoutTotalDeduction: string | null;

  refundId: string | null;
  refundAmount: string | null;
  refundMethod: string | null;
  refundStatus: string | null;
  refundReason: string | null;
  refundCreatedAt: string | null;
}

export interface AdminTransactionsResponse {
  transactions: AdminTransaction[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AdminTransactionFilters {
  limit?: number;
  offset?: number;
  status?: string;
  transactionType?: string;
  gateway?: string;
  merchantId?: string;
  environment?: 'sandbox' | 'production';
}

// Fee Management Types
export interface FeeVersion {
  id: string;
  version: string;
  isActive: boolean;
  description: string | null;
  createdAt: string;
}

export interface FeeVersionsResponse {
  feeVersions: FeeVersion[];
}

export interface CreateFeeVersionRequest {
  version: string;
  description?: string;
}

export interface CreateFeeVersionResponse {
  feeVersion: FeeVersion;
}

export interface ActivateFeeVersionResponse {
  message: string;
  feeVersion: FeeVersion;
}

export interface FeeRule {
  id: string;
  feeVersionId: string;
  gateway: string;
  transactionType: 'COLLECTION' | 'DISBURSEMENT';
  currency: string;
  minAmount: string;
  maxAmount: string;
  gatewayFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue: string;
  platformFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue: string;
  priority: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface FeeRulesResponse {
  feeRules: FeeRule[];
}

export interface FeeRuleResponse {
  feeRule: FeeRule;
}

export interface FeeRuleFilters {
  gateway?: string;
  transactionType?: string;
  currency?: string;
  status?: string;
  feeVersionId?: string;
}

export interface CreateFeeRuleRequest {
  feeVersionId: string;
  gateway: string;
  transactionType: 'COLLECTION' | 'DISBURSEMENT';
  currency: string;
  minAmount: string;
  maxAmount: string;
  gatewayFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue: string;
  platformFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue: string;
  priority?: number;
}

export interface CreateFeeRuleResponse {
  feeRule: FeeRule;
}

export interface UpdateFeeRuleRequest {
  minAmount?: string;
  maxAmount?: string;
  gatewayFeeType?: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue?: string;
  platformFeeType?: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue?: string;
  priority?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface DeactivateFeeRuleResponse {
  message: string;
}

export interface ActivateFeeRuleResponse {
  message: string;
  feeRule: FeeRule;
}

export interface FeeTier {
  id: string;
  feeRuleId: string;
  minAmount: string;
  maxAmount: string;
  gatewayFeeValue: string;
  platformFeeValue: string | null;
  createdAt: string;
}

export interface FeeTiersResponse {
  feeRule: {
    id: string;
    gateway: string;
    transactionType: string;
    currency: string;
    gatewayFeeType: string;
    status: string;
  };
  tiers: FeeTier[];
}

export interface CreateFeeTierRequest {
  minAmount: string;
  maxAmount: string;
  gatewayFeeValue: string;
  platformFeeValue?: string;
}

export interface CreateFeeTierResponse {
  tier: FeeTier;
}

export interface UpdateFeeTierRequest {
  minAmount?: string;
  maxAmount?: string;
  gatewayFeeValue?: string;
  platformFeeValue?: string;
}

export interface UpdateFeeTierResponse {
  tier: FeeTier;
}

export interface MerchantFeeOverride {
  id: string;
  merchantId: string;
  gateway: string;
  transactionType: 'COLLECTION' | 'DISBURSEMENT';
  currency: string;
  gatewayFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue: string;
  platformFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface MerchantFeeOverridesResponse {
  merchantFeeOverrides: MerchantFeeOverride[];
}

export interface MerchantFeeOverrideResponse {
  override: MerchantFeeOverride;
}

export interface MerchantFeeOverrideFilters {
  merchantId?: string;
  gateway?: string;
  transactionType?: string;
  currency?: string;
  status?: string;
}

export interface CreateMerchantFeeOverrideRequest {
  merchantId: string;
  gateway: string;
  transactionType: 'COLLECTION' | 'DISBURSEMENT';
  currency: string;
  gatewayFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue: string;
  platformFeeType: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue: string;
}

export interface UpdateMerchantFeeOverrideRequest {
  gatewayFeeType?: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  gatewayFeeValue?: string;
  platformFeeType?: 'PERCENTAGE' | 'FIXED' | 'TIERED';
  platformFeeValue?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface DeactivateMerchantFeeOverrideResponse {
  message: string;
}

export interface PlatformWalletFeeSettings {
  chargePlatformFeeOnTopup: boolean;
  chargePlatformFeeOnWithdrawal: boolean;
  updatedAt: string | null;
}

export interface PlatformWalletFeeSettingsResponse {
  chargePlatformFeeOnTopup: boolean;
  chargePlatformFeeOnWithdrawal: boolean;
  updatedAt: string | null;
}

export interface UpdatePlatformWalletFeeSettingsRequest {
  chargePlatformFeeOnTopup?: boolean;
  chargePlatformFeeOnWithdrawal?: boolean;
}

// Delete Merchant Types
export interface DeleteMerchantResponse {
  success: boolean;
  message: string;
  deletedMerchant: {
    id: string;
    businessName: string;
  };
}

export type GatewayCode = 'MTN_MOMO' | 'ORANGE_MONEY';
export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED' | 'API_BLOCKED';

export interface GlobalGateway {
  id: string;
  code: GatewayCode;
  name: string;
  isActive: boolean;
  collectionsEnabled: boolean;
  disbursementsEnabled: boolean;
  updatedAt: string;
}

export interface GetGlobalGatewaysResponse {
  success: boolean;
  gateways: GlobalGateway[];
}

export interface UpdateGlobalGatewayRequest {
  isActive?: boolean;
  collectionsEnabled?: boolean;
  disbursementsEnabled?: boolean;
}

export interface UpdateGlobalGatewayResponse {
  success: boolean;
  gateway: GlobalGateway;
}

export interface MerchantStatusUpdate {
  status: AccountStatus;
  notifyUser?: boolean;
  reason?: string;
}

export interface UpdateMerchantStatusResponse {
  success: boolean;
  merchant: {
    id: string;
    businessName: string;
    accountStatus: AccountStatus;
    updatedAt: string;
    // ...other merchant fields can be partial using Record<string, any> or just what we need
  };
}

export interface MerchantCapabilitiesUpdate {
  canCollect?: boolean;
  canDisburse?: boolean;
}

export interface UpdateMerchantCapabilitiesResponse {
  success: boolean;
  merchant: {
    id: string;
    canCollect: boolean;
    canDisburse: boolean;
    updatedAt: string;
  };
}

export interface MerchantGatewayConfigUpdate {
  gateway: GatewayCode;
  enabled?: boolean;
  canCollect?: boolean;
  canDisburse?: boolean;
}

export interface UpdateMerchantGatewayConfigResponse {
  success: boolean;
  config: {
    id: string;
    merchantId: string;
    gateway: GatewayCode;
    enabled: boolean;
    canCollect: boolean;
    canDisburse: boolean;
    updatedAt: string;
  };
}

// Support Ticket Types
import { TicketStatus, TicketPriority } from "@/features/support/types";

export interface SupportTicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}