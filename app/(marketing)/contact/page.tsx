export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block mb-2">Message</label>
            <textarea className="w-full border rounded-lg px-4 py-2 h-32" />
          </div>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
