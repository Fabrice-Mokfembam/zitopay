export default function WebhooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Webhooks</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Configure webhooks to receive real-time notifications about payment events in your application.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Available Events</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>payment.completed</li>
          <li>payment.failed</li>
          <li>payment.pending</li>
          <li>settlement.processed</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Webhook Configuration</h2>
        <p className="text-gray-600 mb-4">
          Configure your webhook URL in the merchant dashboard under the Webhooks section.
        </p>
      </div>
    </div>
  );
}
