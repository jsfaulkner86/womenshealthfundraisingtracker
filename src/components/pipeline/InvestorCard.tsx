import type { Investor } from '@/lib/types';
import { cn } from '@/lib/utils';

interface InvestorCardProps {
  investor: Investor;
  onClick: () => void;
}

export function InvestorCard({ investor, onClick }: InvestorCardProps) {
  const priorityDot: Record<string, string> = {
    High: 'bg-priority-high',
    Medium: 'bg-priority-medium',
    Low: 'bg-priority-low',
  };

  return (
    <div
      role="button"
      tabIndex={0}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('investor-id', investor.id)}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="bg-card rounded-lg border border-border p-3.5 sm:p-3 cursor-pointer hover:shadow-md hover:border-border/80 active:scale-[0.98] transition-all duration-150 group touch-manipulation select-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-foreground truncate leading-snug">
            {investor.investorName || 'Unnamed'}
          </p>
          {investor.fundName && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{investor.fundName}</p>
          )}
        </div>
        <span className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1", priorityDot[investor.priority])} />
      </div>

      <div className="flex flex-wrap gap-1 mt-2.5">
        {investor.femtechFit === 'Yes' && (
          <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
            Femtech ✓
          </span>
        )}
        {investor.type && (
          <span className="inline-flex text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {investor.type}
          </span>
        )}
        {investor.checkSizeRange && (
          <span className="inline-flex text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground tabular-nums">
            {investor.checkSizeRange}
          </span>
        )}
      </div>

      {investor.nextAction && (
        <p className="text-[11px] text-muted-foreground mt-2 truncate leading-relaxed">
          → {investor.nextAction}
        </p>
      )}
    </div>
  );
}
