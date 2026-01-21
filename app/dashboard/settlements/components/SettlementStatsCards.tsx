"use client";

import { Clock, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface SettlementStatsCardsProps {
  pending: number;
  processing: number;
  completed: number;
  totalNet?: number;
  isLoading?: boolean;
}

export function SettlementStatsCards({
  pending,
  processing,
  completed,
  totalNet,
  isLoading = false,
}: SettlementStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-background rounded-xl p-4 border border-border animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-20 mb-2" />
            <div className="h-6 bg-muted rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          PENDING
        </p>
        <p className="text-xl font-bold text-foreground">{pending}</p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          PROCESSING
        </p>
        <p className="text-xl font-bold text-foreground">{processing}</p>
      </div>
      <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          COMPLETED
        </p>
        <p className="text-xl font-bold text-foreground">{completed}</p>
      </div>
      {totalNet !== undefined && (
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            TOTAL NET
          </p>
          <p className="text-xl font-bold text-foreground">
            {totalNet.toLocaleString()} FCFA
          </p>
        </div>
      )}
    </div>
  );
}
