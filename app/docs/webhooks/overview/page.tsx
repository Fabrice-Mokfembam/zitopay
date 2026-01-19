"use client";

import Link from "next/link";

export default function WebhooksOverviewPage() {
    return (
        <div>
            <h1>Webhooks Overview</h1>
            <p>
                Webhooks allow you to receive real-time notifications about transaction events. Instead of polling for status updates, ZitoPay will automatically send HTTP POST requests to your registered endpoint when events occur.
            </p>

            <h2>How Webhooks Work</h2>
            <ol>
                <li>Register a webhook endpoint in your dashboard with your server URL</li>
                <li>ZitoPay sends HTTP POST requests to your endpoint when events occur</li>
                <li>Your server verifies the webhook signature using the provided secret</li>
                <li>Your server processes the event and updates your system</li>
                <li>Your server returns a 200 OK response within 5 seconds</li>
            </ol>

            <h2>Supported Events</h2>
            <p>
                <strong>Important:</strong> You must subscribe to <strong>all 6 required events</strong> when registering a webhook endpoint. This ensures you receive all transaction notifications.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-3 my-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-1.5 pr-4 font-medium">Event</th>
                            <th className="text-left py-1.5 font-medium">Description</th>
                            <th className="text-left py-1.5 font-medium">When It Fires</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-1.5 pr-4"><code>payment.succeeded</code></td>
                            <td className="py-1.5">Payment completed successfully</td>
                            <td className="py-1.5">When a collection transaction succeeds</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 pr-4"><code>payment.failed</code></td>
                            <td className="py-1.5">Payment failed</td>
                            <td className="py-1.5">When a collection transaction fails</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 pr-4"><code>payout.completed</code></td>
                            <td className="py-1.5">Payout sent successfully</td>
                            <td className="py-1.5">When a disbursement/payout succeeds</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 pr-4"><code>payout.failed</code></td>
                            <td className="py-1.5">Payout failed</td>
                            <td className="py-1.5">When a disbursement/payout fails</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 pr-4"><code>refund.completed</code></td>
                            <td className="py-1.5">Refund processed</td>
                            <td className="py-1.5">When a refund is successfully processed</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 pr-4"><code>settlement.generated</code></td>
                            <td className="py-1.5">Settlement created</td>
                            <td className="py-1.5">When a new settlement is generated</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-orange-700 dark:text-orange-400 text-lg mt-0.5">⚠️</span>
                    <div className="flex-1 text-sm text-orange-900 dark:text-orange-100">
                        <p className="leading-relaxed">
                            <strong>Required Events:</strong> All 6 events listed above must be included when registering a webhook endpoint. You cannot subscribe to a subset of events.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Key Features</h2>
            <ul>
                <li>✅ <strong>Real-time notifications</strong> for all transaction events</li>
                <li>✅ <strong>HMAC signature verification</strong> for security</li>
                <li>✅ <strong>Automatic retries</strong> with exponential backoff (6 attempts)</li>
                <li>✅ <strong>Dead letter queue</strong> for failed deliveries</li>
                <li>✅ <strong>Manual replay</strong> of failed webhooks</li>
                <li>✅ <strong>Delivery logs</strong> and monitoring</li>
            </ul>

            <h2>Webhook Security</h2>
            <p>
                All webhooks include an HMAC-SHA256 signature in the <code>X-Zito-Signature</code> header. Always verify this signature before processing webhook payloads to ensure requests are from ZitoPay.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-blue-700 dark:text-blue-400 text-lg mt-0.5">💡</span>
                    <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <p className="leading-relaxed">
                            <strong>Security Best Practice:</strong> Always verify the webhook signature before processing any webhook payload. Never trust webhook data without signature verification, as it could be a malicious request attempting to manipulate your system. The signature is sent in the <code>X-Zito-Signature</code> header in the format <code>sha256=&lt;hex_encoded_signature&gt;</code>.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Retry Logic</h2>
            <p>
                If your server doesn&apos;t respond with HTTP 200-299, ZitoPay will automatically retry the webhook delivery:
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-3 my-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-1.5 pr-4 font-medium">Attempt</th>
                            <th className="text-left py-1.5 font-medium">Delay</th>
                            <th className="text-left py-1.5 font-medium">Total Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="py-1.5 pr-4">1</td><td className="py-1.5">Immediate</td><td className="py-1.5">0s</td></tr>
                        <tr><td className="py-1.5 pr-4">2</td><td className="py-1.5">1 minute</td><td className="py-1.5">1m</td></tr>
                        <tr><td className="py-1.5 pr-4">3</td><td className="py-1.5">5 minutes</td><td className="py-1.5">6m</td></tr>
                        <tr><td className="py-1.5 pr-4">4</td><td className="py-1.5">15 minutes</td><td className="py-1.5">21m</td></tr>
                        <tr><td className="py-1.5 pr-4">5</td><td className="py-1.5">1 hour</td><td className="py-1.5">1h 21m</td></tr>
                        <tr><td className="py-1.5 pr-4">6</td><td className="py-1.5">6 hours</td><td className="py-1.5">7h 21m</td></tr>
                        <tr><td className="py-1.5 pr-4">7</td><td className="py-1.5">24 hours</td><td className="py-1.5">31h 21m</td></tr>
                    </tbody>
                </table>
            </div>

            <p>
                After 7 failed attempts, the webhook is moved to the <strong>Dead Letter Queue (DLQ)</strong> where you can manually replay it after fixing the issue.
            </p>

            <h2>Best Practices</h2>
            <ul>
                <li><strong>Respond quickly:</strong> Return HTTP 200 within 5 seconds. Process webhooks asynchronously using a queue.</li>
                <li><strong>Handle duplicates:</strong> Webhooks may be delivered more than once. Use transaction IDs to detect duplicates and make your handler idempotent.</li>
                <li><strong>Verify signatures:</strong> Always verify the HMAC signature and check the timestamp to prevent replay attacks.</li>
                <li><strong>Use HTTPS:</strong> Webhook URLs must use HTTPS in production (HTTP is only allowed for local testing).</li>
                <li><strong>Monitor deliveries:</strong> Regularly check the deliveries endpoint and set up alerts for failed webhooks.</li>
                <li><strong>Subscribe to all events:</strong> All 6 events are required when registering a webhook endpoint.</li>
            </ul>

            <h2>Next Steps</h2>
            <ul>
                <li>Learn how to <Link href="/docs/webhooks/register" className="text-primary hover:underline">Register a Webhook Endpoint</Link></li>
                <li>See all available <Link href="/docs/webhooks/events" className="text-primary hover:underline">Webhook Events</Link></li>
                <li>Understand <Link href="/docs/webhooks/security" className="text-primary hover:underline">Webhook Security and Signature Verification</Link></li>
                <li>View <Link href="/dashboard/webhooks" className="text-primary hover:underline">Your Webhook Endpoints</Link> in the dashboard</li>
            </ul>
        </div>
    );
}
