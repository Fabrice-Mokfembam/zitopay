// Merchant API Types

// Merchant States
export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type SandboxState = 'ACTIVE' | 'SUSPENDED';
export type ProductionState = 'NOT_REQUESTED' | 'PENDING_APPROVAL' | 'ACTIVE' | 'SUSPENDED';

// Merchant Object
export interface Merchant {
    id: string;
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    country: string;
    enabled: boolean;
    kycStatus: KYCStatus;
    sandboxState: SandboxState;
    productionState: ProductionState;
    sandboxApiKey: string;
    productionApiKey?: string;
    rateLimitPerMinute: number;
    userRole?: 'owner' | 'admin' | 'viewer';  // Role in merchant (for getUserMerchants)
    createdAt: string;
    updatedAt: string;
}

// Domain Object
export interface Domain {
    id: string;
    domain: string;
    verificationToken: string;
    verifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

// Gateway Configuration
export interface GatewayConfig {
    id: string;
    merchantId: string;
    gateway: string;
    enabled: boolean;
    minAmount: string;
    maxAmount: string;
    dailyLimit: string;
    createdAt: string;
    updatedAt: string;
}

// Fee Override
export interface FeeOverride {
    id: string;
    merchantId: string;
    gateway: string;
    percentage: string;
    flatFee: string;
    createdAt: string;
    updatedAt: string;
}

// Request Types
export interface CreateMerchantRequest {
    businessName: string;
    email?: string;
    phone?: string;
    businessType?: string;
    country?: string;
}

export interface UpdateMerchantRequest {
    businessName?: string;
    email?: string;
    phone?: string;
    businessType?: string;
    country?: string;
}

export interface AddDomainRequest {
    domain: string;
}

export interface ConfigureGatewayRequest {
    gateway: string;
    enabled?: boolean;
    minAmount?: string;
    maxAmount?: string;
    dailyLimit?: string;
}

export interface SetFeeOverrideRequest {
    gateway: string;
    percentage?: string;
    flatFee?: string;
}

// Response Types
export interface CreateMerchantResponse {
    merchant: {
        id: string;
        businessName: string;
        sandboxApiKey: string;
        sandboxSecretKey: string;
    };
}

export interface GetMerchantResponse {
    merchant: Merchant;
}

export interface GetFirstMerchantResponse {
    merchant: Merchant;
}

export interface GetUserMerchantsResponse {
    merchants: Merchant[];
}

export interface UpdateMerchantResponse {
    merchant: Merchant;
}

export interface SubmitKYBResponse {
    merchant: Merchant;
}

export interface ApproveKYBResponse {
    merchant: Merchant;
}

export interface RejectKYBResponse {
    merchant: Merchant;
}

export interface RequestProductionResponse {
    merchant: Merchant;
}

export interface ApproveProductionResponse {
    merchant: Merchant;
    productionApiKey: string;
    productionSecretKey: string;
}

export interface SuspendSandboxResponse {
    merchant: Merchant;
}

export interface ReactivateSandboxResponse {
    merchant: Merchant;
}

export interface SuspendProductionResponse {
    merchant: Merchant;
}

export interface ReactivateProductionResponse {
    merchant: Merchant;
}

export interface AddDomainResponse {
    domain: {
        id: string;
        domain: string;
        verificationToken: string;
        verifiedAt: string | null;
        createdAt: string;
    };
}

export interface VerifyDomainResponse {
    domain: Domain;
}

export interface GetDomainsResponse {
    domains: Domain[];
}

export interface ConfigureGatewayResponse {
    gateway: GatewayConfig;
}

export interface GetGatewaysResponse {
    gateways: GatewayConfig[];
}

export interface SetFeeOverrideResponse {
    feeOverride: FeeOverride;
}

export interface RegenerateSandboxCredentialsResponse {
    message: string;
    sandboxApiKey: string;
    sandboxSecretKey: string;
    warning: string;
}

export interface RegenerateProductionCredentialsResponse {
    message: string;
    productionApiKey: string;
    productionSecretKey: string;
    warning: string;
}

// Pending KYB Submissions Types
export interface KYBDocument {
    id: string;
    fileId: string;
    type: string;
    name: string;
    size: string;
    status: 'valid' | 'error' | 'warning';
    reviewStatus: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
    url: string;
    urlExpiresAt: string;
    notes?: string;
}

export interface KYBSubmission {
    id: string;
    merchant: {
        businessName: string;
        email: string;
        phone: string;
        businessType: string;
        country: string;
        countryCode: string;
    };
    submittedAt: string;
    documents: KYBDocument[];
    notes: string;
    isResubmission: boolean;
    priority: 'recent' | 'attention' | 'urgent';
    ageInDays: number;
}

export interface GetPendingKYBSubmissionsResponse {
    submissions: KYBSubmission[];
}

// Pending Production Summary Types
export interface PendingProductionSummaryItem {
    id: string;
    merchant: {
        businessName: string;
        email: string;
        phone: string;
        businessType: string;
        country: string;
        countryCode: string;
        kybStatus: string;
        productionState: string;
    };
    submissionDate: string;
    ageInDays: number;
    priority: 'recent' | 'attention' | 'urgent';
    totalDocuments: number;
    approvedDocuments: number;
}

export interface GetPendingProductionSummaryResponse {
    summary: PendingProductionSummaryItem[];
}

// Legacy alias for backward compatibility (deprecated)
/** @deprecated Use PendingProductionSummaryItem instead */
export type PendingKYBSummaryItem = PendingProductionSummaryItem;
/** @deprecated Use GetPendingProductionSummaryResponse instead */
export type GetPendingKYBSummaryResponse = GetPendingProductionSummaryResponse;
