"use client";

import Link from "next/link";

export default function ImplementationGuidePage() {
    return (
        <div>
            <h1>Implementation Guide</h1>
            
            <p>
                This guide explains how to set up and configure your ZitoPay integration, including gateway configuration, domain verification, and understanding the payment flow architecture.
            </p>

            <h2>Gateway Configuration</h2>

            <h3>Understanding Gateways</h3>
            <p>
                Payment gateways are the underlying payment methods that ZitoPay supports. Currently, ZitoPay supports two main gateways:
            </p>
            <ul>
                <li><strong>MTN_MOMO</strong> - MTN Mobile Money</li>
                <li><strong>ORANGE_MONEY</strong> - Orange Money</li>
            </ul>
            <p>
                Each merchant must configure at least one gateway to process payments. You can configure multiple gateways and enable or disable them as needed based on your business requirements.
            </p>

            <h3>Configuring a Gateway</h3>
            <p>
                Before making payment requests, you must configure at least one payment gateway for your merchant account. Gateway configuration includes setting transaction limits (minimum/maximum amounts, daily limits) and enabling or disabling the gateway.
            </p>
            <p>
                You can configure multiple gateways and enable/disable them as needed. This gives you flexibility to switch between payment methods or use multiple gateways simultaneously.
            </p>

            <h3>How to Configure</h3>
            <ol>
                <li>Navigate to your merchant dashboard</li>
                <li>Go to <strong>Gateway Settings</strong> (or <strong>Gateways</strong> section)</li>
                <li>Select the gateway you want to configure (MTN_MOMO or ORANGE_MONEY)</li>
                <li>Set your preferences:
                    <ul>
                        <li>Transaction limits (minimum and maximum amounts)</li>
                        <li>Daily transaction limit</li>
                        <li>Enable or disable the gateway</li>
                    </ul>
                </li>
                <li>Save the configuration</li>
            </ol>

            <h2>Domain Verification</h2>

            <h3>Why Domain Verification?</h3>
            <p>
                Domain verification is a security feature that proves you own the domain you're claiming. It's required for production API access and prevents unauthorized domains from using your API keys. Only verified domains can be used in the <code>x-zito-origin</code> header.
            </p>

            <h3>Domain Verification Process</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <div className="flex items-start gap-3">
                    <span className="text-blue-700 dark:text-blue-400 text-lg mt-0.5">💡</span>
                    <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <p className="leading-relaxed">
                            Our sandbox and production environment are completely separated from each other. You can invite anybody into the sandbox portal, they will not get access to any production information as part of the sandbox.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span>📦</span> Domain Verification Steps
                </h4>
                <ol className="space-y-3 list-decimal list-inside text-sm">
                    <li className="font-medium">Add Your Domain
                        <ul className="list-disc list-inside ml-5 mt-1.5 font-normal text-sm">
                            <li>Navigate to Domain Settings in your merchant dashboard</li>
                            <li>Enter your domain (e.g., example.com)</li>
                            <li>Click &quot;Add Domain&quot;</li>
                            <li>You&apos;ll receive a verification token</li>
                        </ul>
                    </li>
                    <li className="font-medium">Add DNS TXT Record
                        <ul className="list-disc list-inside ml-5 mt-1.5 font-normal text-sm">
                            <li>Log into your domain&apos;s DNS provider (GoDaddy, Cloudflare, etc.)</li>
                            <li>Add a new TXT record:
                                <ul className="list-none ml-3 mt-1 space-y-0.5 text-sm">
                                    <li>• <strong>Name:</strong> <code>_zitopay</code></li>
                                    <li>• <strong>Type:</strong> TXT</li>
                                    <li>• <strong>Value:</strong> [your verification token]</li>
                                    <li>• <strong>TTL:</strong> 3600 (or default)</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-4">
                        <div className="flex items-start gap-3">
                            <span className="text-orange-700 dark:text-orange-400 text-lg mt-0.5">💡</span>
                            <div className="flex-1 text-sm text-orange-900 dark:text-orange-100">
                                <p className="leading-relaxed">
                                    <strong>About TTL:</strong> TTL (Time To Live) determines how long DNS servers cache the record. A TTL of 3600 seconds (1 hour) means the record will be cached for 1 hour. After the TTL expires, the record can still be verified - TTL only affects caching, not the record&apos;s validity. You can verify your domain at any time after adding the DNS record, regardless of TTL.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <li className="font-medium">Wait for DNS Propagation
                        <ul className="list-disc list-inside ml-5 mt-1.5 font-normal text-sm">
                            <li>DNS changes can take 15-30 minutes to propagate</li>
                            <li>You can verify with: <code>nslookup -type=TXT _zitopay.example.com</code></li>
                        </ul>
                    </li>
                    <li className="font-medium">Verify Domain
                        <ul className="list-disc list-inside ml-5 mt-1.5 font-normal text-sm">
                            <li>Return to your merchant dashboard</li>
                            <li>Click &quot;Verify Domain&quot; next to your domain</li>
                            <li>System will automatically check DNS records</li>
                            <li>If token matches → Domain verified ✅</li>
                            <li>If not found → Check DNS settings and try again</li>
                        </ul>
                    </li>
                    <li className="font-medium">Domain Ready
                        <ul className="list-disc list-inside ml-5 mt-1.5 font-normal text-sm">
                            <li>Once verified, you can use this domain in the <code>x-zito-origin</code> header</li>
                            <li>Verified domains are automatically allowlisted</li>
                        </ul>
                    </li>
                </ol>
            </div>

            <h3>Important Notes</h3>
            <ul>
                <li>Only domain owners can add DNS records (proves ownership)</li>
                <li>DNS propagation may take 15-30 minutes</li>
                <li>You can verify multiple domains</li>
                <li>Domain verification is required for production (sandbox may be more lenient)</li>
            </ul>

            <h2>IP Allowlisting (Alternative to Domain Verification)</h2>

            <h3>IP Allowlisting Overview</h3>
            <p>
                IP allowlisting is an alternative security method to domain verification. You can use either IP allowlisting OR domain verification (or both). If you use IP allowlisting, requests must come from allowed IP addresses.
            </p>
            <p>
                This method is particularly useful for server-to-server integrations where domain verification isn't applicable, such as backend services or mobile applications.
            </p>

            <h3>How It Works</h3>
            <p>
                Configure allowed IP addresses or CIDR ranges in your merchant dashboard. Requests from non-allowlisted IPs are rejected with a 403 Forbidden response. This provides an additional layer of security by ensuring only requests from your known servers can access your API.
            </p>

            <h2>Understanding the Payment Flow</h2>

            <h3>Quote-Based System</h3>
            <p>
                All payments in ZitoPay start with creating a quote. The quote locks in fees for 15 minutes, ensuring you know exactly what you'll be charged. The quote must be used before expiry, and each quote can only be used once.
            </p>
            <p>
                This quote-based approach provides price certainty and prevents fee fluctuations during the payment process.
            </p>

            <h3>Transaction States</h3>
            <p>
                Transactions in ZitoPay go through several states:
            </p>
            <ul>
                <li><strong>PENDING</strong> - Transaction has been initiated</li>
                <li><strong>PROCESSING</strong> - Transaction is being processed by the gateway</li>
                <li><strong>VERIFYING</strong> - Transaction is being verified</li>
                <li><strong>SUCCESS</strong> - Transaction completed successfully</li>
                <li><strong>FAILED</strong> - Transaction failed (check error details)</li>
            </ul>
            <p>
                Transactions are asynchronous, meaning the API returns immediately after accepting the request. You should use webhooks or polling to check the final status of your transactions.
            </p>

            <h3>Idempotency</h3>
            <p>
                Use unique idempotency keys for each transaction. This prevents duplicate payments if a request is retried due to network issues or timeouts. The idempotency key must be unique per quote and helps ensure that retrying a request doesn't result in multiple charges.
            </p>

            <h2>Security Best Practices</h2>
            <ul>
                <li>Protect your API keys and secret keys - never commit them to version control</li>
                <li>Use HTTPS for all API requests</li>
                <li>Implement proper error handling and retry logic</li>
                <li>Monitor your API usage and set up alerts for unusual activity</li>
                <li>Set up webhooks for real-time notifications</li>
                <li>Test thoroughly in sandbox before moving to production</li>
                <li>Keep your secret keys secure and rotate them periodically</li>
                <li>Use IP allowlisting or domain verification for additional security</li>
            </ul>

            <h2>Next Steps</h2>
            <p>
                Now that you understand the setup process, learn how to use the API:
            </p>
            <ul>
                <li>
                    <Link href="/docs/getting-started/using-the-api" className="text-primary hover:underline">
                        Using the API
                    </Link> - Learn about authentication, headers, and making requests
                </li>
                <li>
                    <Link href="/docs/collections" className="text-primary hover:underline">
                        Collections Documentation
                    </Link> - Learn how to accept payments
                </li>
                <li>
                    <Link href="/docs/disbursements" className="text-primary hover:underline">
                        Disbursements Documentation
                    </Link> - Learn how to send payments
                </li>
            </ul>
        </div>
    );
}
