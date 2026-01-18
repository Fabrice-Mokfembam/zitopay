"use client";

import { CodeBlock } from "@/components/docs/CodeBlock";

export default function AuthenticationPage() {
    return (
        <div>
            <h1>Authentication</h1>
            <p>
                ZitoPay uses API key authentication with HMAC-SHA256 signature verification for secure API access. This guide explains how to authenticate your requests.
            </p>

            <h2>API Key Authentication</h2>
            <p>
                All <code>/api/v1/*</code> endpoints require authentication using your API key and a cryptographic signature. This ensures that only authorized requests are processed.
            </p>

            <h2>Required Headers</h2>
            <p>
                Every authenticated request must include the following headers:
            </p>
            <CodeBlock
                code={`x-zito-key: <your-api-key>
x-zito-timestamp: <unix-timestamp-in-seconds>
x-zito-nonce: <unique-random-string>
x-zito-origin: <your-domain-or-ip>
x-zito-signature: <hmac-sha256-signature>
x-zito-version: 1.0
Content-Type: application/json`}
                language="http"
            />

            <h3>Header Descriptions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Header</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>x-zito-key</code></td>
                        <td>Your public API key from the dashboard</td>
                    </tr>
                    <tr>
                        <td><code>x-zito-timestamp</code></td>
                        <td>Unix timestamp in seconds (prevents replay attacks)</td>
                    </tr>
                    <tr>
                        <td><code>x-zito-nonce</code></td>
                        <td>Unique random string for each request (prevents replay attacks)</td>
                    </tr>
                    <tr>
                        <td><code>x-zito-origin</code></td>
                        <td>Your domain or IP address (for allowlisting)</td>
                    </tr>
                    <tr>
                        <td><code>x-zito-signature</code></td>
                        <td>HMAC-SHA256 signature of the request</td>
                    </tr>
                    <tr>
                        <td><code>x-zito-version</code></td>
                        <td>API version (currently "1.0")</td>
                    </tr>
                </tbody>
            </table>

            <h2>Generating the Signature</h2>
            <p>
                The signature is a HMAC-SHA256 hash of a string built from your request details:
            </p>

            <h3>Step 1: Build the String to Sign</h3>
            <CodeBlock
                code={`stringToSign = METHOD + PATH + SORTED_QUERY_PARAMS + REQUEST_BODY + TIMESTAMP + NONCE + ORIGIN`}
                language="text"
            />

            <h3>Step 2: Generate HMAC-SHA256 Signature</h3>
            <CodeBlock
                code={`signature = HMAC-SHA256(secretKey, stringToSign)`}
                language="text"
            />

            <h2>JavaScript Example</h2>
            <CodeBlock
                code={`const crypto = require('crypto');

function generateSignature(method, path, body, secretKey) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const origin = 'https://yourdomain.com';
  
  // Build string to sign
  const stringToSign = \`\${method}\${path}\${body}\${timestamp}\${nonce}\${origin}\`;
  
  // Generate signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(stringToSign)
    .digest('hex');
  
  return {
    timestamp,
    nonce,
    origin,
    signature
  };
}

// Usage
const { timestamp, nonce, origin, signature } = generateSignature(
  'POST',
  '/api/v1/wallets/quote',
  JSON.stringify({ amount: '1000', currency: 'XAF' }),
  process.env.ZITOPAY_SECRET_KEY
);

// Include in request headers
const headers = {
  'x-zito-key': process.env.ZITOPAY_API_KEY,
  'x-zito-timestamp': timestamp,
  'x-zito-nonce': nonce,
  'x-zito-origin': origin,
  'x-zito-signature': signature,
  'x-zito-version': '1.0',
  'Content-Type': 'application/json'
};`}
                language="javascript"
            />

            <h2>Python Example</h2>
            <CodeBlock
                code={`import hmac
import hashlib
import time
import secrets
import json

def generate_signature(method, path, body, secret_key):
    timestamp = str(int(time.time()))
    nonce = secrets.token_hex(16)
    origin = 'https://yourdomain.com'
    
    # Build string to sign
    string_to_sign = f"{method}{path}{body}{timestamp}{nonce}{origin}"
    
    # Generate signature
    signature = hmac.new(
        secret_key.encode('utf-8'),
        string_to_sign.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return {
        'timestamp': timestamp,
        'nonce': nonce,
        'origin': origin,
        'signature': signature
    }

# Usage
auth_data = generate_signature(
    'POST',
    '/api/v1/wallets/quote',
    json.dumps({'amount': '1000', 'currency': 'XAF'}),
    os.environ['ZITOPAY_SECRET_KEY']
)

headers = {
    'x-zito-key': os.environ['ZITOPAY_API_KEY'],
    'x-zito-timestamp': auth_data['timestamp'],
    'x-zito-nonce': auth_data['nonce'],
    'x-zito-origin': auth_data['origin'],
    'x-zito-signature': auth_data['signature'],
    'x-zito-version': '1.0',
    'Content-Type': 'application/json'
}`}
                language="python"
            />

            <h2>Security Best Practices</h2>
            <ul>
                <li><strong>Never expose your secret key:</strong> Keep it server-side only</li>
                <li><strong>Use HTTPS:</strong> Always use HTTPS in production</li>
                <li><strong>Validate timestamps:</strong> Reject requests with timestamps too far in the past/future</li>
                <li><strong>Use unique nonces:</strong> Never reuse nonces to prevent replay attacks</li>
                <li><strong>Rotate keys regularly:</strong> Change your API keys periodically</li>
                <li><strong>IP Whitelisting:</strong> Configure IP allowlists in production</li>
            </ul>

            <h2>Public Endpoints</h2>
            <p>
                Some endpoints don't require authentication:
            </p>
            <ul>
                <li><code>/public/v1/*</code> - Public endpoints (no authentication)</li>
            </ul>

            <h2>IAM-Protected Routes</h2>
            <p>
                Non-API routes (dashboard, admin, etc.) use JWT token authentication:
            </p>
            <CodeBlock
                code={`Authorization: Bearer <jwt-token>`}
                language="http"
            />

            <h2>Error Responses</h2>
            <p>
                Authentication failures return <code>401 Unauthorized</code>:
            </p>
            <CodeBlock
                code={`{
  "error": "Unauthorized",
  "message": "Invalid signature",
  "code": "AUTH_ERROR"
}`}
                language="json"
            />
        </div>
    );
}
