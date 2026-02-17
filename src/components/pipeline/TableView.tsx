import { useMemo } from 'react';
import type { Investor, ViewType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';

interface TableViewProps {
  investors: Investor[];
  viewType: ViewType;
  onEdit: (investor: Investor) => void;
  onDelete: (id: string) => void;
}

export function TableView({ investors, viewType, onEdit, onDelete }: TableViewProps) {
  const filtered = useMemo(() => {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + 7);

    switch (viewType) {
      case 'follow-ups': {
        return investors
          .filter(i => i.nextActionDate && i.funnelStage !== 'Passed')
          .filter(i => new Date(i.nextActionDate) <= endOfWeek)
          .sort((a, b) => {
            const pOrder = { High: 0, Medium: 1, Low: 2 };
            if (pOrder[a.priority] !== pOrder[b.priority]) return pOrder[a.priority] - pOrder[b.priority];
            return new Date(a.nextActionDate).getTime() - new Date(b.nextActionDate).getTime();
          });
      }
      case 'femtech-fit':
        return investors
          .filter(i => i.femtechFit === 'Yes')
          .sort((a, b) => {
            const pOrder = { High: 0, Medium: 1, Low: 2 };
            return pOrder[a.priority] - pOrder[b.priority];
          });
      case 'clinical':
        return [...investors].sort((a, b) => a.evidenceStage.localeCompare(b.evidenceStage));
      case 'warm-intros':
        return investors.filter(i => i.warmIntroSource.trim().length > 0);
      default:
        return investors;
    }
  }, [investors, viewType]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No investors match this view yet.</p>
      </div>
    );
  }

  const priorityDot: Record<string, string> = {
    High: 'bg-priority-high',
    Medium: 'bg-priority-medium',
    Low: 'bg-priority-low',
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Investor</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fund</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Stage</th>
              {viewType === 'follow-ups' && (
                <>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Next Action</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Due</th>
                </>
              )}
              {viewType === 'clinical' && (
                <>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Evidence</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Regulatory</th>
                </>
              )}
              {viewType === 'warm-intros' && (
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Intro Source</th>
              )}
              {viewType === 'femtech-fit' && (
                <>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Clinical Focus</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Strategic</th>
                </>
              )}
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8">Pri</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => (
              <tr
                key={inv.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onEdit(inv)}
              >
                <td className="px-4 py-3 font-medium text-foreground">{inv.investorName || '—'}</td>
                <td className="px-4 py-3 text-muted-foreground">{inv.fundName || '—'}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {inv.funnelStage}
                  </span>
                </td>
                {viewType === 'follow-ups' && (
                  <>
                    <td className="px-4 py-3 text-foreground max-w-[200px] truncate">{inv.nextAction}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">
                      {inv.nextActionDate ? new Date(inv.nextActionDate).toLocaleDateString() : '—'}
                    </td>
                  </>
                )}
                {viewType === 'clinical' && (
                  <>
                    <td className="px-4 py-3 text-muted-foreground">{inv.evidenceStage}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inv.regulatoryStatus}</td>
                  </>
                )}
                {viewType === 'warm-intros' && (
                  <td className="px-4 py-3 text-muted-foreground">{inv.warmIntroSource}</td>
                )}
                {viewType === 'femtech-fit' && (
                  <>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{inv.clinicalFocus.join(', ') || '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{inv.strategicInterest}</td>
                  </>
                )}
                <td className="px-4 py-3">
                  <span className={cn("w-2 h-2 rounded-full inline-block", priorityDot[inv.priority])} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEdit(inv)} className="p-1 rounded hover:bg-muted">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => onDelete(inv.id)} className="p-1 rounded hover:bg-destructive/10">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
