import { KNOWN_FEMTECH_INVESTORS, type KnownInvestor } from '@/lib/types';
import { ExternalLink, Rss } from 'lucide-react';

interface InvestorFeedProps {
  onAddFromFeed?: (investor: KnownInvestor) => void;
}

export function InvestorFeed({ onAddFromFeed }: InvestorFeedProps) {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-1">
        <Rss className="w-4 h-4 text-primary/70" />
        <h3 className="text-[15px] font-display font-semibold text-foreground">Known Women's Health Investors</h3>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed max-w-lg">
        Curated from public sources. Click to add any to your private pipeline. This list is stored in your browser — no external calls are made.
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {KNOWN_FEMTECH_INVESTORS.map((inv, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border bg-card p-3 hover:shadow-sm transition-all duration-150 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-foreground truncate">{inv.fund}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{inv.stages}</p>
              </div>
              <a
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3 text-muted-foreground/50" />
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground/80 mt-1.5 line-clamp-2">{inv.focus}</p>
            {onAddFromFeed && (
              <button
                onClick={() => onAddFromFeed(inv)}
                className="mt-2 text-[11px] text-primary font-medium hover:text-primary/80 transition-colors"
              >
                + Add to my pipeline
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground/50 mt-3 italic">
        Data sourced from public fund profiles and industry reports. Verify current status before outreach.
      </p>
    </div>
  );
}
