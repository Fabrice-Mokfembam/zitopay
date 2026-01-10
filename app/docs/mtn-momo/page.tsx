export default function MTNMomoPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">MTN Mobile Money Integration</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Learn how to integrate MTN Mobile Money payments into your application using the ZitoPay API.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Initiate Payment</h2>
        <p className="text-gray-600 mb-4">
          Use the payment initiation endpoint to start a Mobile Money transaction.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>
            {`POST /api/v1/payments/mtn-momo
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "amount": 1000,
  "currency": "XOF",
  "phoneNumber": "+225123456789",
  "description": "Payment for order #123"
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
