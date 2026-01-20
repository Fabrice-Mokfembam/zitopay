import { User } from '../utils/storage';

// ============ REQUEST TYPES ============

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyResetCodeRequest {
    email: string;
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface UpdateAdminProfileRequest {
    email: string;
}

export interface UpdateAdminProfileResponse {
    user: {
        id: string;
        email: string;
        role: string;
    };
    message: string;
}

export interface AdminDetails {
    id: string;
    email: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetCurrentAdminResponse {
    admin: AdminDetails;
}

export interface GetAllAdminsResponse {
    admins: AdminDetails[];
    total: number;
}

export interface CreateAdminRequest {
    email: string;
    password: string;
}

export interface CreateAdminResponse {
    user: {
        id: string;
        email: string;
        role: string;
    };
}

// ============ RESPONSE TYPES ============

export interface RegisterResponse {
    success: true;
    message: string;
    userId: string;
}

export interface VerifyEmailResponse {
    success: true;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ResendVerificationResponse {
    success: true;
    message: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
}

export interface ForgotPasswordResponse {
    success: true;
    message: string;
}

export interface VerifyResetCodeResponse {
    success: true;
    message: string;
}

export interface ResetPasswordResponse {
    success: true;
    message: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    expiresIn: number;
}

export type GetCurrentUserResponse = User;

export interface LogoutResponse {
    success: true;
    message: string;
}

// ============ ERROR RESPONSE ============

export interface ApiErrorResponse {
    error: string;
    message: string;
    emailVerified?: boolean;
}
