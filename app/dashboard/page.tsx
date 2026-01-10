export default function MerchantDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Transactions</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Pending</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Customers</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    </div>
  );
}
