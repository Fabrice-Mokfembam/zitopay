export default function TransactionsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      <div className="border rounded-lg p-6">
        <div className="mb-4 flex gap-4">
          <input type="search" placeholder="Search transactions..." className="flex-1 border rounded-lg px-4 py-2" />
          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center p-8 text-gray-500">
                No transactions found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
