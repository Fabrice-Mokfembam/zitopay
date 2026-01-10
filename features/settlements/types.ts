export interface Settlement {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  settlementDate: string;
  createdAt: string;
  updatedAt: string;
}
