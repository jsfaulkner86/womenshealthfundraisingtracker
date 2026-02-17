import { useState, useMemo } from 'react';
import { useInvestors, useWeeklyReflection, useOnboarding, useStatsSnapshot } from '@/hooks/useInvestors';
import type { ViewType, Investor, KnownInvestor } from '@/lib/types';
import { VIEW_INFO, createEmptyInvestor, exportToJSON, exportToCSV, downloadFile } from '@/lib/types';
import { ViewSwitcher } from '@/components/pipeline/ViewSwitcher';
import { KanbanView } from '@/components/pipeline/KanbanView';
import { TableView } from '@/components/pipeline/TableView';
import { InvestorModal } from '@/components/pipeline/InvestorModal';
import { PrivacyBanner } from '@/components/pipeline/PrivacyBanner';
import { EmptyState } from '@/components/pipeline/EmptyState';
import { StatsBar } from '@/components/pipeline/StatsBar';
import { OnboardingChecklist } from '@/components/pipeline/OnboardingChecklist';
import { SmartThisWeek } from '@/components/pipeline/SmartThisWeek';
import { InvestorFeed } from '@/components/pipeline/InvestorFeed';
import { NewsFeed } from '@/components/pipeline/NewsFeed';
import { OverwhelmGuard } from '@/components/pipeline/OverwhelmGuard';
import { ImportDialog } from '@/components/pipeline/ImportDialog';
import { Plus, ShieldCheck, Download, Upload, CloudOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MOTIVATIONAL_LINES = [
  "Every great raise starts with one conversation.",
  "You're building something investors will fight over.",
  "The next yes is closer than you think.",
  "Women's health deserves world-class capital.",
  "Your pipeline is your power. Own it.",
  "One warm intro can change everything.",
  "Fundraising is a skill — and you're sharpening it.",
  "The best founders track relentlessly. You're one of them.",
];

const Index = () => {
  const { investors, addInvestor, updateInvestor, deleteInvestor, updateFunnelStage } = useInvestors();
  const { reflection, setReflection } = useWeeklyReflection();
  const { dismissed: onboardingDismissed, dismiss: dismissOnboarding } = useOnboarding();
  const { snapshot } = useStatsSnapshot();
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const motivation = useMemo(() => 
    MOTIVATIONAL_LINES[Math.floor(Math.random() * MOTIVATIONAL_LINES.length)], 
  []);

  const handleImport = (imported: Investor[]) => {
    imported.forEach(inv => addInvestor(inv));
  };
  const handleEdit = (investor: Investor) => {
    setEditingInvestor(investor);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingInvestor(null);
    setModalOpen(true);
  };

  const handleSave = (investor: Investor) => {
    if (editingInvestor) {
      updateInvestor(investor);
    } else {
      addInvestor(investor);
    }
    setModalOpen(false);
    setEditingInvestor(null);
  };

  const handleAddFromFeed = (known: KnownInvestor) => {
    const inv = createEmptyInvestor();
    inv.fundName = known.fund;
    inv.investorName = known.name;
    inv.femtechFit = 'Yes';
    inv.funnelStage = 'Research';
    addInvestor(inv);
  };

  const handleExport = (format: 'json' | 'csv') => {
    const date = new Date().toISOString().slice(0, 10);
    if (format === 'json') {
      downloadFile(exportToJSON(investors), `pipeline-${date}.json`, 'application/json');
    } else {
      downloadFile(exportToCSV(investors), `pipeline-${date}.csv`, 'text/csv');
    }
  };

  const viewInfo = VIEW_INFO[currentView];
  const showOnboarding = investors.length > 0 && investors.length < 10 && !onboardingDismissed;

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-shift" />

      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[22px] sm:text-2xl font-display font-semibold text-foreground leading-tight">
                  Women's Health Fundraising Tracker
                </h1>
                <Sparkles className="w-5 h-5 text-accent animate-pulse-soft" />
              </div>
              <p className="text-[13px] text-muted-foreground mt-1.5 font-body flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                {motivation}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground mr-1">
                <CloudOff className="w-3 h-3" />
                <span>Auto-saved locally</span>
              </div>

              <button
                onClick={() => setShowPrivacy(true)}
                className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 group"
              >
                <ShieldCheck className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="hidden sm:inline">Privacy</span>
              </button>

              {investors.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem onClick={() => handleExport('json')}>
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      Export as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button variant="outline" size="sm" onClick={() => setShowImport(true)}>
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>

              <Button onClick={handleAdd} size="sm" className="group">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden sm:inline">Add Investor</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* View Switcher & Content */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-5 pb-12">
        {/* Stats bar */}
        <StatsBar investors={investors} lastSnapshot={snapshot} />

        {investors.length > 0 && <div className="mt-4" />}

        <ViewSwitcher
          currentView={currentView}
          onViewChange={setCurrentView}
          investorCount={investors.length}
        />

        <p className="text-[13px] text-muted-foreground mt-3 mb-5 max-w-xl leading-relaxed">
          {viewInfo.description}
        </p>

        {/* Onboarding checklist */}
        {showOnboarding && (
          <OnboardingChecklist investors={investors} onDismiss={dismissOnboarding} />
        )}

        {/* Overwhelm guard */}
        <OverwhelmGuard investors={investors} />

        {/* Main content */}
        {investors.length === 0 ? (
          <EmptyState onAdd={handleAdd} />
        ) : currentView === 'kanban' ? (
          <KanbanView
            investors={investors}
            onEdit={handleEdit}
            onStageChange={updateFunnelStage}
          />
        ) : currentView === 'follow-ups' ? (
          <SmartThisWeek
            investors={investors}
            onEdit={handleEdit}
            reflection={reflection}
            onReflectionChange={setReflection}
          />
        ) : (
          <TableView
            investors={investors}
            viewType={currentView}
            onEdit={handleEdit}
            onDelete={deleteInvestor}
          />
        )}

        {/* Investor feed */}
        <InvestorFeed onAddFromFeed={handleAddFromFeed} />

        {/* News feed */}
        <NewsFeed />
      </div>

      {/* Modals */}
      <InvestorModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        investor={editingInvestor}
        onSave={handleSave}
        onDelete={editingInvestor ? () => { deleteInvestor(editingInvestor.id); setModalOpen(false); } : undefined}
      />
      <PrivacyBanner open={showPrivacy} onOpenChange={setShowPrivacy} />
      <ImportDialog open={showImport} onOpenChange={setShowImport} onImport={handleImport} />
    </div>
  );
};

export default Index;
