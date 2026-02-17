import { useState } from 'react';
import { useInvestors } from '@/hooks/useInvestors';
import type { ViewType, Investor } from '@/lib/types';
import { VIEW_INFO } from '@/lib/types';
import { ViewSwitcher } from '@/components/pipeline/ViewSwitcher';
import { KanbanView } from '@/components/pipeline/KanbanView';
import { TableView } from '@/components/pipeline/TableView';
import { InvestorModal } from '@/components/pipeline/InvestorModal';
import { PrivacyBanner } from '@/components/pipeline/PrivacyBanner';
import { EmptyState } from '@/components/pipeline/EmptyState';
import { Plus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { investors, addInvestor, updateInvestor, deleteInvestor, updateFunnelStage } = useInvestors();
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);

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

  const viewInfo = VIEW_INFO[currentView];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] sm:text-2xl font-display font-semibold text-foreground leading-tight">
                Women's Health Fundraising Tracker
              </h1>
              <p className="text-[13px] text-muted-foreground mt-1 font-body">
                A private command center for femtech founders raising capital
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPrivacy(true)}
                className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 group"
              >
                <ShieldCheck className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="hidden sm:inline">Privacy</span>
              </button>
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4" />
                Add Investor
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* View Switcher & Content */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-5 pb-12">
        <ViewSwitcher
          currentView={currentView}
          onViewChange={setCurrentView}
          investorCount={investors.length}
        />

        <p className="text-[13px] text-muted-foreground mt-3 mb-6 max-w-xl leading-relaxed">
          {viewInfo.description}
        </p>

        {investors.length === 0 ? (
          <EmptyState onAdd={handleAdd} />
        ) : currentView === 'kanban' ? (
          <KanbanView
            investors={investors}
            onEdit={handleEdit}
            onStageChange={updateFunnelStage}
          />
        ) : (
          <TableView
            investors={investors}
            viewType={currentView}
            onEdit={handleEdit}
            onDelete={deleteInvestor}
          />
        )}
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
    </div>
  );
};

export default Index;
