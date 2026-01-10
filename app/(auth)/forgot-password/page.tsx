export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Reset Password</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  );
}
