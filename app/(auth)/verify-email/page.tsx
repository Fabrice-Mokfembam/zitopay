export default function VerifyEmailPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Resend Verification Email
        </button>
      </div>
    </div>
  );
}
