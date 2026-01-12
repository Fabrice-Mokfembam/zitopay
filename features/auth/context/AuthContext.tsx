"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getAuthData, getCurrentUser, isAuthenticated as checkAuth } from '../utils/storage';

// Context type definition
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages user authentication state across the app
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from storage on mount
    useEffect(() => {
        const loadUser = () => {
            const authData = getAuthData();
            if (authData) {
                setUser(authData.user);
            }
            setIsLoading(false);
        };

        loadUser();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: checkAuth(),
        isLoading,
        setUser,
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
