export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Merchant Account</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Business Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input type="password" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block mb-2">Confirm Password</label>
            <input type="password" className="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" required />
              <span className="text-sm">I agree to the terms and conditions</span>
            </label>
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
