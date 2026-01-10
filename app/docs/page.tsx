export default function DocsHome() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">ZitoPay API Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the ZitoPay API documentation. Learn how to integrate mobile money payments into your application.
      </p>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="text-gray-600 mb-4">Learn the basics of integrating ZitoPay into your application.</p>
          <a href="/docs/getting-started" className="text-blue-600 hover:underline">Read more →</a>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Authentication</h2>
          <p className="text-gray-600 mb-4">Understand how to authenticate your API requests.</p>
          <a href="/docs/authentication" className="text-blue-600 hover:underline">Read more →</a>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Payment Providers</h2>
          <p className="text-gray-600 mb-4">Learn how to integrate with MTN Mobile Money and Orange Money.</p>
          <div className="flex gap-4 mt-2">
            <a href="/docs/mtn-momo" className="text-blue-600 hover:underline">MTN MoMo →</a>
            <a href="/docs/orange-money" className="text-blue-600 hover:underline">Orange Money →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
