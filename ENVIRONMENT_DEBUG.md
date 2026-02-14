# Environment Parameter Debugging Guide

## Issue
User is in sandbox mode but cannot see their sandbox data.

## Possible Causes

1. **Environment parameter not being sent to API**
   - Check browser console for `[API Request]` logs
   - Verify the URL includes `?environment=sandbox`

2. **Backend not handling environment parameter**
   - Backend might be defaulting to production
   - Check backend logs

3. **Cached data from before environment parameter was added**
   - Old queries might not have environment in query key
   - Solution: Clear browser cache and localStorage

4. **Environment state not initialized correctly**
   - Check console for `[Environment Context]` logs
   - Verify localStorage has `zitopay_environment` set to `sandbox`

## Debugging Steps

### 1. Check Browser Console
Open DevTools (F12) and look for:
- `[Environment Context] Current environment: sandbox`
- `[API Request] GET ...?environment=sandbox`
- `[API] getDashboardSummary with environment: sandbox`

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Filter by "XHR" or "Fetch"
3. Look for requests to `/reports/` or `/wallet/`
4. Click on a request and check:
   - **Query String Parameters** section
   - Should see `environment: sandbox`

### 3. Check localStorage
1. Open DevTools → Application tab (or Storage → Local Storage)
2. Look for key: `zitopay_environment`
3. Value should be: `sandbox`

### 4. Clear Cache and Retry
1. Clear React Query cache: Open console and run:
   ```javascript
   // This will clear all cached queries
   window.location.reload()
   ```
2. Clear localStorage (if needed):
   ```javascript
   localStorage.removeItem('zitopay_environment')
   window.location.reload()
   ```

### 5. Verify Environment Toggle
1. Check navbar - should show "Sandbox Mode" or "Live Mode"
2. Click toggle to switch to sandbox if needed
3. Confirm the switch in the modal

## Expected Behavior

When environment is `sandbox`:
- All API requests to `/reports/*` should include `?environment=sandbox`
- All API requests to `/wallet/*` should include `?environment=sandbox`
- Query keys should include `environment` in the key array
- Console should show environment in logs

## Quick Fix

If data is still not showing:

1. **Force refresh with sandbox:**
   ```javascript
   localStorage.setItem('zitopay_environment', 'sandbox');
   window.location.reload();
   ```

2. **Check if backend endpoint supports environment parameter:**
   - Test with curl:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        "https://api.zitopay.com/reports/dashboard/summary?environment=sandbox"
   ```

3. **Verify backend is returning sandbox data:**
   - Check backend logs
   - Verify database has sandbox data for this merchant

## Files to Check

- `core/environment/EnvironmentContext.tsx` - Environment state management
- `features/reports/api/index.ts` - API functions with environment parameter
- `features/reports/queries.ts` - React Query hooks using environment
- `lib/apiClient.ts` - Axios client with request interceptor
