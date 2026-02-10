export interface Merchant {
  id: string;
  businessName: string;
  email: string;
  phoneNumber?: string;
  status: "active" | "inactive" | "suspended";
  feePayer: 'PAYER' | 'MERCHANT';
  createdAt: string;
  updatedAt: string;
}
