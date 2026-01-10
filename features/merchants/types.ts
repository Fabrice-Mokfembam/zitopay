export interface Merchant {
  id: string;
  businessName: string;
  email: string;
  phoneNumber?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}
