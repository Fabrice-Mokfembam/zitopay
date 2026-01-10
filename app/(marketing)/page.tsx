import Link from "next/link";

export default function MarketingHome() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Accept Mobile Money Payments with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Integrate MTN Mobile Money and Orange Money payments into your
          application with our powerful API.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
