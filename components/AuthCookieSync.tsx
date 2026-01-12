"use client";

import { useEffect } from "react";
import { getAuthData } from "@/features/auth/utils/storage";

/**
 * Syncs authentication cookie with localStorage
 * This ensures middleware can detect authentication status
 */
export function AuthCookieSync() {
    useEffect(() => {
        const authData = getAuthData();
        if (authData?.accessToken) {
            // Set cookie if user is authenticated but cookie doesn't exist
            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
            document.cookie = `accessToken=${authData.accessToken};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        }
    }, []);

    return null;
}
