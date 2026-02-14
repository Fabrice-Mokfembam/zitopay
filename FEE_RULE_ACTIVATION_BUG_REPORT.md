# Fee Rule Activation Bug Report

## Issue Summary

**Problem**: When activating a fee rule for XAF currency, activating a DISBURSEMENT rule deactivates the COLLECTION rule for the same gateway+currency combination. However, this does not happen for EUR currency - COLLECTION and DISBURSEMENT rules can be active simultaneously for EUR.

**Expected Behavior**: Fee rules should be able to be active simultaneously if they differ by `transactionType` (COLLECTION vs DISBURSEMENT), even if they share the same `gateway` and `currency`.

**Current Behavior**: Activating a fee rule deactivates ALL other active rules with the same `gateway` + `currency` combination, regardless of `transactionType`.

---

## Frontend Implementation Details

### API Endpoint Used

**Route**: `POST /v1/admin/fee-rules/{id}/activate`

**Base URL**: `/v1/admin` (as defined in `features/admin/api.ts`)

**Full Endpoint**: `POST /v1/admin/fee-rules/{ruleId}/activate`

**Request Body**: None (only rule ID in URL path)

**Response Type**: `ActivateFeeRuleResponse`
```typescript
interface ActivateFeeRuleResponse {
  message: string;
  feeRule: FeeRule;
}
```

### Fee Rule Data Structure

```typescript
interface FeeRule {
  id: string;
  feeVersionId: string;
  gateway: string;                    // e.g., "MTN_MOMO", "ORANGE_MONEY"
  transactionType: 'COLLECTION' | 'DISBURSEMENT';  // ⚠️ This field is being ignored
  currency: string;                   // e.g., "XAF", "EUR"
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
```

### Frontend Code Location

**File**: `app/admin/settings/fees/components/FeeRulesTab.tsx`

**Activation Handler**:
```typescript
const handleActivate = async (rule: FeeRule) => {
  const confirmed = confirm(
    `Activating this ${rule.gateway} ${rule.currency} rule will deactivate all other active ${rule.gateway} ${rule.currency} rules. Continue?`
  );
  if (!confirmed) {
    return;
  }

  try {
    await activateMutation.mutateAsync(rule.id);
    toast.success("Fee rule activated successfully");
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } };
    toast.error(error.response?.data?.message || "Failed to activate fee rule");
  }
};
```

**API Function**:
```typescript
// File: features/admin/api.ts
export const activateFeeRule = async (id: string): Promise<ActivateFeeRuleResponse> => {
  const response = await apiClient.post<ActivateFeeRuleResponse>(
    `${FEE_BASE_URL}/fee-rules/${id}/activate`
  );
  return response.data;
};
```

---

## Problem Analysis

### Current Backend Logic (Inferred)

The backend appears to be using this logic when activating a fee rule:
```
When activating rule with {gateway, currency}:
  - Deactivate ALL other active rules with the same {gateway, currency}
  - Ignore transactionType (COLLECTION vs DISBURSEMENT)
```

### Expected Backend Logic

The backend should use this logic:
```
When activating rule with {gateway, currency, transactionType}:
  - Deactivate ONLY other active rules with the same {gateway, currency, transactionType}
  - Allow different transactionTypes to be active simultaneously
```

### Example Scenario

**XAF Currency (Current Bug)**:
1. User activates: `MTN_MOMO + XAF + COLLECTION` → ✅ Active
2. User activates: `MTN_MOMO + XAF + DISBURSEMENT` → ❌ Deactivates COLLECTION rule
3. Result: Only DISBURSEMENT is active, COLLECTION is deactivated

**EUR Currency (Working Correctly)**:
1. User activates: `MTN_MOMO + EUR + COLLECTION` → ✅ Active
2. User activates: `MTN_MOMO + EUR + DISBURSEMENT` → ✅ Both remain active
3. Result: Both COLLECTION and DISBURSEMENT are active simultaneously

**Why EUR might work**: Possibly different data or different backend logic path, but the issue is clear for XAF.

---

## Required Backend Fix

### Backend Endpoint to Fix

**Route**: `POST /v1/admin/fee-rules/{id}/activate`

### Expected Behavior

When activating a fee rule with ID `{id}`:

1. **Fetch the rule** being activated to get its `gateway`, `currency`, and `transactionType`
2. **Deactivate only rules** that match:
   - Same `gateway`
   - Same `currency`
   - Same `transactionType`
   - Currently `ACTIVE` status
   - Same `feeVersionId` (if versioning is enforced)
3. **Activate the target rule**
4. **Return the updated rule**

### Pseudo-Code for Backend Fix

```javascript
async function activateFeeRule(ruleId) {
  // 1. Fetch the rule being activated
  const targetRule = await FeeRule.findById(ruleId);
  
  if (!targetRule) {
    throw new Error('Fee rule not found');
  }
  
  // 2. Deactivate ONLY rules with same gateway + currency + transactionType
  await FeeRule.updateMany(
    {
      gateway: targetRule.gateway,
      currency: targetRule.currency,
      transactionType: targetRule.transactionType,  // ⚠️ THIS IS THE KEY FIX
      status: 'ACTIVE',
      feeVersionId: targetRule.feeVersionId,
      _id: { $ne: ruleId }  // Don't deactivate the rule being activated
    },
    {
      status: 'INACTIVE'
    }
  );
  
  // 3. Activate the target rule
  targetRule.status = 'ACTIVE';
  await targetRule.save();
  
  return targetRule;
}
```

### Key Change

**Before**: Deactivate rules matching `{gateway, currency}` only
**After**: Deactivate rules matching `{gateway, currency, transactionType}`

---

## All Related API Endpoints

For reference, here are all fee rule related endpoints used by the frontend:

### Fee Rules Endpoints

1. **GET** `/v1/admin/fee-rules`
   - Query params: `gateway`, `transactionType`, `currency`, `status`, `feeVersionId`
   - Returns: `FeeRulesResponse` (list of fee rules)

2. **GET** `/v1/admin/fee-rules/{id}`
   - Returns: `FeeRuleResponse` (single fee rule)

3. **POST** `/v1/admin/fee-rules`
   - Body: `CreateFeeRuleRequest`
   - Returns: `CreateFeeRuleResponse`

4. **PATCH** `/v1/admin/fee-rules/{id}`
   - Body: `UpdateFeeRuleRequest`
   - Returns: `FeeRuleResponse`

5. **POST** `/v1/admin/fee-rules/{id}/activate` ⚠️ **THIS IS THE BUGGY ENDPOINT**
   - Returns: `ActivateFeeRuleResponse`

6. **POST** `/v1/admin/fee-rules/{id}/deactivate`
   - Returns: `DeactivateFeeRuleResponse`

### Fee Tiers Endpoints

7. **GET** `/v1/admin/fee-rules/{feeRuleId}/tiers`
   - Returns: `FeeTiersResponse`

8. **POST** `/v1/admin/fee-rules/{feeRuleId}/tiers`
   - Body: `CreateFeeTierRequest`
   - Returns: `CreateFeeTierResponse`

9. **PATCH** `/v1/admin/fee-tiers/{id}`
   - Body: `UpdateFeeTierRequest`
   - Returns: `UpdateFeeTierResponse`

### Fee Versions Endpoints

10. **GET** `/v1/admin/fee-versions`
    - Returns: `FeeVersionsResponse`

11. **POST** `/v1/admin/fee-versions`
    - Body: `CreateFeeVersionRequest`
    - Returns: `CreateFeeVersionResponse`

12. **POST** `/v1/admin/fee-versions/{id}/activate`
    - Returns: `ActivateFeeVersionResponse`

---

## Test Cases

### Test Case 1: XAF Currency (Currently Failing)

**Setup**:
- Rule 1: `MTN_MOMO + XAF + COLLECTION` (status: INACTIVE)
- Rule 2: `MTN_MOMO + XAF + DISBURSEMENT` (status: INACTIVE)

**Steps**:
1. Activate Rule 1 → Should become ACTIVE
2. Activate Rule 2 → Should become ACTIVE, Rule 1 should REMAIN ACTIVE

**Expected Result**: Both rules should be ACTIVE
**Current Result**: Rule 1 becomes INACTIVE when Rule 2 is activated

### Test Case 2: EUR Currency (Currently Working)

**Setup**:
- Rule 1: `MTN_MOMO + EUR + COLLECTION` (status: INACTIVE)
- Rule 2: `MTN_MOMO + EUR + DISBURSEMENT` (status: INACTIVE)

**Steps**:
1. Activate Rule 1 → Should become ACTIVE
2. Activate Rule 2 → Should become ACTIVE, Rule 1 should REMAIN ACTIVE

**Expected Result**: Both rules should be ACTIVE
**Current Result**: ✅ Both rules remain ACTIVE (working correctly)

### Test Case 3: Same Transaction Type (Should Deactivate)

**Setup**:
- Rule 1: `MTN_MOMO + XAF + COLLECTION` (status: ACTIVE)
- Rule 2: `MTN_MOMO + XAF + COLLECTION` (status: INACTIVE, different amount range)

**Steps**:
1. Activate Rule 2 → Should become ACTIVE
2. Rule 1 should become INACTIVE (same gateway + currency + transactionType)

**Expected Result**: Only Rule 2 should be ACTIVE
**Current Result**: ✅ This should work correctly (same transaction type)

---

## Additional Notes

1. **Frontend Confirmation Message**: The frontend confirmation message currently says "will deactivate all other active {gateway} {currency} rules" - this message should also be updated to mention transactionType after the backend fix.

2. **Query Filters**: The frontend supports filtering by `transactionType` in the `FeeRuleFilters`, indicating that transactionType is a first-class field that should be considered in all operations.

3. **Data Integrity**: The fix should ensure that only ONE rule per `{gateway, currency, transactionType, feeVersionId}` combination can be active at a time, but different `transactionType` values should be allowed to be active simultaneously.

---

## Summary

**Root Cause**: The backend activation logic is only checking `gateway + currency` when determining which rules to deactivate, but it should be checking `gateway + currency + transactionType`.

**Fix Required**: Update the `POST /v1/admin/fee-rules/{id}/activate` endpoint to include `transactionType` in the deactivation query.

**Impact**: This bug prevents admins from having both COLLECTION and DISBURSEMENT rules active for the same gateway+currency combination, which is a valid use case.

---

**Reported By**: Frontend Team  
**Date**: 2026-01-20  
**Priority**: High (Blocks admin functionality)  
**Status**: Awaiting Backend Fix
