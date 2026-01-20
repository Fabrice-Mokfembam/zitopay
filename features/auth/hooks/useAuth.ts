import { useMutation, useQuery, UseMutationResult, UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { register, verifyEmail, resendVerificationCode, login, adminLogin, logout, updateAdminProfile, getCurrentAdmin, getAllAdmins, createAdmin, deleteAdmin } from '../api/index';
// storeAuthData/clearAuthData removed as we use context now
import type {
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ResendVerificationRequest,
    ResendVerificationResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    UpdateAdminProfileRequest,
    UpdateAdminProfileResponse,
    GetCurrentAdminResponse,
    GetAllAdminsResponse,
    CreateAdminRequest,
    CreateAdminResponse,
    DeleteAdminResponse,
} from '../types/index';

/**
 * Hook for user registration
 * Sends verification code to email
 */
export const useRegister = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: RegisterRequest) => register(credentials),
        onSuccess: (_, variables) => {
            // Navigate to verification page with email
            router.push(`/verify-email-code?email=${encodeURIComponent(variables.email)}`);
        },
    });
};

/**
 * Hook for email verification
 * Stores tokens and navigates to success page
 */
export const useVerifyEmail = (): UseMutationResult<VerifyEmailResponse, Error, VerifyEmailRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (payload: VerifyEmailRequest) => verifyEmail(payload),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to success page
            router.push('/email-verified');
        },
    });
};

/**
 * Hook for resending verification code
 */
export const useResendVerification = (): UseMutationResult<ResendVerificationResponse, Error, ResendVerificationRequest> => {
    return useMutation({
        mutationFn: (payload: ResendVerificationRequest) => resendVerificationCode(payload),
    });
};

/**
 * Hook for user login
 * Stores tokens and navigates to dashboard
 */
export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => login(credentials),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to dashboard
            router.push('/dashboard');
        },
    });
};

/**
 * Hook for admin login
 * Stores tokens and navigates to admin dashboard
 * Only allows users with 'admin' role
 */
export const useAdminLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => adminLogin(credentials),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to admin dashboard
            router.push('/admin/dashboard');
        },
    });
};


/**
 * Hook for user logout
 * Clears tokens and navigates to login
 */
export const useLogout = (): UseMutationResult<LogoutResponse, Error, void> => {
    const router = useRouter();
    const { logout: authLogout } = useAuthContext();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            // Clear auth context (clears state + storage)
            authLogout();

            // Navigate to login page
            router.push('/login');
        },
        onError: () => {
            // Even if API call fails, clear local data and redirect
            authLogout();
            router.push('/login');
        },
    });
};

/**
 * Hook for updating admin profile (email)
 */
export const useUpdateAdminProfile = (): UseMutationResult<UpdateAdminProfileResponse, Error, UpdateAdminProfileRequest> => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: UpdateAdminProfileRequest) => updateAdminProfile(payload),
        onSuccess: () => {
            // Invalidate admin queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['admin', 'profile'] });
            queryClient.invalidateQueries({ queryKey: ['auth', 'admin', 'me'] });
        },
    });
};

/**
 * Hook for getting current admin details
 */
export const useCurrentAdmin = (): UseQueryResult<GetCurrentAdminResponse, Error> => {
    return useQuery({
        queryKey: ['auth', 'admin', 'me'],
        queryFn: () => getCurrentAdmin(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook for getting all admins
 */
export const useAllAdmins = (): UseQueryResult<GetAllAdminsResponse, Error> => {
    return useQuery({
        queryKey: ['auth', 'admin', 'all'],
        queryFn: () => getAllAdmins(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook for creating new admin account
 */
export const useCreateAdmin = (): UseMutationResult<CreateAdminResponse, Error, CreateAdminRequest> => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: CreateAdminRequest) => createAdmin(payload),
        onSuccess: () => {
            // Invalidate admins list to refresh
            queryClient.invalidateQueries({ queryKey: ['auth', 'admin', 'all'] });
        },
    });
};

/**
 * Hook for deleting admin account
 */
export const useDeleteAdmin = (): UseMutationResult<DeleteAdminResponse, Error, string> => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (adminId: string) => deleteAdmin(adminId),
        onSuccess: () => {
            // Invalidate admins list to refresh
            queryClient.invalidateQueries({ queryKey: ['auth', 'admin', 'all'] });
        },
    });
};
