export default function ApiKeysPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">API Keys</h2>
      <div className="border rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">Manage your API keys for accessing the ZitoPay API</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate New Key
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">No API keys found. Generate your first API key to get started.</p>
        </div>
      </div>
    </div>
  );
}
