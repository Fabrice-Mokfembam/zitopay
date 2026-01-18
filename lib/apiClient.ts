import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken, getRefreshToken, storeAuthData, clearAuthData } from '@/features/auth/utils/storage';

/**
 * Main API client instance
 * Configured with base URL and JSON headers
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 * Automatically adds Authorization header to all requests
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        // Public endpoints that don't need authentication
        const publicEndpoints = [
            '/public/v1/auth/register',
            '/public/v1/auth/login',
            '/public/v1/auth/verify-email',
            '/public/v1/auth/resend-verification',
            '/public/v1/auth/forgot-password',
            '/public/v1/auth/verify-reset-code',
            '/public/v1/auth/reset-password',
            '/public/v1/auth/resend-reset-code',
            '/public/v1/auth/refresh',
        ];

        const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

        // Add token to protected endpoints
        if (token && !isPublicEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles token refresh on 401 errors
 */
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Extract error message from API response if available
        // This ensures that all parts of the app receive the user-friendly message from the server
        if (error.response?.data && typeof error.response.data === 'object') {
            const data = error.response.data as Record<string, unknown>;
            // Prefer 'message' but fallback to 'error' (type) if message is missing
            const apiMessage = (data.message || data.error) as string;
            if (apiMessage) {
                // We modify the error message to be the one from the API
                // This allows toast.error(error.message) to work correctly across the app
                error.message = apiMessage;
            }
        }

        // Public endpoints that don't need authentication - should not trigger refresh/redirect
        const publicEndpoints = [
            '/public/v1/auth/register',
            '/public/v1/auth/login',
            '/public/v1/auth/admin/login',
            '/public/v1/auth/verify-email',
            '/public/v1/auth/resend-verification',
            '/public/v1/auth/forgot-password',
            '/public/v1/auth/verify-reset-code',
            '/public/v1/auth/reset-password',
            '/public/v1/auth/resend-reset-code',
            '/public/v1/auth/refresh',
        ];

        const isPublicEndpoint = publicEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

        // If 401 error and haven't retried yet, and it's NOT a public endpoint
        if (error.response?.status === 401 && !originalRequest._retry && !isPublicEndpoint) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (refreshToken) {
                try {
                    // Call refresh endpoint
                    const { data } = await axios.post(`${API_BASE_URL}/public/v1/auth/refresh`, {
                        refreshToken,
                    });

                    // Store new access token (keep existing user and refresh token)
                    const currentAuth = getAccessToken();
                    if (currentAuth) {
                        storeAuthData({
                            user: data.user,
                            accessToken: data.accessToken,
                            refreshToken: refreshToken, // Keep same refresh token
                        });
                    }

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Refresh failed, clear auth and redirect to login
                    clearAuthData();
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token, clear auth and redirect
                clearAuthData();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export { apiClient };
