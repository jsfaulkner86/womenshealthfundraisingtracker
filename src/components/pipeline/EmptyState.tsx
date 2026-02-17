import { Button } from '@/components/ui/button';
import { Plus, Shield } from 'lucide-react';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6">
        <Shield className="w-7 h-7 text-primary" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Your pipeline, your data
      </h2>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        Everything you track here stays in your browser. No accounts, no servers, no data sharing. 
        Built for femtech founders who care about privacy as much as fundraising.
      </p>
      <Button onClick={onAdd} size="lg">
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Investor
      </Button>
      <p className="text-xs text-muted-foreground mt-4">
        Optimized for pre-seed and seed rounds in women's health
      </p>
    </div>
  );
}
