"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTicketDetails, useReplyTicket } from "@/features/support/queries";
import { ArrowLeft, Send, Paperclip, Clock, CheckCircle, AlertCircle, User, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TicketDetailPage() {
    const params = useParams();
    const router = useRouter();
    const ticketId = params.id as string;
    const { data, isLoading, error } = useTicketDetails(ticketId);
    const replyMutation = useReplyTicket();

    const [replyMessage, setReplyMessage] = useState("");

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-6">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    Error loading ticket details. Please try again later.
                </div>
                <button
                    onClick={() => router.back()}
                    className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    const { ticket, messages } = data.data;

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        replyMutation.mutate(
            { ticketId, data: { message: replyMessage } },
            {
                onSuccess: () => {
                    setReplyMessage("");
                }
            }
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-blue-100 text-blue-700';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700';
            case 'WAITING_FOR_CUSTOMER': return 'bg-orange-100 text-orange-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            case 'CLOSED': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Support
                </button>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-background p-6 rounded-xl border border-border">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold", getStatusColor(ticket.status))}>
                                {ticket.status.replace(/_/g, " ")}
                            </span>
                            <span className="text-xs text-muted-foreground">#{ticket.ticketNumber}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">{ticket.subject}</h1>
                        <p className="text-sm text-muted-foreground mt-1">category: <span className="font-medium text-foreground">{ticket.category}</span></p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "px-3 py-1 rounded-lg text-sm font-medium border",
                            ticket.priority === 'URGENT' ? "bg-red-50 text-red-700 border-red-200" :
                                ticket.priority === 'HIGH' ? "bg-orange-50 text-orange-700 border-orange-200" :
                                    "bg-gray-50 text-gray-700 border-gray-200"
                        )}>
                            Priority: {ticket.priority}
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages Thread */}
            <div className="space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex gap-4 max-w-3xl",
                            msg.senderType === 'MERCHANT' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            msg.senderType === 'MERCHANT' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                        )}>
                            {msg.senderType === 'MERCHANT' ? <User className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                        </div>

                        <div className={cn(
                            "p-4 rounded-2xl shadow-sm border",
                            msg.senderType === 'MERCHANT'
                                ? "bg-orange-50/50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/30"
                                : "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                        )}>
                            <div className="flex items-center justify-between gap-4 mb-2">
                                <span className="text-xs font-bold text-foreground">
                                    {msg.senderType === 'MERCHANT' ? 'You' : 'ZitoPay Support'}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                                </span>
                            </div>
                            <div className="text-sm text-foreground whitespace-pre-wrap">
                                {msg.message}
                            </div>
                            {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                                    {msg.attachments.map((url, idx) => (
                                        <a
                                            key={idx}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
                                        >
                                            <Paperclip className="w-3 h-3" />
                                            Attachment {idx + 1}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Input */}
            {ticket.status !== 'CLOSED' && (
                <div className="bg-background rounded-xl border border-border p-4 sticky bottom-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Reply to Ticket</h3>
                    <form onSubmit={handleReply}>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Type your message here..."
                            rows={3}
                            className="w-full bg-muted border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        />
                        <div className="flex items-center justify-between mt-3">
                            <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4" /> Attach File
                            </button>
                            <button
                                type="submit"
                                disabled={!replyMessage.trim() || replyMutation.isPending}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {replyMutation.isPending ? "Sending..." : <>Send Reply <Send className="w-4 h-4" /></>}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {ticket.status === 'CLOSED' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-500 text-sm">
                    This ticket is closed. Please create a new ticket.
                </div>
            )}
        </div>
    );
}
