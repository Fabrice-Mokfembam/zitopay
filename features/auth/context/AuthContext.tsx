"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthData, getAuthData, storeAuthData, clearAuthData, getAccessToken, getRefreshToken } from '../utils/storage';
import { getCurrentUser, refreshToken } from '../api/index';

// Context type definition
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: AuthData) => void;
    logout: () => void;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages user authentication state across the app
 * Fetches fresh user data from API on mount if token exists
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from storage and fetch fresh data from API on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = getAccessToken();
                const refreshTokenValue = getRefreshToken();
                const authData = getAuthData();

                // If no token and no refresh token, user is not authenticated
                if (!token && !refreshTokenValue) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                // First, set user from storage (for immediate UI update)
                if (authData?.user) {
                    setUser(authData.user);
                }

                // Then fetch fresh user data from API
                try {
                    const freshUser = await getCurrentUser();
                    
                    // Update context with fresh data
                    setUser(freshUser);
                    
                    // Update storage with fresh user data (keep existing tokens)
                    if (authData) {
                        storeAuthData({
                            ...authData,
                            user: freshUser,
                        });
                    }
                } catch (error: any) {
                    // Check error type
                    const is401 = error?.response?.status === 401 || error?.status === 401;
                    const is403 = error?.response?.status === 403 || error?.status === 403;
                    const isNetworkError = error?.code === 'ERR_NETWORK' || 
                                         error?.message === 'Network Error' ||
                                         !error?.response; // No response means network/server issue
                    
                    // If it's a network error (server unreachable, CORS, etc.), keep user logged in
                    // Don't clear auth on network errors - user might be offline or server might be down
                    if (isNetworkError) {
                        console.warn('Network error fetching user data, keeping cached user:', error?.message || error);
                        // Keep the user from localStorage - don't clear auth
                        // The user is still authenticated, just can't verify with server right now
                        if (authData?.user) {
                            setUser(authData.user);
                        }
                        return; // Exit early, keep user logged in
                    }
                    
                    // If it's a 401 (unauthorized), try to refresh token
                    if (is401 && refreshTokenValue) {
                        try {
                            console.log('Access token expired, attempting refresh...');
                            // Attempt to refresh the token
                            const refreshResponse = await refreshToken(refreshTokenValue);
                            
                            // Store new tokens
                            storeAuthData({
                                user: refreshResponse.user,
                                accessToken: refreshResponse.accessToken,
                                refreshToken: refreshResponse.refreshToken || refreshTokenValue,
                            });
                            
                            // Update context with refreshed user data
                            setUser(refreshResponse.user);
                            
                            // Try to get fresh user data again
                            try {
                                const freshUser = await getCurrentUser();
                                setUser(freshUser);
                                if (authData) {
                                    storeAuthData({
                                        user: freshUser,
                                        accessToken: refreshResponse.accessToken,
                                        refreshToken: refreshResponse.refreshToken || refreshTokenValue,
                                    });
                                }
                            } catch (retryError: any) {
                                // Check if retry also failed due to network
                                const isRetryNetworkError = retryError?.code === 'ERR_NETWORK' || 
                                                           retryError?.message === 'Network Error' ||
                                                           !retryError?.response;
                                if (isRetryNetworkError) {
                                    // Network error on retry - keep refresh response user
                                    console.warn('Network error on retry, using refresh response user');
                                } else {
                                    // Even after refresh, getCurrentUser failed - but we have valid tokens
                                    // Keep the user from refresh response
                                    console.warn('Failed to fetch fresh user after refresh, using refresh response:', retryError);
                                }
                            }
                        } catch (refreshError: any) {
                            // Check if refresh failed due to network error
                            const isRefreshNetworkError = refreshError?.code === 'ERR_NETWORK' || 
                                                         refreshError?.message === 'Network Error' ||
                                                         !refreshError?.response;
                            
                            if (isRefreshNetworkError) {
                                // Network error during refresh - keep user logged in with cached data
                                console.warn('Network error during token refresh, keeping cached user');
                                if (authData?.user) {
                                    setUser(authData.user);
                                }
                            } else {
                                // Refresh failed (invalid refresh token, expired, etc.), clear auth and logout
                                console.error('Token refresh failed:', refreshError);
                                clearAuthData();
                                setUser(null);
                            }
                        }
                    } else if (is401 || is403) {
                        // 401/403 but no refresh token or refresh not attempted - clear auth
                        console.error('Unauthorized access, clearing auth:', error);
                        clearAuthData();
                        setUser(null);
                    } else {
                        // Other error (500, etc.) - don't clear auth, keep cached user
                        console.warn('Error fetching user data (non-auth error), keeping cached user:', error?.response?.status || error?.message);
                        if (authData?.user) {
                            setUser(authData.user);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading user:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (data: AuthData) => {
        storeAuthData(data);
        setUser(data.user);
    };

    const logout = () => {
        clearAuthData();
        setUser(null);
    };

    // Compute isAuthenticated from user state
    // We trust local state 'user' which is synced with storage on login/logout
    const isAuthenticated = !!user;

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }

    return context;
}
