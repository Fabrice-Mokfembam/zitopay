"use client";

import { useState } from "react";
import {
    Search,
    Phone,
    Mail,
    MessageCircle,
    FileText,
    HelpCircle,
    Send,
    X,
    ChevronRight,
    ThumbsUp,
    ThumbsDown,
} from "lucide-react";

export default function HelpSupportPage() {
    const [showContactModal, setShowContactModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [ticketPriority, setTicketPriority] = useState("normal");

    const faqCategories = [
        {
            title: "Getting Started",
            items: [
                "How do I create an account?",
                "How do I get my API keys?",
                "How do I test payments in sandbox?",
            ],
        },
        {
            title: "Payments",
            items: [
                "What payment methods do you support?",
                "How long do payments take to process?",
                "What are your transaction fees?",
                "How do I handle failed payments?",
            ],
        },
        {
            title: "Payouts",
            items: [
                "How do I send money to customers?",
                "Can I do bulk payouts?",
                "What are payout fees?",
            ],
        },
        {
            title: "Account & Security",
            items: [
                "How do I verify my business (KYB)?",
                "How do I get production access?",
                "How do I reset my password?",
                "How do I add team members?",
            ],
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Get help with your ZitoPay account
                </p>
            </div>

            {/* SEARCH */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">HOW CAN WE HELP?</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help..."
                        className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg text-sm"
                    />
                </div>
            </div>

            {/* CONTACT OPTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Support */}
                <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <h3 className="text-sm font-semibold text-foreground">CONTACT SUPPORT</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Email:</p>
                            <p className="text-sm font-semibold text-foreground">support@zitopay.com</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Phone:</p>
                            <p className="text-sm font-semibold text-foreground">+237 670 000 000</p>
                        </div>
                        <button
                            onClick={() => setShowContactModal(true)}
                            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            Send Email
                        </button>
                    </div>
                </div>

                {/* Live Chat */}
                <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        <h3 className="text-sm font-semibold text-foreground">LIVE CHAT</h3>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs text-muted-foreground">
                            Chat with our support team
                        </p>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Available:</p>
                            <p className="text-sm font-semibold text-foreground">Mon-Fri, 8AM-6PM WAT</p>
                        </div>
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Start Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                    FREQUENTLY ASKED QUESTIONS
                </h3>

                <div className="space-y-4">
                    {faqCategories.map((category, index) => (
                        <div key={index}>
                            <h4 className="text-sm font-semibold text-foreground mb-2">{category.title}</h4>
                            <div className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                    <button
                                        key={itemIndex}
                                        className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left"
                                    >
                                        <span className="text-xs text-foreground">├─ {item}</span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="mt-6 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline">
                    View All FAQs →
                </button>
            </div>

            {/* HELPFUL RESOURCES */}
            <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">HELPFUL RESOURCES</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-medium text-foreground">Documentation</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-foreground">Video Tutorials</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-foreground">Blog</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-foreground">Status Page</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-medium text-foreground">Security</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-medium text-foreground">Terms of Service</span>
                    </button>
                </div>
            </div>

            {/* SUBMIT TICKET */}
            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <h3 className="text-sm font-semibold text-foreground mb-2">SUBMIT A TICKET</h3>
                <p className="text-xs text-muted-foreground mb-4">
                    Can't find what you're looking for? Submit a support ticket
                </p>
                <button
                    onClick={() => setShowContactModal(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                    Create Support Ticket
                </button>
            </div>

            {/* CONTACT SUPPORT MODAL */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl p-6 shadow-2xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Contact Support</h3>
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Payment not processing"
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Category *
                                </label>
                                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                                    <option>Payments</option>
                                    <option>Payouts</option>
                                    <option>Refunds</option>
                                    <option>Account</option>
                                    <option>Technical</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Priority
                                </label>
                                <div className="flex gap-3">
                                    {["normal", "high", "urgent"].map((priority) => (
                                        <label key={priority} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value={priority}
                                                checked={ticketPriority === priority}
                                                onChange={(e) => setTicketPriority(e.target.value)}
                                            />
                                            <span className="text-xs text-foreground capitalize">{priority}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Description *
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="I'm trying to process a payment but it keeps failing..."
                                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-foreground mb-2 block">
                                    Attachments (Optional)
                                </label>
                                <button className="px-3 py-2 bg-muted border border-border rounded-lg text-xs font-medium hover:bg-background transition-colors flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Attach Files
                                </button>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-border">
                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" />
                                    Submit Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
