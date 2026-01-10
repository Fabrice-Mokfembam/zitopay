export default function AdminMerchantsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Merchants</h2>
      <div className="border rounded-lg p-6">
        <div className="mb-4 flex gap-4">
          <input type="search" placeholder="Search merchants..." className="flex-1 border rounded-lg px-4 py-2" />
          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Business Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Joined</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center p-8 text-gray-500">
                No merchants found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
