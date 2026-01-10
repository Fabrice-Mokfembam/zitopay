import { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Marketing Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">ZitoPay</h1>
            <div className="flex gap-4">
              <a href="/pricing">Pricing</a>
              <a href="/solutions">Solutions</a>
              <a href="/contact">Contact</a>
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </nav>
      {children}
      {/* Marketing Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Product</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="/solutions">Solutions</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/security">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Developers</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/docs/api-reference">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ZitoPay. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
