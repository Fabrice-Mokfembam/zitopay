"use client";

import { useState } from "react";
import {
    Upload,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    FileText,
    Loader2,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { useUploadKYCDocument, useListKYCDocuments } from "@/features/files/hooks";
import type { DocumentType } from "@/features/files/types";
import type { KYCStatus } from "@/features/merchants/types/index";

interface KYBUploadSectionProps {
    merchantId: string;
    kycStatus: KYCStatus;
    onSubmitKYB: () => void;
    isSubmitting: boolean;
}

const PREDEFINED_DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
    { value: "BUSINESS_REGISTRATION", label: "Business Registration Certificate" },
    { value: "TAX_ID", label: "Tax Identification Number (TIN)" },
    { value: "DIRECTOR_ID", label: "Director's ID Card" },
    { value: "PROOF_OF_ADDRESS", label: "Proof of Business Address" },
];

export default function KYBUploadSection({
    kycStatus,
    onSubmitKYB,
    isSubmitting,
}: KYBUploadSectionProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedDocType, setSelectedDocType] = useState<string>("");
    const [customDocType, setCustomDocType] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadKYCMutation = useUploadKYCDocument((progress) => {
        setUploadProgress(progress);
    });

    // Fetch existing uploaded documents
    const { data: documentsData, refetch: refetchDocuments } = useListKYCDocuments();
    const uploadedDocuments = documentsData?.documents || [];

    const isCustomType = selectedDocType === "CUSTOM";
    const canUpload = selectedFile && (isCustomType ? customDocType.trim() !== "" : selectedDocType !== "");
    const canSubmitKYB = uploadedDocuments.length > 0 && kycStatus === "NOT_SUBMITTED";

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!canUpload || !selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Determine the document type to send
            const docType = isCustomType ? customDocType.trim() : selectedDocType;

            await uploadKYCMutation.mutateAsync({
                file: selectedFile,
                documentType: docType as DocumentType,
                environment: "sandbox",
            });

            toast.success("Document uploaded successfully!", {
                description: `${isCustomType ? customDocType : PREDEFINED_DOCUMENT_TYPES.find(d => d.value === selectedDocType)?.label} has been uploaded.`,
            });

            // Reset form
            setSelectedFile(null);
            setSelectedDocType("");
            setCustomDocType("");
            setUploadProgress(0);

            // Refetch documents list
            await refetchDocuments();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Upload failed";
            toast.error("Upload failed", {
                description: errorMessage,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="space-y-4">
            {/* Status Banner */}
            {kycStatus === "NOT_SUBMITTED" && (
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                KYB Verification Required
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                Upload your business documents to verify your business. You can upload as many
                                documents as needed. At least one document is required before submitting for review.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {kycStatus === "PENDING" && (
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                                KYB Under Review
                            </h4>
                            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                                Your documents are being reviewed by our compliance team. This typically takes 2-3
                                business days.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {kycStatus === "APPROVED" && (
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                                KYB Approved ✅
                            </h4>
                            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                Your business has been verified! You can now request production access.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {kycStatus === "REJECTED" && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
                                KYB Rejected
                            </h4>
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                Your documents were rejected. Please review the feedback and resubmit.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Section */}
            {(kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED" || kycStatus === "PENDING") && (
                <div className="bg-background border border-border rounded-lg p-6 space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">
                        {kycStatus === "PENDING" ? "Upload Additional Document" : "Upload Document"}
                    </h4>

                    {/* Document Type Selection */}
                    <div>
                        <label className="text-xs font-medium text-foreground mb-2 block">
                            Document Type *
                        </label>
                        <select
                            value={selectedDocType}
                            onChange={(e) => {
                                setSelectedDocType(e.target.value);
                                if (e.target.value !== "CUSTOM") {
                                    setCustomDocType("");
                                }
                            }}
                            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                        >
                            <option value="">Select document type...</option>
                            {PREDEFINED_DOCUMENT_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                            <option value="CUSTOM">Other (Specify below)</option>
                        </select>
                    </div>

                    {/* Custom Document Type Input */}
                    {isCustomType && (
                        <div>
                            <label className="text-xs font-medium text-foreground mb-2 block">
                                Custom Document Type *
                            </label>
                            <input
                                type="text"
                                value={customDocType}
                                onChange={(e) => setCustomDocType(e.target.value)}
                                placeholder="e.g., Bank Statement, Utility Bill, etc."
                                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm"
                            />
                        </div>
                    )}

                    {/* File Upload */}
                    <div>
                        <label className="text-xs font-medium text-foreground mb-2 block">
                            Select File *
                        </label>

                        {!selectedFile ? (
                            <label className="block">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors">
                                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">
                                        Click to upload
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        PDF, JPG, or PNG (max 10MB)
                                    </p>
                                </div>
                            </label>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                                        <span className="text-xs font-medium text-foreground truncate">
                                            {selectedFile.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground shrink-0">
                                            ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="p-1 hover:bg-background rounded transition-colors shrink-0"
                                        disabled={isUploading}
                                    >
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                {isUploading && (
                                    <div className="space-y-2">
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground text-center">
                                            Uploading... {uploadProgress}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={!canUpload || isUploading}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${canUpload && !isUploading
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                    >
                        {isUploading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                            </span>
                        ) : (
                            "Upload Document"
                        )}
                    </button>
                </div>
            )}

            {/* Uploaded Documents List (Draft) */}
            {(kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED") && uploadedDocuments.length > 0 && (
                <div className="bg-background border border-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">
                            Uploaded Documents ({uploadedDocuments.length})
                        </h4>
                    </div>

                    <div className="space-y-2">
                        {uploadedDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between bg-muted rounded-lg p-3"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {doc.documentType.replace(/_/g, " ")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {doc.filename}
                                        </p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Submit KYB Button */}
            {(kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED") && (
                <div className="space-y-2">
                    <button
                        onClick={onSubmitKYB}
                        disabled={!canSubmitKYB || isSubmitting}
                        className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${canSubmitKYB && !isSubmitting
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                            </span>
                        ) : (
                            "Submit for KYB Review"
                        )}
                    </button>

                    {uploadedDocuments.length === 0 && (
                        <p className="text-xs text-center text-muted-foreground">
                            Please upload at least one document before submitting
                        </p>
                    )}

                    {uploadedDocuments.length > 0 && (
                        <p className="text-xs text-center text-green-600 dark:text-green-400">
                            ✓ {uploadedDocuments.length} document{uploadedDocuments.length > 1 ? "s" : ""} ready for review
                        </p>
                    )}
                </div>
            )}

            {/* View Documents (for approved/pending status) */}
            {(kycStatus === "APPROVED" || kycStatus === "PENDING") && uploadedDocuments.length > 0 && (
                <div className="bg-background border border-border rounded-lg p-6 space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">
                        Submitted Documents ({uploadedDocuments.length})
                    </h4>
                    <div className="space-y-2">
                        {uploadedDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between bg-muted rounded-lg p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {doc.documentType.replace(/_/g, " ")}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{doc.filename}</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
