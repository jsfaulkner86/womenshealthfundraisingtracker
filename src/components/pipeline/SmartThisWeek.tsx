import { useMemo } from 'react';
import type { Investor } from '@/lib/types';
import { AlertCircle, Star, Send, MessageCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface SmartThisWeekProps {
  investors: Investor[];
  onEdit: (investor: Investor) => void;
  reflection: string;
  onReflectionChange: (text: string) => void;
}

export function SmartThisWeek({ investors, onEdit, reflection, onReflectionChange }: SmartThisWeekProps) {
  const { overdue, focusInvestors, nudge } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const overdue = investors
      .filter(i => i.nextActionDate && new Date(i.nextActionDate) < now && i.funnelStage !== 'Passed')
      .sort((a, b) => new Date(a.nextActionDate).getTime() - new Date(b.nextActionDate).getTime());

    const pOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
    const stageOrder: Record<string, number> = {
      'Diligence': 0, 'Meeting done': 1, 'Meeting scheduled': 2, 'Soft yes': 3,
      'Intro sent': 4, 'Intro needed': 5, 'Research': 6,
    };

    const active = investors
      .filter(i => !['Passed', 'On hold'].includes(i.funnelStage))
      .sort((a, b) => {
        const pDiff = (pOrder[a.priority] ?? 2) - (pOrder[b.priority] ?? 2);
        if (pDiff !== 0) return pDiff;
        return (stageOrder[a.funnelStage] ?? 9) - (stageOrder[b.funnelStage] ?? 9);
      });

    const focusInvestors = active.slice(0, 3);

    const needUpdate = investors.filter(i =>
      ['Meeting done', 'Diligence'].includes(i.funnelStage) &&
      i.nextActionDate &&
      new Date(i.nextActionDate) <= new Date(now.getTime() + 7 * 86400000)
    );

    let nudge = '';
    if (needUpdate.length > 0) {
      nudge = `Consider sending a brief update to ${needUpdate.length} investor${needUpdate.length > 1 ? 's' : ''} this week.`;
    } else if (overdue.length > 0) {
      nudge = `You have ${overdue.length} overdue follow-up${overdue.length > 1 ? 's' : ''}. Start with the highest-priority one.`;
    }

    return { overdue, focusInvestors, nudge };
  }, [investors]);

  const priorityDot: Record<string, string> = {
    High: 'bg-priority-high',
    Medium: 'bg-priority-medium',
    Low: 'bg-priority-low',
  };

  return (
    <div className="space-y-5">
      {/* Nudge */}
      {nudge && (
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-secondary/60 border border-border">
          <Send className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-foreground leading-relaxed">{nudge}</p>
        </div>
      )}

      {/* Overdue */}
      {overdue.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-destructive/80 font-body">
              Overdue ({overdue.length})
            </h3>
          </div>
          <div className="space-y-1">
            {overdue.map(inv => (
              <button
                key={inv.id}
                onClick={() => onEdit(inv)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-left"
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[inv.priority]}`} />
                <span className="text-[13px] font-medium text-foreground truncate">{inv.investorName || inv.fundName}</span>
                <span className="text-[11px] text-muted-foreground truncate ml-auto">{inv.nextAction}</span>
                <span className="text-[11px] text-destructive/70 tabular-nums flex-shrink-0">
                  {new Date(inv.nextActionDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Focus investors */}
      {focusInvestors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Star className="w-3.5 h-3.5 text-primary" />
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground font-body">
              Focus This Week
            </h3>
          </div>
          <div className="space-y-1">
            {focusInvestors.map(inv => (
              <button
                key={inv.id}
                onClick={() => onEdit(inv)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-left"
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[inv.priority]}`} />
                <span className="text-[13px] font-medium text-foreground truncate">{inv.investorName || inv.fundName}</span>
                <span className="text-[11px] text-muted-foreground">{inv.funnelStage}</span>
                {inv.femtechFit === 'Yes' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground ml-auto">Femtech ✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weekly reflection */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
          <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground font-body">
            End-of-Week Reflection
          </h3>
        </div>
        <Textarea
          value={reflection}
          onChange={(e) => onReflectionChange(e.target.value)}
          rows={3}
          placeholder="What did you learn about your story or investors this week? Just for you."
          className="text-[13px]"
        />
      </div>
    </div>
  );
}
