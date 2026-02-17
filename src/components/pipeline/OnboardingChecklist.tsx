import { useMemo } from 'react';
import type { Investor } from '@/lib/types';
import { CheckCircle2, Circle, X, Sparkles } from 'lucide-react';

interface OnboardingChecklistProps {
  investors: Investor[];
  onDismiss: () => void;
}

export function OnboardingChecklist({ investors, onDismiss }: OnboardingChecklistProps) {
  const checks = useMemo(() => {
    const hasEnough = investors.length >= 3;
    const taggedFemtech = investors.filter(i => i.femtechFit !== 'Unknown').length >= 3;
    const taggedEvidence = investors.filter(i => i.evidenceStage !== 'Anecdotal').length >= 1;
    const hasActions = investors.filter(i => i.nextActionDate).length >= 3;
    const allDone = hasEnough && taggedFemtech && taggedEvidence && hasActions;

    return { hasEnough, taggedFemtech, taggedEvidence, hasActions, allDone };
  }, [investors]);

  const items = [
    { done: checks.hasEnough, label: "Add 3–5 investors you're already talking to" },
    { done: checks.taggedFemtech, label: "Tag each with Femtech Fit and Evidence Stage" },
    { done: checks.taggedEvidence, label: "Set at least one investor's evidence stage" },
    { done: checks.hasActions, label: "Set 3+ next action dates for this week" },
  ];

  const doneCount = items.filter(i => i.done).length;

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[13px] font-semibold text-foreground">
            {checks.allDone ? '🎉 Your fundraising system is live' : 'Quick setup — 5 minutes'}
          </span>
          <span className="text-[11px] text-muted-foreground">({doneCount}/{items.length})</span>
        </div>
        <button onClick={onDismiss} className="p-1 rounded hover:bg-muted transition-colors">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {checks.allDone ? (
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          You've got a working pipeline. From here, check your "This Week" view daily and keep stages honest. You've got this.
        </p>
      ) : (
        <div className="space-y-1.5">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
              )}
              <span className={`text-[12px] ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
