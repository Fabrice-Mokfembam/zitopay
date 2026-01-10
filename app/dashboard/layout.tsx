import { ReactNode } from "react";

export default function MerchantLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">ZitoPay</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-200">Overview</a>
            <a href="/dashboard/transactions" className="block px-4 py-2 rounded hover:bg-gray-200">Transactions</a>
            <a href="/dashboard/payments" className="block px-4 py-2 rounded hover:bg-gray-200">Payments</a>
            <a href="/dashboard/customers" className="block px-4 py-2 rounded hover:bg-gray-200">Customers</a>
            <a href="/dashboard/settlements" className="block px-4 py-2 rounded hover:bg-gray-200">Settlements</a>
            <a href="/dashboard/api-keys" className="block px-4 py-2 rounded hover:bg-gray-200">API Keys</a>
            <a href="/dashboard/webhooks" className="block px-4 py-2 rounded hover:bg-gray-200">Webhooks</a>
            <a href="/dashboard/analytics" className="block px-4 py-2 rounded hover:bg-gray-200">Analytics</a>
            <a href="/dashboard/settings" className="block px-4 py-2 rounded hover:bg-gray-200">Settings</a>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Merchant Dashboard</h1>
            <div className="flex items-center gap-4">
              <span>Merchant Name</span>
              <button className="text-sm text-gray-600 hover:text-gray-900">Logout</button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
