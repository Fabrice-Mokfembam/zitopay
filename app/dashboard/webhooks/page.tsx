"use client";

import { useState } from "react";
import {
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Pause,
  Copy,
  Check,
  X,
  RotateCcw,
} from "lucide-react";

type EndpointStatus = "active" | "disabled";
type DeliveryStatus = "success" | "failed" | "skipped";

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: EndpointStatus;
  secret: string;
}

interface WebhookDelivery {
  id: string;
  time: string;
  event: string;
  endpoint: string;
  status: DeliveryStatus;
  code: number;
  message: string;
}

export default function WebhooksPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<WebhookDelivery | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "payment.created",
    "payment.succeeded",
    "payment.failed",
    "payout.completed",
    "refund.processed",
  ]);

  const stats = {
    activeEndpoints: 3,
    totalSent: 1234,
    successRate: 98,
    failedLast24h: 12,
  };

  const endpoints: WebhookEndpoint[] = [
    {
      id: "1",
      url: "https://api.myapp.com/webhooks",
      events: ["payment.created", "payment.succeeded", "payment.failed", "payout.completed", "refund.processed"],
      status: "active",
      secret: "whsec_abc123def456ghi789",
    },
    {
      id: "2",
      url: "https://test.myapp.com/hooks",
      events: ["payment.succeeded", "payout.completed", "refund.processed"],
      status: "disabled",
      secret: "whsec_xyz789uvw456rst123",
    },
  ];

  const deliveries: WebhookDelivery[] = [
    {
      id: "1",
      time: "14:23",
      event: "payment.succeeded",
      endpoint: "api.myapp.com",
      status: "success",
      code: 200,
      message: "OK",
    },
    {
      id: "2",
      time: "13:45",
      event: "payout.completed",
      endpoint: "api.myapp.com",
      status: "failed",
      code: 500,
      message: "Error",
    },
    {
      id: "3",
      time: "12:10",
      event: "refund.processed",
      endpoint: "test.myapp.com",
      status: "skipped",
      code: 0,
      message: "Disabled",
    },
  ];

  const availableEvents = [
    { id: "payment.created", label: "payment.created - Payment initiated" },
    { id: "payment.succeeded", label: "payment.succeeded - Payment completed" },
    { id: "payment.failed", label: "payment.failed - Payment failed" },
    { id: "payout.created", label: "payout.created - Payout initiated" },
    { id: "payout.completed", label: "payout.completed - Payout completed" },
    { id: "payout.failed", label: "payout.failed - Payout failed" },
    { id: "refund.processed", label: "refund.processed - Refund completed" },
    { id: "settlement.completed", label: "settlement.completed - Settlement transferred" },
  ];

  const handleCopySecret = () => {
    navigator.clipboard.writeText("whsec_abc123def456ghi789");
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleCopyPayload = () => {
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((e) => e !== eventId) : [...prev, eventId]
    );
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      case "skipped":
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "skipped":
        return <Pause className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Webhooks</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Receive real-time notifications for events
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Endpoint
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            ACTIVE ENDPOINTS
          </p>
          <p className="text-2xl font-bold text-foreground">{stats.activeEndpoints}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            TOTAL SENT
          </p>
          <p className="text-2xl font-bold text-foreground">{stats.totalSent.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            SUCCESS RATE
          </p>
          <p className="text-2xl font-bold text-foreground">{stats.successRate}%</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            FAILED LAST 24H
          </p>
          <p className="text-2xl font-bold text-foreground">{stats.failedLast24h}</p>
        </div>
      </div>

      {/* ENDPOINTS */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Endpoints</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  URL
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Events
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint) => (
                <tr
                  key={endpoint.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-medium text-foreground">
                    {endpoint.url}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {endpoint.events.length} events
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${endpoint.status === "active"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400"
                        }`}
                    >
                      {endpoint.status === "active" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3" />
                          Disabled
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Edit
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT DELIVERIES */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Recent Deliveries</h3>
          <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Event
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Endpoint
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                  Code
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedDelivery(delivery);
                    setShowDetailModal(true);
                  }}
                >
                  <td className="py-3 px-4 text-xs text-foreground">{delivery.time}</td>
                  <td className="py-3 px-4 text-xs font-medium text-foreground">
                    {delivery.event}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">{delivery.endpoint}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                      {delivery.code > 0 ? delivery.code : delivery.message}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">{delivery.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD ENDPOINT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Add Webhook Endpoint</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Endpoint URL *
                </label>
                <input
                  type="url"
                  placeholder="https://api.myapp.com/webhooks"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Must be HTTPS</p>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Events to Subscribe *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableEvents.map((event) => (
                    <label key={event.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                        className="rounded border-border"
                      />
                      <span className="text-xs text-foreground">{event.label.split(" - ")[0]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Signing Secret (Auto-generated)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="whsec_abc123def456ghi789"
                    readOnly
                    className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-xs font-mono"
                  />
                  <button
                    onClick={handleCopySecret}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    {copiedSecret ? (
                      <>
                        <Check className="w-3 h-3" />
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
                <p className="text-xs text-muted-foreground mt-1">
                  Use this to verify webhook signatures
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
                  Test Endpoint
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                  Save Endpoint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELIVERY DETAIL MODAL */}
      {showDetailModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Webhook Delivery Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Event:</p>
                  <p className="font-semibold text-foreground">{selectedDelivery.event}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Endpoint:</p>
                  <p className="font-semibold text-foreground">https://{selectedDelivery.endpoint}/webhooks</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Time:</p>
                  <p className="font-semibold text-foreground">Jan 12, 2026 {selectedDelivery.time}:45</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status:</p>
                  <p className={`font-semibold flex items-center gap-1.5 ${getStatusColor(selectedDelivery.status)}`}>
                    {getStatusIcon(selectedDelivery.status)}
                    {selectedDelivery.status === "success" ? "Delivered" : selectedDelivery.message} ({selectedDelivery.code > 0 ? `${selectedDelivery.code} ${selectedDelivery.message}` : "N/A"})
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs font-semibold text-foreground mb-2">Request:</p>
                <pre className="bg-muted/50 rounded-lg p-3 overflow-x-auto text-xs">
                  {`POST /webhooks
Headers:
  X-Webhook-Signature: sha256=abc123...
  Content-Type: application/json

Payload:
{
  "event": "${selectedDelivery.event}",
  "data": {
    "id": "tx-123",
    "amount": 10000,
    "currency": "XAF"
  }
}`}
                </pre>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground mb-2">Response: {selectedDelivery.code} {selectedDelivery.message}</p>
                <pre className="bg-muted/50 rounded-lg p-3 overflow-x-auto text-xs">
                  {`{"received": true}`}
                </pre>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
                <button
                  onClick={handleCopyPayload}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                >
                  {copiedPayload ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Payload
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
