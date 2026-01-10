export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface SystemStats {
  totalMerchants: number;
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
}
