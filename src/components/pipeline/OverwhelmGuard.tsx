import { useMemo } from 'react';
import type { Investor } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface OverwhelmGuardProps {
  investors: Investor[];
}

export function OverwhelmGuard({ investors }: OverwhelmGuardProps) {
  const show = useMemo(() => {
    const active = investors.filter(i => !['Passed', 'On hold'].includes(i.funnelStage));
    return active.length >= 40;
  }, [investors]);

  if (!show) return null;

  const activeCount = investors.filter(i => !['Passed', 'On hold'].includes(i.funnelStage)).length;

  return (
    <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-muted/60 border border-border mb-4">
      <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[13px] text-foreground font-medium">
          {activeCount} active investors — consider focusing
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
          Most pre-seed rounds close with 30–50 targeted investors. Consider archiving low-fit names 
          or marking some as "practice" to keep your pipeline manageable and your energy focused.
        </p>
      </div>
    </div>
  );
}
