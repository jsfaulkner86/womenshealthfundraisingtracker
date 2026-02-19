import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center max-w-md mx-auto">
      {/* Subtle abstract pipeline illustration */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-primary/30" />
          <div className="w-8 h-[2px] bg-primary/15 rounded-full" />
          <div className="w-3.5 h-3.5 rounded-full border-2 border-primary/50" />
          <div className="w-10 h-[2px] bg-primary/20 rounded-full" />
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
          <div className="w-6 h-[2px] bg-primary/15 rounded-full" />
          <div className="w-3 h-3 rounded-full border-2 border-primary/20" />
        </div>
      </div>

      <h2 className="font-display text-[26px] sm:text-[30px] font-semibold text-foreground leading-snug mb-3">
        Your pipeline, your data
      </h2>
      <p className="text-muted-foreground text-[14px] leading-relaxed mb-8 max-w-sm">
        Start by adding just one investor you're thinking about. You don't have to be "ready"—this 
        is your private space to think, track, and plan. Everything stays in your browser.
      </p>

      <Button onClick={onAdd} variant="hero" size="lg">
        <Plus className="w-4 h-4" />
        Start Your Private Pipeline
      </Button>

      <p className="text-sm text-muted-foreground mt-6 leading-relaxed max-w-xs">
        Optimized for pre-seed and seed rounds in women's health and femtech. 
        Only you can see what you enter here.
      </p>

      <p className="text-[13px] text-muted-foreground/70 mt-4 italic">
        Tip: Use initials or shorthand if you prefer an extra layer of privacy.
      </p>
    </div>
  );
}
