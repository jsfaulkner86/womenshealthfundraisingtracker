import type { Investor, FunnelStage } from '@/lib/types';
import { FUNNEL_STAGE_COLORS } from '@/lib/types';
import { cn } from '@/lib/utils';
import { InvestorCard } from './InvestorCard';

interface KanbanViewProps {
  investors: Investor[];
  onEdit: (investor: Investor) => void;
  onStageChange: (id: string, stage: FunnelStage) => void;
}

const ACTIVE_STAGES: FunnelStage[] = [
  'Research', 'Intro needed', 'Intro sent', 'Meeting scheduled',
  'Meeting done', 'Diligence', 'Soft yes'
];

export function KanbanView({ investors, onEdit, onStageChange }: KanbanViewProps) {
  const passedOrHold = investors.filter(i => i.funnelStage === 'Passed' || i.funnelStage === 'On hold');

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
        {ACTIVE_STAGES.map(stage => {
          const stageInvestors = investors.filter(i => i.funnelStage === stage);
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-[80vw] sm:w-[256px] snap-start"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData('investor-id');
                if (id) onStageChange(id, stage);
              }}
            >
              <div className={cn("rounded-lg px-3 py-2.5 mb-2.5", FUNNEL_STAGE_COLORS[stage])}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground/70 uppercase tracking-wider font-body">
                    {stage}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60 tabular-nums font-body">
                    {stageInvestors.length}
                  </span>
                </div>
              </div>
              <div className="space-y-2 min-h-[60px]">
                {stageInvestors.map(inv => (
                  <InvestorCard key={inv.id} investor={inv} onClick={() => onEdit(inv)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {passedOrHold.length > 0 && (
        <div className="mt-8 pt-5 border-t border-border">
          <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3 font-body">
            Passed &amp; On Hold ({passedOrHold.length})
          </p>
          <div className="flex gap-2 flex-wrap">
            {passedOrHold.map(inv => (
              <button
                key={inv.id}
                onClick={() => onEdit(inv)}
                className="px-3 py-1.5 rounded-md bg-muted text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {inv.investorName || inv.fundName || 'Unnamed'}
                <span className="ml-1.5 opacity-50">· {inv.funnelStage}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
