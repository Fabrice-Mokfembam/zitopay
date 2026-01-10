export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Authentication</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          All API requests must be authenticated using your API key. Include your API key in the Authorization header.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">API Key Authentication</h2>
        <p className="text-gray-600 mb-4">
          Include your API key in the Authorization header using the Bearer token format:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>
            {`Authorization: Bearer YOUR_API_KEY`}
          </code>
        </pre>
      </div>
    </div>
  );
}
