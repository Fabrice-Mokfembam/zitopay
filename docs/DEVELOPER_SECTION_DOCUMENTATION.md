# Developer Section Pages Documentation

**Date:** January 13, 2026  
**Version:** 1.0.0

---

## 📋 OVERVIEW

This document covers all Developer section pages in the ZitoPay merchant dashboard:

1. ✅ **API Keys** - API credential management
2. ✅ **Webhooks** - Event notifications
3. ✅ **Gateways** - Payment gateway configuration

---

## 🔑 API KEYS PAGE

**File:** `app/dashboard/api-keys/page.tsx`  
**Route:** `/dashboard/api-keys`  
**Purpose:** Manage API credentials for sandbox and production

### **Features Implemented:**

#### **1. Environment Tabs**
- **Sandbox** - Testing environment
- **Production** - Live environment

#### **2. Credentials Display**
- **API Key** - Public identifier
- **Secret Key** - Private authentication
- **Show/Hide** toggle for security
- **Copy** button for each credential

#### **3. Regenerate Credentials**
- Confirmation modal with warning
- Separate regeneration for each environment
- Automatic credential update

#### **4. Usage Statistics**
- Total requests
- Success rate
- Failed requests
- Rate limit usage

#### **5. Quick Start Code**
- JavaScript/Node.js examples
- Python examples
- PHP examples
- Copy code functionality

#### **6. Security Best Practices**
- Never commit credentials
- Use environment variables
- Rotate keys regularly
- Monitor usage

---

## 🪝 WEBHOOKS PAGE

**File:** `app/dashboard/webhooks/page.tsx`  
**Route:** `/dashboard/webhooks`  
**Purpose:** Manage webhook endpoints and event subscriptions

### **Features Implemented:**

#### **1. Overview Stats (4 Cards)**
- **Active Endpoints** - Number of enabled endpoints
- **Total Sent** - Total webhook deliveries
- **Success Rate** - Delivery success percentage
- **Failed Last 24h** - Recent failures

#### **2. Endpoints Table**

**Columns:**
1. URL - Webhook endpoint URL
2. Events - Number of subscribed events
3. Status - Active/Disabled badge
4. Actions - Edit and menu options

**Features:**
- Status badges (Active/Disabled)
- Event count display
- Edit functionality
- More options menu

#### **3. Recent Deliveries Table**

**Columns:**
1. Time - Delivery timestamp
2. Event - Event type
3. Endpoint - Target endpoint
4. Status - Success/Failed/Skipped
5. Code - HTTP status code

**Features:**
- Click to view details
- Color-coded status
- Status icons
- Hover effects

#### **4. Add/Edit Endpoint Modal**

**Fields:**
- **Endpoint URL** * (HTTPS required)
- **Events to Subscribe** * (8 event types):
  - payment.created
  - payment.succeeded
  - payment.failed
  - payout.created
  - payout.completed
  - payout.failed
  - refund.processed
  - settlement.completed
- **Signing Secret** (Auto-generated)

**Actions:**
- Test Endpoint
- Cancel
- Save Endpoint

**Features:**
- Multi-select checkboxes for events
- Auto-generated signing secret
- Copy secret functionality
- HTTPS validation

#### **5. Delivery Details Modal**

**Information Displayed:**
- Event type
- Endpoint URL
- Delivery time
- Status with code
- Request headers
- Request payload (JSON)
- Response status
- Response body

**Actions:**
- Retry delivery
- Copy payload

**Features:**
- Formatted JSON display
- Syntax highlighting (code blocks)
- Copy functionality
- Retry mechanism

### **Webhook Events:**

| Event | Description |
|-------|-------------|
| `payment.created` | Payment initiated |
| `payment.succeeded` | Payment completed successfully |
| `payment.failed` | Payment failed |
| `payout.created` | Payout initiated |
| `payout.completed` | Payout completed successfully |
| `payout.failed` | Payout failed |
| `refund.processed` | Refund completed |
| `settlement.completed` | Settlement transferred to bank |

### **Webhook Signature Verification:**

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}
```

---

## 🌐 GATEWAYS PAGE

**File:** `app/dashboard/gateways/page.tsx`  
**Route:** `/dashboard/gateways`  
**Purpose:** Configure payment gateways (MTN, Orange, Moov, Bank)

### **Features Implemented:**

#### **1. Gateway Cards (4 Gateways)**

**Gateways:**
1. **💳 MTN Mobile Money** - Enabled by default
2. **🍊 Orange Money** - Enabled by default
3. **📱 Moov Money** - Disabled by default
4. **🏦 Bank Transfer** - Disabled by default

**Card Information:**
- Gateway icon (emoji)
- Gateway name
- Status badge (Enabled/Disabled)
- Volume percentage (for enabled)
- Success rate percentage (for enabled)
- Configure/Enable button

#### **2. Configure Gateway Modal**

**Sections:**

**A. Status**
- Radio buttons: Enabled / Disabled

**B. Transaction Limits**
- **Min Amount** (FCFA) - Minimum transaction
- **Max Amount** (FCFA) - Maximum transaction
- **Daily Limit** (FCFA) - Daily total limit

**C. Fee Override (Optional)**
- Checkbox to enable custom fees
- **Gateway Fee** (%) - Gateway provider fee
- **Platform Fee** (%) - ZitoPay platform fee

**Actions:**
- Test Connection
- Cancel
- Save Configuration

**Features:**
- Real-time input updates
- Conditional fee override section
- Number input validation
- Status toggle

### **Gateway Defaults:**

| Gateway | Min | Max | Daily Limit | Gateway Fee | Platform Fee |
|---------|-----|-----|-------------|-------------|--------------|
| MTN Mobile Money | 1,000 | 1,000,000 | 5,000,000 | 2.5% | 0.5% |
| Orange Money | 1,000 | 1,000,000 | 5,000,000 | 2.5% | 0.5% |
| Moov Money | 1,000 | 1,000,000 | 5,000,000 | 2.5% | 0.5% |
| Bank Transfer | 5,000 | 10,000,000 | 50,000,000 | 1.0% | 0.5% |

### **Gateway Configuration Flow:**

```
Select Gateway → Open Modal → Configure Settings → Test Connection → Save
                                                    ↓
                                              Verify Integration
                                                    ↓
                                              Enable Gateway
```

---

## 📊 DATA FLOW

### **API Keys:**
```
Generate Keys → Store Securely → Use in API Calls → Monitor Usage → Rotate Periodically
```

### **Webhooks:**
```
Event Occurs → Webhook Triggered → Payload Sent → Endpoint Receives → Response Logged
                                        ↓
                                   Failed? → Retry (3x) → Dead Letter Queue
```

### **Gateways:**
```
Configure Gateway → Set Limits → Enable → Process Payment → Track Performance
                                    ↓
                              Monitor Success Rate
                                    ↓
                              Adjust Configuration
```

---

## 🚨 MISSING BACKEND FEATURES

### **API Keys:**
- [ ] Key generation algorithm
- [ ] Key storage (encrypted)
- [ ] Key rotation mechanism
- [ ] Usage tracking
- [ ] Rate limiting enforcement

### **Webhooks:**
- [ ] Webhook delivery system
- [ ] Retry mechanism (exponential backoff)
- [ ] Dead letter queue
- [ ] Signature generation (HMAC-SHA256)
- [ ] Event publishing
- [ ] Delivery logs storage

### **Gateways:**
- [ ] Gateway configuration storage
- [ ] Fee override management
- [ ] Gateway health checks
- [ ] Performance metrics tracking
- [ ] Gateway API integration
- [ ] Transaction routing logic

---

## ✅ IMPLEMENTATION CHECKLIST

### **Completed:**
- [x] API Keys page layout
- [x] API Keys environment tabs
- [x] API Keys credential display
- [x] API Keys regeneration modals
- [x] Webhooks page layout
- [x] Webhooks stats cards
- [x] Webhooks endpoints table
- [x] Webhooks deliveries table
- [x] Webhooks add endpoint modal
- [x] Webhooks delivery details modal
- [x] Gateways page layout
- [x] Gateways cards grid
- [x] Gateways configure modal
- [x] Gateways limits configuration
- [x] Gateways fee override

### **Pending:**
- [ ] Backend API integration
- [ ] Webhook delivery system
- [ ] Gateway health monitoring
- [ ] Real-time updates
- [ ] Event streaming

---

## 🎨 DESIGN CONSISTENCY

**All Developer pages follow:**

**Layout:**
- Header with title and description
- Stats cards (where applicable)
- Tables with hover effects
- Modals with rounded-2xl
- Consistent spacing (p-6, space-y-6)

**Colors:**
- Blue for active/enabled
- Orange for actions
- Green for success
- Red for errors/failed
- Gray for disabled

**Components:**
- Modals with backdrop
- Tables with striped rows
- Buttons with transitions
- Status badges with icons
- Copy buttons with feedback

**Typography:**
- Page title: `text-xl font-bold`
- Section title: `text-sm font-semibold`
- Labels: `text-xs font-medium`
- Body: `text-xs` or `text-sm`

---

## 🔐 SECURITY CONSIDERATIONS

### **API Keys:**
- Never expose secret keys in client-side code
- Store keys in environment variables
- Rotate keys regularly (every 90 days)
- Monitor for unusual usage patterns
- Revoke compromised keys immediately

### **Webhooks:**
- Always verify webhook signatures
- Use HTTPS endpoints only
- Validate payload structure
- Implement idempotency
- Rate limit webhook endpoints

### **Gateways:**
- Encrypt gateway credentials
- Validate transaction limits
- Monitor for fraud patterns
- Implement circuit breakers
- Log all gateway interactions

---

## 📝 NOTES

### **Best Practices:**

**API Keys:**
- Use separate keys for sandbox and production
- Never commit keys to version control
- Implement key rotation policies
- Monitor API usage regularly

**Webhooks:**
- Implement retry logic with exponential backoff
- Use dead letter queues for failed deliveries
- Log all webhook attempts
- Provide webhook testing tools

**Gateways:**
- Test gateway connections regularly
- Monitor gateway performance
- Implement fallback gateways
- Set appropriate transaction limits

### **User Experience:**

**API Keys:**
- Show/hide credentials for security
- One-click copy functionality
- Clear regeneration warnings
- Code examples for quick start

**Webhooks:**
- Visual delivery status
- Detailed delivery logs
- Easy event subscription
- Test endpoint functionality

**Gateways:**
- Clear gateway status
- Visual performance metrics
- Simple configuration
- Test connection before enabling

---

## 🎯 INTEGRATION WORKFLOW

### **Complete Developer Flow:**

```
1. Get API Keys
   ↓
2. Configure Gateways (Enable payment methods)
   ↓
3. Setup Webhooks (Receive notifications)
   ↓
4. Test Integration (Sandbox)
   ↓
5. Go Live (Production)
```

### **Typical Integration Steps:**

1. **Authentication Setup**
   - Get sandbox API keys
   - Test authentication
   - Verify credentials work

2. **Payment Gateway Configuration**
   - Enable desired gateways
   - Set transaction limits
   - Configure fees (if needed)
   - Test gateway connection

3. **Webhook Setup**
   - Add webhook endpoint
   - Subscribe to events
   - Verify signature validation
   - Test webhook delivery

4. **Testing**
   - Make test payments
   - Verify webhook notifications
   - Check transaction limits
   - Test error scenarios

5. **Production**
   - Get production API keys
   - Update webhook endpoints
   - Enable production gateways
   - Monitor performance

---

**End of Documentation**

All Developer section pages are complete and ready for backend integration! 🔧✨
