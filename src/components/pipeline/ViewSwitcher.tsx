import type { ViewType } from '@/lib/types';
import { VIEW_INFO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GitBranch, CalendarClock, HeartPulse, Stethoscope, Handshake } from 'lucide-react';

const VIEW_ICONS: Record<ViewType, React.ReactNode> = {
  'kanban': <GitBranch className="w-[15px] h-[15px]" />,
  'follow-ups': <CalendarClock className="w-[15px] h-[15px]" />,
  'femtech-fit': <HeartPulse className="w-[15px] h-[15px]" />,
  'clinical': <Stethoscope className="w-[15px] h-[15px]" />,
  'warm-intros': <Handshake className="w-[15px] h-[15px]" />,
};

interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  investorCount: number;
}

export function ViewSwitcher({ currentView, onViewChange, investorCount }: ViewSwitcherProps) {
  const views = Object.entries(VIEW_INFO) as [ViewType, typeof VIEW_INFO[ViewType]][];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 -mx-1 px-1">
      {views.map(([key, info]) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-150",
            currentView === key
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
          )}
        >
          {VIEW_ICONS[key]}
          {info.label}
        </button>
      ))}
      {investorCount > 0 && (
        <span className="text-xs text-muted-foreground/70 ml-3 tabular-nums font-body">
          {investorCount} investor{investorCount !== 1 ? 's' : ''} tracked
        </span>
      )}
    </div>
  );
}
