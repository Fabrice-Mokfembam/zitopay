"use client";

import Link from "next/link";

export default function WebhooksOverviewPage() {
    return (
        <div>
            <h1>Webhooks Overview</h1>
            <p>
                Webhooks allow you to receive real-time notifications about transaction events. Instead of polling for status updates, ZitoPay will send HTTP POST requests to your endpoint when events occur.
            </p>

            <h2>How Webhooks Work</h2>
            <ol>
                <li>Register a webhook endpoint in your dashboard</li>
                <li>ZitoPay sends HTTP POST requests to your endpoint when events occur</li>
                <li>Your server verifies the webhook signature</li>
                <li>Your server processes the event</li>
                <li>Your server returns a 200 OK response</li>
            </ol>

            <h2>Webhook Events</h2>
            <ul>
                <li><code>transaction.completed</code> - Transaction completed successfully</li>
                <li><code>transaction.failed</code> - Transaction failed</li>
                <li><code>transaction.verifying</code> - Transaction being verified</li>
                <li><code>refund.completed</code> - Refund completed</li>
                <li><code>refund.failed</code> - Refund failed</li>
            </ul>

            <h2>Webhook Security</h2>
            <p>
                All webhooks include an HMAC signature in the <code>X-Webhook-Signature</code> header. Always verify this signature before processing webhook payloads.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-blue-700 dark:text-blue-400 text-lg mt-0.5">💡</span>
                    <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <p className="leading-relaxed">
                            <strong>Security Best Practice:</strong> Always verify the webhook signature before processing any webhook payload. Never trust webhook data without signature verification, as it could be a malicious request attempting to manipulate your system.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Next Steps</h2>
            <ul>
                <li>Learn how to <Link href="/docs/webhooks/register">Register a Webhook Endpoint</Link></li>
                <li>See all available <Link href="/docs/webhooks/events">Webhook Events</Link></li>
                <li>Understand <Link href="/docs/webhooks/security">Webhook Security</Link></li>
            </ul>
        </div>
    );
}
