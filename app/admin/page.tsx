export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Total Merchants</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Total Transactions</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Total Volume</h3>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-600 mb-1">Active Users</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
