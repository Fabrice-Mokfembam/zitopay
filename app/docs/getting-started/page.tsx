"use client";

import Link from "next/link";

export default function GettingStartedPage() {
    return (
        <div>
            <h1>Getting Started</h1>
            <p className="mb-6">
                Get up and running with ZitoPay in minutes. Follow these guides to integrate mobile money payments into your application.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
                <Link
                    href="/docs/getting-started/introduction"
                    className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                    <h2 className="mb-1.5">Introduction</h2>
                    <p className="text-muted-foreground">
                        Learn about ZitoPay, its features, and use cases.
                    </p>
                </Link>

                <Link
                    href="/docs/getting-started/implementation-guide"
                    className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                    <h2 className="mb-1.5">Implementation Guide</h2>
                    <p className="text-muted-foreground">
                        Step-by-step guide to integrate ZitoPay into your app.
                    </p>
                </Link>

                <Link
                    href="/docs/getting-started/using-the-api"
                    className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                    <h2 className="mb-1.5">Using the API</h2>
                    <p className="text-muted-foreground">
                        Understand authentication, environments, and API usage.
                    </p>
                </Link>
            </div>

            <h2>Quick Start</h2>
            <ol>
                <li>Create a ZitoPay account</li>
                <li>Get your API keys from the dashboard</li>
                <li>Follow the <Link href="/docs/getting-started/implementation-guide">Implementation Guide</Link></li>
                <li>Start testing in the sandbox environment</li>
            </ol>
        </div>
    );
}
