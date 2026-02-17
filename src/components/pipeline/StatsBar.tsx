import { useMemo } from 'react';
import type { Investor } from '@/lib/types';
import { Users, MessageSquare, Handshake, CalendarCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { StatsSnapshot } from '@/hooks/useInvestors';

interface StatsBarProps {
  investors: Investor[];
  lastSnapshot: StatsSnapshot | null;
}

export function StatsBar({ investors, lastSnapshot }: StatsBarProps) {
  const stats = useMemo(() => {
    const active = investors.filter(i => !['Passed', 'On hold'].includes(i.funnelStage));
    const warm = investors.filter(i => i.warmIntroSource.trim().length > 0);
    const meetings = investors.filter(i => ['Meeting scheduled', 'Meeting done'].includes(i.funnelStage));
    const femtechYes = investors.filter(i => i.femtechFit === 'Yes');

    const meetingsTrend = lastSnapshot 
      ? meetings.length - lastSnapshot.meetingsScheduled 
      : 0;

    return {
      total: investors.length,
      active: active.length,
      warm: warm.length,
      cold: investors.length - warm.length,
      meetings: meetings.length,
      femtechFit: femtechYes.length,
      meetingsTrend,
    };
  }, [investors, lastSnapshot]);

  if (investors.length === 0) return null;

  const items = [
    { label: 'Total', value: stats.total, icon: Users },
    { label: 'Active', value: stats.active, icon: MessageSquare },
    { label: 'Warm', value: stats.warm, icon: Handshake },
    { label: 'Meetings', value: stats.meetings, icon: CalendarCheck, trend: stats.meetingsTrend },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border min-w-fit">
          <item.icon className="w-3.5 h-3.5 text-muted-foreground/60" />
          <span className="text-[13px] font-semibold text-foreground tabular-nums">{item.value}</span>
          <span className="text-[11px] text-muted-foreground">{item.label}</span>
          {item.trend !== undefined && item.trend !== 0 && (
            <span className={`flex items-center text-[10px] ${item.trend > 0 ? 'text-primary' : 'text-destructive'}`}>
              {item.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </span>
          )}
        </div>
      ))}

      {stats.meetingsTrend > 0 && (
        <div className="flex items-center px-3 py-2 text-[11px] text-primary italic">
          More meetings this week than last — nice work.
        </div>
      )}
    </div>
  );
}
