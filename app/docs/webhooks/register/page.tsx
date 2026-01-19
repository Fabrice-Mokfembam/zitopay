"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function RegisterWebhookPage() {
    return (
        <div>
            <h1>Register Webhook Endpoint</h1>
            <p>
                This guide explains how to register and manage webhook endpoints in ZitoPay. You can register endpoints through the dashboard or via the API.
            </p>

            <h2>Prerequisites</h2>
            <ul>
                <li>A server endpoint that accepts HTTP POST requests</li>
                <li>HTTPS URL (required for production, HTTP allowed for local testing)</li>
                <li>Ability to verify HMAC signatures</li>
                <li>Endpoint must respond within 5 seconds</li>
            </ul>

            <h2>Registering via Dashboard</h2>
            <p>
                The easiest way to register a webhook endpoint is through the ZitoPay dashboard:
            </p>

            <ol>
                <li>Navigate to <Link href="/dashboard/webhooks" className="text-primary hover:underline">Dashboard → Webhooks</Link></li>
                <li>Click &quot;Add Endpoint&quot; button</li>
                <li>Enter your webhook URL (must be HTTPS in production)</li>
                <li>All 6 events are automatically selected (required)</li>
                <li>Click &quot;Create Endpoint&quot;</li>
                <li><strong>Save your webhook secret</strong> - it&apos;s only shown once!</li>
            </ol>

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-orange-700 dark:text-orange-400 text-lg mt-0.5">⚠️</span>
                    <div className="flex-1 text-sm text-orange-900 dark:text-orange-100">
                        <p className="leading-relaxed">
                            <strong>Important:</strong> The webhook secret is only returned once during registration. Make sure to save it securely - you&apos;ll need it to verify webhook signatures. If you lose it, you&apos;ll need to create a new endpoint.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Registering via API</h2>
            <p>
                You can also register webhook endpoints programmatically using the API:
            </p>

            <h3>Endpoint</h3>
            <p>
                <code>POST /merchant/v1/webhooks/endpoints</code>
            </p>

            <h3>Request Body</h3>
            <CodeBlock
                code={`{
  "url": "https://your-server.com/webhooks/zitopay",
  "events": [
    "payment.succeeded",
    "payment.failed",
    "payout.completed",
    "payout.failed",
    "refund.completed",
    "settlement.generated"
  ]
}`}
                language="json"
            />

            <h3>Response</h3>
            <CodeBlock
                code={`{
  "endpoint": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "merchantId": "merchant-uuid",
    "url": "https://your-server.com/webhooks/zitopay",
    "enabled": true,
    "events": [
      "payment.succeeded",
      "payment.failed",
      "payout.completed",
      "payout.failed",
      "refund.completed",
      "settlement.generated"
    ],
    "secret": "whsec_abc123def456...",
    "createdAt": "2026-01-18T23:30:00.000Z"
  }
}`}
                language="json"
            />

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-blue-700 dark:text-blue-400 text-lg mt-0.5">💡</span>
                    <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <p className="leading-relaxed">
                            <strong>Save the Secret:</strong> The <code>secret</code> field in the response is your webhook signing secret. Store it securely in your environment variables or secret management system. You&apos;ll use this to verify that webhook requests are actually from ZitoPay.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Required Events</h2>
            <p>
                When registering a webhook endpoint, you <strong>must</strong> include all 6 required events:
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-3 my-4">
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><code>payment.succeeded</code> - Payment completed successfully</li>
                    <li><code>payment.failed</code> - Payment failed</li>
                    <li><code>payout.completed</code> - Payout sent successfully</li>
                    <li><code>payout.failed</code> - Payout failed</li>
                    <li><code>refund.completed</code> - Refund processed</li>
                    <li><code>settlement.generated</code> - Settlement created</li>
                </ul>
            </div>

            <p>
                You cannot register a webhook endpoint with only a subset of events. All 6 events are required to ensure you receive all transaction notifications.
            </p>

            <h2>URL Requirements</h2>
            <ul>
                <li><strong>Production:</strong> Must use HTTPS</li>
                <li><strong>Sandbox/Local:</strong> HTTP is allowed for testing</li>
                <li>URL must be publicly accessible (not localhost in production)</li>
                <li>URL must accept POST requests</li>
                <li>Endpoint should respond within 5 seconds</li>
            </ul>

            <h2>Updating an Endpoint</h2>
            <p>
                You can update an existing webhook endpoint to change its URL, enable/disable it, or update events:
            </p>

            <h3>Endpoint</h3>
            <p>
                <code>PUT /merchant/v1/webhooks/endpoints/:id</code>
            </p>

            <h3>Request Body</h3>
            <CodeBlock
                code={`{
  "url": "https://new-server.com/webhooks/zitopay",
  "enabled": true,
  "events": [
    "payment.succeeded",
    "payment.failed",
    "payout.completed",
    "payout.failed",
    "refund.completed",
    "settlement.generated"
  ]
}`}
                language="json"
            />

            <p>
                All fields are optional, but if you update <code>events</code>, you must include all 6 required events.
            </p>

            <h2>Listing Endpoints</h2>
            <p>
                Get all webhook endpoints for your merchant account:
            </p>

            <h3>Endpoint</h3>
            <p>
                <code>GET /merchant/v1/webhooks/endpoints</code>
            </p>

            <h3>Response</h3>
            <CodeBlock
                code={`{
  "endpoints": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "url": "https://your-server.com/webhooks/zitopay",
      "enabled": true,
      "events": [...],
      "createdAt": "2026-01-18T23:30:00.000Z"
    }
  ]
}`}
                language="json"
            />

            <p>
                Note: The <code>secret</code> is not included in the list response. To retrieve the secret for an existing endpoint, use the <code>GET /merchant/v1/webhooks/endpoints/:id</code> endpoint.
            </p>

            <h2>Getting Endpoint Details</h2>
            <p>
                Get detailed information about a specific endpoint, including the secret:
            </p>

            <h3>Endpoint</h3>
            <p>
                <code>GET /merchant/v1/webhooks/endpoints/:id</code>
            </p>

            <h3>Response</h3>
            <CodeBlock
                code={`{
  "endpoint": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "url": "https://your-server.com/webhooks/zitopay",
    "enabled": true,
    "events": [...],
    "secret": "whsec_abc123def456...",
    "createdAt": "2026-01-18T23:30:00.000Z",
    "updatedAt": "2026-01-18T23:35:00.000Z"
  }
}`}
                language="json"
            />

            <h2>Enabling and Disabling Endpoints</h2>
            <p>
                You can temporarily disable a webhook endpoint without deleting it. Disabled endpoints will not receive webhook deliveries:
            </p>

            <CodeBlock
                code={`PUT /merchant/v1/webhooks/endpoints/:id
{
  "enabled": false
}`}
                language="json"
            />

            <p>
                To re-enable the endpoint, set <code>enabled: true</code>.
            </p>

            <h2>Testing Your Endpoint</h2>
            <p>
                After registering your endpoint, you can test it by:
            </p>

            <ol>
                <li>Making a test transaction in sandbox mode</li>
                <li>Checking the webhook deliveries in your dashboard</li>
                <li>Verifying that your server receives the webhook</li>
                <li>Confirming that signature verification works</li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-blue-700 dark:text-blue-400 text-lg mt-0.5">💡</span>
                    <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <p className="leading-relaxed">
                            <strong>Local Testing:</strong> Use a tool like <strong>ngrok</strong> to expose your local server for testing. Run <code>ngrok http 3000</code> and use the provided HTTPS URL for your webhook endpoint.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Best Practices</h2>
            <ul>
                <li><strong>Save your secret securely:</strong> Store it in environment variables or a secret management system</li>
                <li><strong>Use HTTPS in production:</strong> Never use HTTP for production webhooks</li>
                <li><strong>Test thoroughly:</strong> Test your endpoint with sandbox transactions before going live</li>
                <li><strong>Monitor deliveries:</strong> Regularly check webhook delivery status in the dashboard</li>
                <li><strong>Handle all events:</strong> Make sure your webhook handler can process all 6 event types</li>
            </ul>

            <h2>Next Steps</h2>
            <ul>
                <li>Learn about <Link href="/docs/webhooks/events" className="text-primary hover:underline">Webhook Events</Link> and their payloads</li>
                <li>Understand <Link href="/docs/webhooks/security" className="text-primary hover:underline">Webhook Security</Link> and signature verification</li>
                <li>View <Link href="/dashboard/webhooks" className="text-primary hover:underline">Your Webhook Endpoints</Link> in the dashboard</li>
            </ul>
        </div>
    );
}
