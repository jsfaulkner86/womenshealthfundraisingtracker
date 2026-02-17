import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import type { Investor, InvestorType, FunnelStage, FemtechFit, HealthcareFocus, EvidenceStage, RegulatoryStatus, StrategicInterest, Priority, ClinicalFocus, ProductType, StageF } from '@/lib/types';
import { createEmptyInvestor, FUNNEL_STAGES, FIELD_HELPERS } from '@/lib/types';
import { Trash2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InvestorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor: Investor | null;
  onSave: (investor: Investor) => void;
  onDelete?: () => void;
}

function FieldLabel({ name, label }: { name: string; label: string }) {
  const helper = FIELD_HELPERS[name];
  return (
    <div className="flex items-center gap-1.5">
      <Label className="text-[13px] font-medium text-foreground">{label}</Label>
      {helper && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-muted-foreground cursor-help transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[280px] text-[12px] leading-relaxed">
            {helper}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

const MULTI_OPTIONS: Record<string, string[]> = {
  clinicalFocus: ['Fertility', 'Menopause', 'Pelvic health', 'Maternal', 'Mental health', 'Chronic disease', 'Sexual health', 'Other'],
  productType: ['App', 'Device', 'Service', 'Platform', 'Data', 'Diagnostics'],
  stageFocus: ['Pre-seed', 'Seed', 'Series A', 'Series B+'],
};

function MultiSelect({ value, options, onChange }: { value: string[]; options: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const selected = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(selected ? value.filter(v => v !== opt) : [...value, opt])}
            className={`text-[12px] px-2.5 py-1 rounded-full border transition-all duration-150 ${
              selected
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:border-foreground/25 hover:text-foreground'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function InvestorModal({ open, onOpenChange, investor, onSave, onDelete }: InvestorModalProps) {
  const [form, setForm] = useState<Investor>(createEmptyInvestor());

  useEffect(() => {
    if (open) {
      setForm(investor ?? createEmptyInvestor());
    }
  }, [open, investor]);

  const set = <K extends keyof Investor>(key: K, val: Investor[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="font-display text-xl">
            {investor ? 'Edit Investor' : 'Add Investor'}
          </DialogTitle>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
            This stays in your browser. Add as much or as little detail as feels right.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] px-6">
          <form id="investor-form" onSubmit={handleSubmit} className="space-y-5 pb-4">
            {/* Core info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <FieldLabel name="investorName" label="Investor Name" />
                <Input value={form.investorName} onChange={e => set('investorName', e.target.value)} placeholder="e.g. Jane Smith" />
              </div>
              <div className="space-y-1.5">
                <FieldLabel name="fundName" label="Fund / Firm" />
                <Input value={form.fundName} onChange={e => set('fundName', e.target.value)} placeholder="e.g. Flagship Pioneering" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <FieldLabel name="type" label="Type" />
                <Select value={form.type} onValueChange={v => set('type', v as InvestorType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(['Angel', 'Fund', 'Family Office', 'CVC', 'Grant'] as InvestorType[]).map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel name="priority" label="Priority" />
                <Select value={form.priority} onValueChange={v => set('priority', v as Priority)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(['High', 'Medium', 'Low'] as Priority[]).map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <FieldLabel name="funnelStage" label="Funnel Stage" />
                <Select value={form.funnelStage} onValueChange={v => set('funnelStage', v as FunnelStage)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FUNNEL_STAGES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Femtech / Health */}
            <div className="pt-3 border-t border-border">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3 font-body">Femtech &amp; Health Fit</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <FieldLabel name="femtechFit" label="Femtech Fit" />
                  <Select value={form.femtechFit} onValueChange={v => set('femtechFit', v as FemtechFit)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['Yes', 'No', 'Unknown'] as FemtechFit[]).map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="healthcareFocus" label="Healthcare Focus" />
                  <Select value={form.healthcareFocus} onValueChange={v => set('healthcareFocus', v as HealthcareFocus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['Payer', 'Provider', 'Employer', 'Pharma', 'Consumer', 'Multi'] as HealthcareFocus[]).map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="strategicInterest" label="Strategic Interest" />
                  <Select value={form.strategicInterest} onValueChange={v => set('strategicInterest', v as StrategicInterest)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['Employers', 'Payers', 'Health systems', 'OB/GYN groups', 'D2C only', 'Multi'] as StrategicInterest[]).map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <FieldLabel name="femtechFitTag" label="Fit Tag (short note)" />
                <Input value={form.femtechFitTag} onChange={e => set('femtechFitTag', e.target.value)} placeholder="e.g. 'Invested in Elvie, bullish on fertility'" />
              </div>
            </div>

            {/* Multi-selects */}
            <div className="pt-3 border-t border-border space-y-3.5">
              <div className="space-y-1.5">
                <FieldLabel name="stageFocus" label="Stage Focus" />
                <MultiSelect value={form.stageFocus} options={MULTI_OPTIONS.stageFocus} onChange={v => set('stageFocus', v as StageF[])} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel name="clinicalFocus" label="Clinical Focus" />
                <MultiSelect value={form.clinicalFocus} options={MULTI_OPTIONS.clinicalFocus} onChange={v => set('clinicalFocus', v as ClinicalFocus[])} />
              </div>
              <div className="space-y-1.5">
                <FieldLabel name="productType" label="Product Type" />
                <MultiSelect value={form.productType} options={MULTI_OPTIONS.productType} onChange={v => set('productType', v as ProductType[])} />
              </div>
            </div>

            {/* Evidence & Regulatory */}
            <div className="pt-3 border-t border-border">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3 font-body">Evidence &amp; Regulatory</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <FieldLabel name="evidenceStage" label="Evidence Stage" />
                  <Select value={form.evidenceStage} onValueChange={v => set('evidenceStage', v as EvidenceStage)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['Anecdotal', 'Pilot planned', 'Pilot running', 'Pilot completed', 'Published', 'Regulatory submission'] as EvidenceStage[]).map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="regulatoryStatus" label="Regulatory Status" />
                  <Select value={form.regulatoryStatus} onValueChange={v => set('regulatoryStatus', v as RegulatoryStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(['Non-medical/wellness', 'FDA exempt', '510(k) path', 'De novo', 'EU MDR class', 'Other'] as RegulatoryStatus[]).map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Logistics */}
            <div className="pt-3 border-t border-border">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3 font-body">Logistics</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <FieldLabel name="checkSizeRange" label="Check Size" />
                  <Input value={form.checkSizeRange} onChange={e => set('checkSizeRange', e.target.value)} placeholder="e.g. $100K–$500K" />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="geography" label="Geography / TZ" />
                  <Input value={form.geography} onChange={e => set('geography', e.target.value)} placeholder="e.g. US West, EU" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-1.5">
                  <FieldLabel name="warmIntroSource" label="Warm Intro Source" />
                  <Input value={form.warmIntroSource} onChange={e => set('warmIntroSource', e.target.value)} placeholder="Initials or shorthand—just for you" />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="firstContactDate" label="First Contact" />
                  <Input type="date" value={form.firstContactDate} onChange={e => set('firstContactDate', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Actions & Notes */}
            <div className="pt-3 border-t border-border">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3 font-body">Actions &amp; Notes</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <FieldLabel name="nextAction" label="Next Action" />
                  <Input value={form.nextAction} onChange={e => set('nextAction', e.target.value)} placeholder="e.g. Send deck follow-up" />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel name="nextActionDate" label="Next Action Date" />
                  <Input type="date" value={form.nextActionDate} onChange={e => set('nextActionDate', e.target.value)} />
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <FieldLabel name="keyNotes" label="Key Notes" />
                <Textarea
                  value={form.keyNotes}
                  onChange={e => set('keyNotes', e.target.value)}
                  rows={3}
                  placeholder="What matters to them? Use your own shorthand—this is just for you."
                />
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between w-full">
            {onDelete ? (
              <Button type="button" variant="ghost" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-1" /> Remove
              </Button>
            ) : <div />}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" form="investor-form">
                {investor ? 'Save Changes' : 'Add Investor'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
