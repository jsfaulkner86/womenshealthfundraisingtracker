import type { ViewType } from '@/lib/types';
import { VIEW_INFO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Kanban, CalendarClock, Heart, Microscope, Users } from 'lucide-react';

const VIEW_ICONS: Record<ViewType, React.ReactNode> = {
  'kanban': <Kanban className="w-4 h-4" />,
  'follow-ups': <CalendarClock className="w-4 h-4" />,
  'femtech-fit': <Heart className="w-4 h-4" />,
  'clinical': <Microscope className="w-4 h-4" />,
  'warm-intros': <Users className="w-4 h-4" />,
};

interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  investorCount: number;
}

export function ViewSwitcher({ currentView, onViewChange, investorCount }: ViewSwitcherProps) {
  const views = Object.entries(VIEW_INFO) as [ViewType, typeof VIEW_INFO[ViewType]][];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {views.map(([key, info]) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
            currentView === key
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {VIEW_ICONS[key]}
          {info.label}
        </button>
      ))}
      {investorCount > 0 && (
        <span className="text-xs text-muted-foreground ml-2 tabular-nums">
          {investorCount} investor{investorCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
