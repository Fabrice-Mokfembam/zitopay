"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function WebhookSecurityPage() {
    return (
        <div>
            <h1>Webhook Security</h1>
            <p>
                Webhook security is critical to ensure that requests are actually from ZitoPay and haven&apos;t been tampered with. This page explains how to verify webhook signatures using HMAC-SHA256.
            </p>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-red-700 dark:text-red-400 text-lg mt-0.5">🔒</span>
                    <div className="flex-1 text-sm text-red-900 dark:text-red-100">
                        <p className="leading-relaxed">
                            <strong>Critical:</strong> Always verify webhook signatures before processing any webhook payload. Never trust webhook data without signature verification, as it could be a malicious request attempting to manipulate your system.
                        </p>
                    </div>
                </div>
            </div>

            <h2>How Signature Verification Works</h2>
            <p>
                ZitoPay uses HMAC-SHA256 to sign webhook payloads. The signature is sent in the <code>X-Zito-Signature</code> header, and you verify it by recreating the signature using your webhook secret.
            </p>

            <ol>
                <li>ZitoPay creates a signature using HMAC-SHA256 with your webhook secret</li>
                <li>The signature is sent in the <code>X-Zito-Signature</code> header</li>
                <li>You recreate the signature using your stored secret</li>
                <li>Compare the signatures - if they match, the webhook is authentic</li>
            </ol>

            <h2>Signature Format</h2>
            <p>
                The signature header format is:
            </p>

            <CodeBlock
                code={`X-Zito-Signature: sha256=<hex_encoded_signature>
X-Zito-Timestamp: <unix_timestamp>`}
                language="text"
            />

            <p>
                Example:
            </p>

            <CodeBlock
                code={`X-Zito-Signature: sha256=abc123def456...
X-Zito-Timestamp: 1768763180`}
                language="text"
            />

            <h2>Verification Steps</h2>

            <h3>Step 1: Extract Headers</h3>
            <CodeBlock
                code={`const signature = req.headers['x-zito-signature'];
const timestamp = req.headers['x-zito-timestamp'];

if (!signature || !timestamp) {
  return res.status(400).send('Missing signature headers');
}`}
                language="javascript"
            />

            <h3>Step 2: Check Timestamp (Prevent Replay Attacks)</h3>
            <p>
                Verify that the request is recent (within 5 minutes) to prevent replay attacks:
            </p>

            <CodeBlock
                code={`const currentTime = Math.floor(Date.now() / 1000);
const requestTime = parseInt(timestamp);

// Reject if older than 5 minutes
if (Math.abs(currentTime - requestTime) > 300) {
  return res.status(400).send('Request too old');
}`}
                language="javascript"
            />

            <h3>Step 3: Compute Expected Signature</h3>
            <p>
                Create the signed payload and compute the expected signature:
            </p>

            <CodeBlock
                code={`const crypto = require('crypto');

const payload = JSON.stringify(req.body);
const signedPayload = \`\${timestamp}.\${payload}\`;

const expectedSignature = crypto
  .createHmac('sha256', YOUR_WEBHOOK_SECRET)
  .update(signedPayload)
  .digest('hex');`}
                language="javascript"
            />

            <h3>Step 4: Compare Signatures (Timing-Safe)</h3>
            <p>
                Use timing-safe comparison to prevent timing attacks:
            </p>

            <CodeBlock
                code={`const receivedSignature = signature.replace('sha256=', '');

const isValid = crypto.timingSafeEqual(
  Buffer.from(expectedSignature),
  Buffer.from(receivedSignature)
);

if (!isValid) {
  return res.status(401).send('Invalid signature');
}`}
                language="javascript"
            />

            <h2>Complete Example (Node.js/Express)</h2>
            <p>
                Here&apos;s a complete webhook handler with signature verification:
            </p>

            <CodeBlock
                code={`const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = process.env.ZITOPAY_WEBHOOK_SECRET; // From registration

function verifyWebhookSignature(req) {
  // 1. Extract headers
  const signature = req.headers['x-zito-signature'];
  const timestamp = req.headers['x-zito-timestamp'];
  
  if (!signature || !timestamp) {
    return { valid: false, error: 'Missing signature headers' };
  }
  
  // 2. Check timestamp (prevent replay attacks)
  const currentTime = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestamp);
  
  if (Math.abs(currentTime - requestTime) > 300) {
    return { valid: false, error: 'Request too old' };
  }
  
  // 3. Compute expected signature
  const payload = JSON.stringify(req.body);
  const signedPayload = \`\${timestamp}.\${payload}\`;
  
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');
  
  // 4. Verify signature (timing-safe)
  const receivedSignature = signature.replace('sha256=', '');
  
  try {
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(receivedSignature)
    );
    
    if (!isValid) {
      return { valid: false, error: 'Invalid signature' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Invalid signature' };
  }
}

app.post('/webhooks/zitopay', (req, res) => {
  // Verify signature
  const verification = verifyWebhookSignature(req);
  
  if (!verification.valid) {
    return res.status(401).send(verification.error);
  }
  
  // Process webhook event
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.succeeded':
      handlePaymentSuccess(data);
      break;
    case 'payment.failed':
      handlePaymentFailure(data);
      break;
    // ... handle other events
  }
  
  // Respond quickly (within 5 seconds)
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`}
                language="javascript"
            />

            <h2>Python Example</h2>
            <CodeBlock
                code={`import hmac
import hashlib
import json
import time
from flask import Flask, request, abort

app = Flask(__name__)
WEBHOOK_SECRET = os.environ.get('ZITOPAY_WEBHOOK_SECRET')

def verify_webhook_signature(request):
    # 1. Extract headers
    signature = request.headers.get('X-Zito-Signature')
    timestamp = request.headers.get('X-Zito-Timestamp')
    
    if not signature or not timestamp:
        return False, 'Missing signature headers'
    
    # 2. Check timestamp
    current_time = int(time.time())
    request_time = int(timestamp)
    
    if abs(current_time - request_time) > 300:
        return False, 'Request too old'
    
    # 3. Compute expected signature
    payload = json.dumps(request.json, separators=(',', ':'))
    signed_payload = f"{timestamp}.{payload}"
    
    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode('utf-8'),
        signed_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    # 4. Compare signatures (timing-safe)
    received_signature = signature.replace('sha256=', '')
    
    if not hmac.compare_digest(expected_signature, received_signature):
        return False, 'Invalid signature'
    
    return True, None

@app.route('/webhooks/zitopay', methods=['POST'])
def webhook():
    # Verify signature
    valid, error = verify_webhook_signature(request)
    
    if not valid:
        abort(401, error)
    
    # Process webhook
    event = request.json.get('event')
    data = request.json.get('data')
    
    if event == 'payment.succeeded':
        handle_payment_success(data)
    # ... handle other events
    
    return 'OK', 200`}
                language="python"
            />

            <h2>PHP Example</h2>
            <CodeBlock
                code={`<?php
function verifyWebhookSignature($requestBody, $signature, $timestamp) {
    $webhookSecret = getenv('ZITOPAY_WEBHOOK_SECRET');
    
    // Check timestamp
    $currentTime = time();
    if (abs($currentTime - (int)$timestamp) > 300) {
        return false;
    }
    
    // Compute expected signature
    $signedPayload = $timestamp . '.' . $requestBody;
    $expectedSignature = hash_hmac('sha256', $signedPayload, $webhookSecret);
    
    // Extract received signature
    $receivedSignature = str_replace('sha256=', '', $signature);
    
    // Compare signatures (timing-safe)
    return hash_equals($expectedSignature, $receivedSignature);
}

// Handle webhook
$signature = $_SERVER['HTTP_X_ZITO_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_ZITO_TIMESTAMP'] ?? '';
$body = file_get_contents('php://input');

if (!verifyWebhookSignature($body, $signature, $timestamp)) {
    http_response_code(401);
    exit('Invalid signature');
}

// Process webhook
$data = json_decode($body, true);
$event = $data['event'] ?? '';

switch ($event) {
    case 'payment.succeeded':
        handlePaymentSuccess($data['data']);
        break;
    // ... handle other events
}

http_response_code(200);
echo 'OK';
?>`}
                language="php"
            />

            <h2>Common Mistakes</h2>

            <h3>1. Not Verifying Signatures</h3>
            <p>
                <strong>Never skip signature verification.</strong> Always verify the signature before processing webhook data.
            </p>

            <h3>2. Using String Comparison</h3>
            <p>
                <strong>Don&apos;t use regular string comparison.</strong> Use timing-safe comparison functions to prevent timing attacks:
            </p>

            <CodeBlock
                code={`// ❌ WRONG - Vulnerable to timing attacks
if (expectedSignature === receivedSignature) { ... }

// ✅ CORRECT - Timing-safe comparison
if (crypto.timingSafeEqual(
  Buffer.from(expectedSignature),
  Buffer.from(receivedSignature)
)) { ... }`}
                language="javascript"
            />

            <h3>3. Not Checking Timestamp</h3>
            <p>
                <strong>Always check the timestamp.</strong> Reject requests older than 5 minutes to prevent replay attacks.
            </p>

            <h3>4. Using Wrong Payload Format</h3>
            <p>
                <strong>Use the exact payload format.</strong> The signed payload must be <code>timestamp.payload</code> where payload is the JSON string of the request body.
            </p>

            <h3>5. Storing Secret in Code</h3>
            <p>
                <strong>Never commit secrets to code.</strong> Store your webhook secret in environment variables or a secret management system.
            </p>

            <h2>Security Best Practices</h2>
            <ul>
                <li><strong>Always verify signatures:</strong> Never process webhooks without verification</li>
                <li><strong>Use timing-safe comparison:</strong> Prevent timing attacks</li>
                <li><strong>Check timestamps:</strong> Reject old requests (replay attack prevention)</li>
                <li><strong>Store secrets securely:</strong> Use environment variables or secret management</li>
                <li><strong>Use HTTPS:</strong> Always use HTTPS for webhook endpoints in production</li>
                <li><strong>Log verification failures:</strong> Monitor for suspicious activity</li>
                <li><strong>Rate limit webhook endpoints:</strong> Prevent abuse</li>
            </ul>

            <h2>Testing Signature Verification</h2>
            <p>
                You can test your signature verification with this example:
            </p>

            <CodeBlock
                code={`// Test signature generation
const crypto = require('crypto');
const secret = 'whsec_test123';
const timestamp = '1768763180';
const payload = JSON.stringify({
  event: 'payment.succeeded',
  data: { transaction_id: 'test-123' }
});

const signedPayload = \`\${timestamp}.\${payload}\`;
const signature = crypto
  .createHmac('sha256', secret)
  .update(signedPayload)
  .digest('hex');

console.log('X-Zito-Signature: sha256=' + signature);
console.log('X-Zito-Timestamp: ' + timestamp);`}
                language="javascript"
            />

            <h2>Replay Attack Prevention</h2>
            <p>
                The timestamp check prevents replay attacks by ensuring requests are recent. However, you should also implement idempotency checks using transaction IDs:
            </p>

            <CodeBlock
                code={`// Check if we've already processed this transaction
const existing = await db.transactions.findUnique({
  where: { id: data.transaction_id }
});

if (existing && existing.status === 'processed') {
  // Already processed - return success but don't process again
  return res.status(200).send('OK');
}

// Process the webhook
await processTransaction(data);

// Mark as processed
await db.transactions.create({
  data: { id: data.transaction_id, status: 'processed' }
});`}
                language="javascript"
            />

            <h2>Next Steps</h2>
            <ul>
                <li>Learn how to <Link href="/docs/webhooks/register" className="text-primary hover:underline">Register a Webhook Endpoint</Link></li>
                <li>See all available <Link href="/docs/webhooks/events" className="text-primary hover:underline">Webhook Events</Link></li>
                <li>View <Link href="/docs/webhooks/overview" className="text-primary hover:underline">Webhooks Overview</Link> for general information</li>
            </ul>
        </div>
    );
}
