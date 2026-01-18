export interface DashboardStat {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    status?: string;
    subtitle?: string;
    hasAction?: boolean;
}

export type DashboardStatsResponse = DashboardStat[];

export interface QuickStat {
    label: string;
    value: string;
    subtitle: string;
}

export type DashboardQuickStatsResponse = QuickStat[];

export interface RecentTransaction {
    date: string;
    time: string;
    id: string;
    status: 'success' | 'pending' | 'failed';
    amount: string;
    gateway: string;
}

export type RecentTransactionsResponse = RecentTransaction[];

export interface ReportError {
    error: string;
    message: string;
}
