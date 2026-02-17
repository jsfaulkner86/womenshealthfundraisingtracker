import { ExternalLink, Newspaper } from 'lucide-react';

interface NewsSource {
  name: string;
  description: string;
  url: string;
  category: 'funding' | 'industry' | 'policy' | 'research';
}

const NEWS_SOURCES: NewsSource[] = [
  { name: "FemTech Insider", description: "Weekly newsletter covering femtech funding, launches & trends", url: "https://femtechinsider.com", category: "industry" },
  { name: "Rock Health Funding Database", description: "Track digital health funding rounds in real time", url: "https://rockhealth.com/reports", category: "funding" },
  { name: "Crunchbase – Women's Health", description: "Latest funding rounds in women's health startups", url: "https://www.crunchbase.com/hub/womens-health-companies", category: "funding" },
  { name: "MedCity News – Women's Health", description: "Breaking news on women's health innovation & deals", url: "https://medcitynews.com/tag/womens-health/", category: "industry" },
  { name: "STAT News – Reproductive Health", description: "In-depth reporting on reproductive health policy & science", url: "https://www.statnews.com/tag/reproductive-health/", category: "policy" },
  { name: "Nature – Women's Health", description: "Peer-reviewed research on sex-specific medicine", url: "https://www.nature.com/subjects/diseases#702fdc0a-0420-4b5d-89cb-4ba53d880085", category: "research" },
  { name: "Fierce Healthcare – Digital Health", description: "Industry news on digital health innovation & regulation", url: "https://www.fiercehealthcare.com/digital-health", category: "industry" },
  { name: "PitchBook – HealthTech", description: "VC deal flow data and market analysis for health tech", url: "https://pitchbook.com/news/reports", category: "funding" },
];

const CATEGORY_STYLES: Record<string, string> = {
  funding: 'bg-primary/10 text-primary',
  industry: 'bg-accent text-accent-foreground',
  policy: 'bg-destructive/10 text-destructive',
  research: 'bg-secondary text-secondary-foreground',
};

export function NewsFeed() {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-1">
        <Newspaper className="w-4 h-4 text-primary/70" />
        <h3 className="text-[15px] font-display font-semibold text-foreground">Women's Health News & Intel</h3>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed max-w-lg">
        Curated sources for tracking funding rounds, policy shifts, and research breakthroughs. Bookmark the ones most relevant to your raise.
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {NEWS_SOURCES.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card p-3 hover:shadow-sm hover:border-primary/20 transition-all duration-150 group flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {source.name}
              </p>
              <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground/80 mt-1.5 line-clamp-2 flex-1">{source.description}</p>
            <span className={`mt-2 self-start text-[10px] font-medium px-1.5 py-0.5 rounded ${CATEGORY_STYLES[source.category]}`}>
              {source.category}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
