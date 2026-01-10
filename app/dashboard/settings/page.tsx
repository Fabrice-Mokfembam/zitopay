export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Business Information</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Business Name</label>
              <input type="text" className="w-full border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full border rounded-lg px-4 py-2" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </form>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Password</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Current Password</label>
              <input type="password" className="w-full border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block mb-2">New Password</label>
              <input type="password" className="w-full border rounded-lg px-4 py-2" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
