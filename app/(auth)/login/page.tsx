export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Merchant Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input type="password" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
