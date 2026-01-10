import { ReactNode } from "react";

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Documentation</h2>
          <nav className="space-y-2">
            <a href="/docs" className="block px-4 py-2 rounded hover:bg-gray-200">Introduction</a>
            <a href="/docs/getting-started" className="block px-4 py-2 rounded hover:bg-gray-200">Getting Started</a>
            <a href="/docs/authentication" className="block px-4 py-2 rounded hover:bg-gray-200">Authentication</a>
            <div className="mt-4">
              <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">Payment Providers</h3>
              <a href="/docs/mtn-momo" className="block px-6 py-2 rounded hover:bg-gray-200 text-sm">MTN Mobile Money</a>
              <a href="/docs/orange-money" className="block px-6 py-2 rounded hover:bg-gray-200 text-sm">Orange Money</a>
            </div>
            <a href="/docs/webhooks" className="block px-4 py-2 rounded hover:bg-gray-200">Webhooks</a>
            <a href="/docs/api-reference" className="block px-4 py-2 rounded hover:bg-gray-200">API Reference</a>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}
