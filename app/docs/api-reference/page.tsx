export default function ApiReferencePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">API Reference</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Complete reference documentation for all ZitoPay API endpoints.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Base URL</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>https://api.zitopay.com/v1</code>
        </pre>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Endpoints</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">POST /payments</h3>
            <p className="text-sm text-gray-600">Initiate a payment</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">GET /payments/:id</h3>
            <p className="text-sm text-gray-600">Get payment status</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">GET /transactions</h3>
            <p className="text-sm text-gray-600">List transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
