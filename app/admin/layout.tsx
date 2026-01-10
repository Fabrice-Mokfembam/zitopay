import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">ZitoPay Admin</h2>
          <nav className="space-y-2">
            <a href="/admin" className="block px-4 py-2 rounded hover:bg-gray-200">Overview</a>
            <a href="/admin/merchants" className="block px-4 py-2 rounded hover:bg-gray-200">Merchants</a>
            <a href="/admin/transactions" className="block px-4 py-2 rounded hover:bg-gray-200">Transactions</a>
            <a href="/admin/settlements" className="block px-4 py-2 rounded hover:bg-gray-200">Settlements</a>
            <a href="/admin/fees" className="block px-4 py-2 rounded hover:bg-gray-200">Fees</a>
            <a href="/admin/integrations" className="block px-4 py-2 rounded hover:bg-gray-200">Integrations</a>
            <a href="/admin/system-settings" className="block px-4 py-2 rounded hover:bg-gray-200">System Settings</a>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span>Admin User</span>
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
