export default function WebhooksPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Webhooks</h2>
      <div className="border rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">Configure webhook endpoints to receive payment notifications</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Webhook
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">No webhooks configured.</p>
        </div>
      </div>
    </div>
  );
}
