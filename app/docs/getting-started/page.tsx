export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Get up and running with ZitoPay in minutes. Follow these steps to integrate mobile money payments into your application.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Step 1: Create an Account</h2>
        <p className="text-gray-600 mb-4">
          Sign up for a ZitoPay account to get your API credentials.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Step 2: Get Your API Key</h2>
        <p className="text-gray-600 mb-4">
          Navigate to your dashboard and generate an API key from the API Keys section.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Step 3: Make Your First Request</h2>
        <p className="text-gray-600 mb-4">
          Use your API key to authenticate requests to the ZitoPay API.
        </p>
      </div>
    </div>
  );
}
