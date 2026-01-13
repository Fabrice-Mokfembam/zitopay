"use client";

import { useState } from "react";
import {
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
  Code,
  TestTube,
  Lock,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

type Environment = "sandbox" | "production";

export default function ApiKeysPage() {
  const [activeEnv, setActiveEnv] = useState<Environment>("sandbox");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [showNewCredsModal, setShowNewCredsModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dummy data - will be replaced with real API data
  const credentials = {
    sandbox: {
      apiKey: "zito_test_1234567890abcdefghijklmnopqrstuvwxyz",
      secretKey: "zito_secret_test_0987654321zyxwvutsrqponmlkjihgfedcba",
      createdAt: "Jan 1, 2026",
      lastUsed: "2 hours ago",
    },
    production: {
      apiKey: "zito_live_abcdefghijklmnopqrstuvwxyz1234567890",
      secretKey: "zito_secret_live_zyxwvutsrqponmlkjihgfedcba0987654321",
      createdAt: "Jan 15, 2026",
      lastUsed: "5 minutes ago",
      approved: true, // Set to false to show "not approved" state
    },
  };

  const usageStats = {
    totalRequests: 1279,
    successfulRequests: 1234,
    failedRequests: 45,
    rateLimit: 100,
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegenerate = () => {
    if (confirmText === "REGENERATE") {
      setShowRegenerateModal(false);
      setShowNewCredsModal(true);
      setConfirmText("");
    }
  };

  const currentCreds = credentials[activeEnv];
  const isProduction = activeEnv === "production";

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-foreground">API Keys</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your API keys for accessing the ZitoPay API
        </p>
      </div>

      {/* ENVIRONMENT TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveEnv("sandbox")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeEnv === "sandbox"
            ? "bg-orange-500 text-white"
            : "bg-background border border-border text-foreground hover:bg-muted"
            }`}
        >
          <div className="w-2 h-2 bg-orange-400 rounded-full" />
          Sandbox
          {activeEnv === "sandbox" && <Check className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setActiveEnv("production")}
          disabled={!credentials.production.approved}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeEnv === "production"
            ? "bg-green-500 text-white"
            : "bg-background border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          Production
          {activeEnv === "production" && <Check className="w-4 h-4" />}
        </button>
      </div>

      {/* ENVIRONMENT BANNER */}
      <div
        className={`rounded-xl p-4 border ${isProduction
          ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
          : "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800"
          }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isProduction ? (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              )}
              <h3 className="text-sm font-semibold text-foreground">
                {isProduction ? "🟢 PRODUCTION MODE - Live Environment" : "🟠 SANDBOX MODE - Testing Environment"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {isProduction
                ? "⚠️ These credentials process REAL MONEY. Use with caution and never expose the secret key."
                : "Use these credentials for development and testing. No real money will be processed."}
            </p>
            {isProduction && credentials.production.approved && (
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-3 h-3" />
                  KYB Approved
                </span>
              </div>
            )}
          </div>
          {!isProduction && (
            <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline whitespace-nowrap flex items-center gap-1">
              Switch to Production
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* PRODUCTION NOT APPROVED STATE */}
      {isProduction && !credentials.production.approved && (
        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                🔒 Production Access Not Available
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Complete these steps to request production access:
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-foreground">1. Complete KYB verification</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 border-2 border-orange-500 rounded-full animate-spin border-t-transparent" />
                  <span className="text-foreground">2. Submit production access request (Pending)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 border-2 border-border rounded-full" />
                  <span className="text-muted-foreground">3. Wait for admin approval</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors">
                  View KYB Status
                </button>
                <button className="px-3 py-1.5 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                  Request Production Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API CREDENTIALS */}
      {(!isProduction || credentials.production.approved) && (
        <div className="bg-background rounded-xl p-6 border border-border space-y-6">
          <h3 className="text-sm font-semibold text-foreground">API Credentials</h3>

          {/* API Key (Public) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">API Key (Public)</label>
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-3 h-3" />
                Safe to expose
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={currentCreds.apiKey}
                readOnly
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-20"
              />
              <button
                onClick={() => handleCopy(currentCreds.apiKey, "apiKey")}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1"
              >
                {copiedKey === "apiKey" ? (
                  <>
                    <Check className="w-3 h-3 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
              This key is safe to expose in your frontend code
            </p>
          </div>

          {/* Secret Key (Private) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Secret Key (Private)</label>
              <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="w-3 h-3" />
                Keep secret
              </span>
            </div>
            <div className="relative">
              <input
                type={showSecretKey ? "text" : "password"}
                value={currentCreds.secretKey}
                readOnly
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-32"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="px-2 py-1 bg-background border border-border rounded text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1"
                >
                  {showSecretKey ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      Show
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleCopy(currentCreds.secretKey, "secretKey")}
                  className="px-2 py-1 bg-background border border-border rounded text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1"
                >
                  {copiedKey === "secretKey" ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <AlertCircle className="w-3 h-3 mt-0.5 text-red-500 flex-shrink-0" />
              NEVER expose this key in frontend code or public repositories
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
            <span>Created: {currentCreds.createdAt}</span>
            <span>•</span>
            <span>Last used: {currentCreds.lastUsed}</span>
          </div>

          {/* Regenerate Button */}
          <div className="pt-3 border-t border-border">
            <button
              onClick={() => setShowRegenerateModal(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate Credentials
            </button>
            <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Warning: Regenerating will immediately invalidate your current credentials
            </p>
          </div>
        </div>
      )}

      {/* API USAGE STATS */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          API Usage Statistics (Last 30 Days)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              📊 TOTAL REQUESTS
            </p>
            <p className="text-xl font-bold text-foreground mb-1">{usageStats.totalRequests}</p>
            <p className="text-xs text-muted-foreground">This period</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              ✅ SUCCESSFUL
            </p>
            <p className="text-xl font-bold text-foreground mb-1">{usageStats.successfulRequests}</p>
            <p className="text-xs text-green-600 dark:text-green-400">
              {((usageStats.successfulRequests / usageStats.totalRequests) * 100).toFixed(1)}% Completed
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              ❌ FAILED
            </p>
            <p className="text-xl font-bold text-foreground mb-1">{usageStats.failedRequests}</p>
            <p className="text-xs text-red-600 dark:text-red-400">
              {((usageStats.failedRequests / usageStats.totalRequests) * 100).toFixed(1)}% Need review
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              ⚡ RATE LIMIT
            </p>
            <p className="text-xl font-bold text-foreground mb-1">{usageStats.rateLimit}/min</p>
            <p className="text-xs text-muted-foreground">Current limit</p>
          </div>
        </div>
        <button className="mt-4 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
          View Detailed Logs
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* QUICK START */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Start</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <FileText className="w-4 h-4" />
            API Documentation
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <Code className="w-4 h-4" />
            Code Examples
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
            <TestTube className="w-4 h-4" />
            Test API
          </button>
        </div>

        {/* Code Example */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-foreground">JavaScript / Node.js</span>
            <button
              onClick={() => handleCopy(codeExample, "code")}
              className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              {copiedKey === "code" ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="text-xs font-mono text-foreground overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
        </div>
        <button className="mt-4 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
          View More Examples
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* SECURITY BEST PRACTICES */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <h3 className="text-sm font-semibold text-foreground">Security Best Practices</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              DO:
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Store secret keys in environment variables
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Use HTTPS for all API requests
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Rotate credentials regularly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Monitor API usage for anomalies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Use different keys for sandbox and production
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              DON&apos;T:
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                Commit secret keys to version control (Git)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                Expose secret keys in frontend code
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                Share credentials via email or chat
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                Use production keys in sandbox
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                Hard-code credentials in your application
              </li>
            </ul>
          </div>
        </div>
        <button className="mt-6 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
          Read Full Security Guide
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* REGENERATE CONFIRMATION MODAL */}
      {showRegenerateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-bold text-foreground">Regenerate API Credentials?</h3>
              </div>
              <button
                onClick={() => {
                  setShowRegenerateModal(false);
                  setConfirmText("");
                }}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-foreground">
                This will generate new API credentials and immediately invalidate your current ones.
              </p>

              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  Important:
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Your current API key and secret will stop working</li>
                  <li>• Any active integrations will fail</li>
                  <li>• You must update your code with the new credentials</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Before proceeding:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500" />
                    Ensure you have access to update your integration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500" />
                    Consider doing this during low-traffic periods
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500" />
                    Have a rollback plan ready
                  </li>
                </ul>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Type &quot;REGENERATE&quot; to confirm:
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
                  placeholder="REGENERATE"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRegenerateModal(false);
                  setConfirmText("");
                }}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerate}
                disabled={confirmText !== "REGENERATE"}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Regenerate Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW CREDENTIALS MODAL */}
      {showNewCredsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-foreground">New Credentials Generated</h3>
              </div>
              <button
                onClick={() => setShowNewCredsModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
              <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                SAVE THESE CREDENTIALS NOW!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The secret key will only be shown once.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">New API Key</label>
                <div className="relative">
                  <input
                    type="text"
                    value="sk_sandbox_NEW123456789..."
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-16"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded text-xs font-medium hover:bg-muted transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">New Secret Key</label>
                <div className="relative">
                  <input
                    type="text"
                    value="secret_NEW987654321..."
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-foreground pr-16"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded text-xs font-medium hover:bg-muted transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                I have saved these credentials securely
              </label>

              <div className="bg-muted/50 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-foreground mb-2">Next Steps:</h4>
                <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                  <li>Update your environment variables</li>
                  <li>Deploy your updated code</li>
                  <li>Test your integration</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download .env
              </button>
              <button
                onClick={() => setShowNewCredsModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const codeExample = `const zitopay = require('zitopay-sdk');

const client = new zitopay({
  apiKey: 'sk_sandbox_...',
  secretKey: 'secret_...'
});

const payment = await client.createPayment({
  amount: 1000,
  currency: 'XAF'
});`;
