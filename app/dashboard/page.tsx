"use client";

import { ArrowUpRight, ArrowDownLeft, Wallet, RefreshCw, EyeOff } from "lucide-react";

const stats = [
  {
    label: "TOTAL DISBURSED",
    value: "FCFA 0",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    icon: ArrowUpRight,
    iconColor: "text-orange-500",
  },
  {
    label: "TOTAL COLLECTION",
    value: "FCFA 0",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    icon: ArrowDownLeft,
    iconColor: "text-purple-500",
  },
  {
    label: "TOTAL VOLUME",
    value: "FCFA 0",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    icon: Wallet,
    iconColor: "text-emerald-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title Section */}
        <div className="order-1">
          <h1 className="text-xl font-bold text-foreground">Business Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor your transactions and business performance
          </p>
        </div>

        {/* Actions Section */}
        <div className="order-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date Badge */}
          <div className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-medium">
            Mon, Jan 12, 2026
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors">
              Withdraw
            </button>
            <button className="px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
              Top Up
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - All in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-4 border border-border/50`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}

        {/* Account Balance Card */}
        <div className="bg-background rounded-xl p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            ACCOUNT BALANCE
          </p>
          <p className="text-lg font-bold text-foreground">FCFA 0</p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-background rounded-2xl p-6 border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
          <button className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium">
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Transaction ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Gateway</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Transaction 1 */}
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-xs text-foreground">Oct 24, 2023</td>
                <td className="py-3 px-4 text-xs text-foreground">#27-9281-023</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Success
                  </span>
                </td>
                <td className="py-3 px-4 text-xs font-semibold text-foreground">$120.00</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-lg">≡</span>
                    Stripe
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>

              {/* Transaction 2 */}
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-xs text-foreground">Oct 24, 2023</td>
                <td className="py-3 px-4 text-xs text-foreground">#27-9281-024</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Pending
                  </span>
                </td>
                <td className="py-3 px-4 text-xs font-semibold text-foreground">$43.90</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-lg">P</span>
                    PayPal
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>

              {/* Transaction 3 */}
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-xs text-foreground">Oct 23, 2023</td>
                <td className="py-3 px-4 text-xs text-foreground">#27-9280-998</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Failed
                  </span>
                </td>
                <td className="py-3 px-4 text-xs font-semibold text-foreground">$210.00</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-lg">≡</span>
                    Stripe
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>

              {/* Transaction 4 */}
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-xs text-foreground">Oct 23, 2023</td>
                <td className="py-3 px-4 text-xs text-foreground">#27-9280-997</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Success
                  </span>
                </td>
                <td className="py-3 px-4 text-xs font-semibold text-foreground">$1,450.00</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-lg">🏦</span>
                    Local Bank
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
