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
import { Plus, Shield } from 'lucide-react';
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
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
                Fundraising Tracker
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Privacy-first investor pipeline for femtech founders
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivacy(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Privacy</span>
              </Button>
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Investor
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* View Switcher */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <ViewSwitcher
          currentView={currentView}
          onViewChange={setCurrentView}
          investorCount={investors.length}
        />

        {/* View description */}
        <p className="text-sm text-muted-foreground mt-3 mb-5 max-w-2xl">
          {viewInfo.description}
        </p>

        {/* Content */}
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
