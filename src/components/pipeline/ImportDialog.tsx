import { useState, useRef } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Investor } from '@/lib/types';
import { createEmptyInvestor } from '@/lib/types';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (investors: Investor[]) => void;
}

// Flexible column name mapping
const COLUMN_MAP: Record<string, keyof Investor> = {
  'investor name': 'investorName',
  'investor': 'investorName',
  'name': 'investorName',
  'contact': 'investorName',
  'fund': 'fundName',
  'fund name': 'fundName',
  'firm': 'fundName',
  'firm name': 'fundName',
  'organization': 'fundName',
  'type': 'type',
  'investor type': 'type',
  'priority': 'priority',
  'stage': 'funnelStage',
  'funnel stage': 'funnelStage',
  'pipeline stage': 'funnelStage',
  'status': 'funnelStage',
  'femtech fit': 'femtechFit',
  'femtech': 'femtechFit',
  'healthcare focus': 'healthcareFocus',
  'check size': 'checkSizeRange',
  'check size range': 'checkSizeRange',
  'amount': 'checkSizeRange',
  'geography': 'geography',
  'location': 'geography',
  'region': 'geography',
  'timezone': 'geography',
  'warm intro': 'warmIntroSource',
  'warm intro source': 'warmIntroSource',
  'intro source': 'warmIntroSource',
  'intro path': 'introPath',
  'intro chain': 'introPath',
  'first contact': 'firstContactDate',
  'first contact date': 'firstContactDate',
  'contact date': 'firstContactDate',
  'date': 'firstContactDate',
  'next action': 'nextAction',
  'next step': 'nextAction',
  'follow up': 'nextAction',
  'next action date': 'nextActionDate',
  'follow up date': 'nextActionDate',
  'notes': 'keyNotes',
  'key notes': 'keyNotes',
  'evidence stage': 'evidenceStage',
  'evidence': 'evidenceStage',
  'regulatory status': 'regulatoryStatus',
  'regulatory': 'regulatoryStatus',
  'strategic interest': 'strategicInterest',
  'fit tag': 'femtechFitTag',
  'femtech fit tag': 'femtechFitTag',
  'clinical focus': 'clinicalFocus' as any,
  'product type': 'productType' as any,
  'stage focus': 'stageFocus' as any,
};

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',' || ch === '\t') {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string): Investor[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const fieldMap = headers.map(h => COLUMN_MAP[h] || null);

  const investors: Investor[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.every(v => !v)) continue;

    const inv = createEmptyInvestor();
    fieldMap.forEach((field, idx) => {
      if (!field || !values[idx]) return;
      const val = values[idx];
      if (field === 'clinicalFocus' || field === 'productType' || field === 'stageFocus') {
        (inv as any)[field] = val.split(/[;,]/).map((s: string) => s.trim()).filter(Boolean);
      } else {
        (inv as any)[field] = val;
      }
    });

    if (inv.investorName || inv.fundName) {
      investors.push(inv);
    }
  }
  return investors;
}

function parseJSON(text: string): Investor[] {
  const data = JSON.parse(text);
  const arr = Array.isArray(data) ? data : [data];
  return arr.map((item: any) => {
    const inv = createEmptyInvestor();
    Object.keys(item).forEach(key => {
      const mapped = COLUMN_MAP[key.toLowerCase().trim()] || (key as keyof Investor);
      if (mapped in inv) {
        (inv as any)[mapped] = item[key];
      }
    });
    if (!inv.investorName && !inv.fundName) return null;
    return inv;
  }).filter(Boolean) as Investor[];
}

export function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const [preview, setPreview] = useState<Investor[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setPreview(null);
    setError(null);
    setFileName('');
  };

  const handleFile = (file: File) => {
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        let parsed: Investor[];
        if (file.name.endsWith('.json')) {
          parsed = parseJSON(text);
        } else {
          parsed = parseCSV(text);
        }
        if (parsed.length === 0) {
          setError("No investors found. Make sure your file has a header row with columns like 'Investor Name', 'Fund', 'Type', etc.");
          setPreview(null);
        } else {
          setPreview(parsed);
        }
      } catch {
        setError("Couldn't parse that file. Please check the format and try again.");
        setPreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleConfirm = () => {
    if (preview) {
      onImport(preview);
      onOpenChange(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Import Investors</DialogTitle>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
            Upload a CSV, TSV, or JSON file. We'll match columns to your pipeline fields automatically. Your data stays in your browser.
          </p>
        </DialogHeader>

        <input
          ref={fileRef}
          type="file"
          accept=".csv,.tsv,.json,.txt"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {!preview && !error && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-muted/30 transition-all duration-200"
          >
            <Upload className="w-8 h-8 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-[14px] font-medium text-foreground">
              Drop your file here or click to browse
            </p>
            <p className="text-[12px] text-muted-foreground mt-1.5">
              Supports CSV, TSV, and JSON
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Spreadsheets
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FileJson className="w-3.5 h-3.5" /> JSON exports
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] text-destructive font-medium">{error}</p>
                <Button variant="ghost" size="sm" onClick={() => { reset(); fileRef.current?.click(); }} className="mt-2 text-[12px]">
                  Try another file
                </Button>
              </div>
            </div>
          </div>
        )}

        {preview && (
          <div className="space-y-3">
            <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-foreground">
                    Found {preview.length} investor{preview.length !== 1 ? 's' : ''} in "{fileName}"
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    They'll be added to your pipeline. You can edit any details after importing.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-40 overflow-y-auto border border-border rounded-md divide-y divide-border">
              {preview.slice(0, 10).map((inv, i) => (
                <div key={i} className="px-3 py-2 text-[12px] flex items-center justify-between">
                  <span className="font-medium text-foreground">{inv.investorName || '(unnamed)'}</span>
                  <span className="text-muted-foreground">{inv.fundName || '—'}</span>
                </div>
              ))}
              {preview.length > 10 && (
                <div className="px-3 py-2 text-[11px] text-muted-foreground text-center">
                  + {preview.length - 10} more
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mt-2">
          <div className="flex items-center justify-between w-full">
            <p className="text-[11px] text-muted-foreground italic">
              Tip: Export from Google Sheets as CSV first.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { onOpenChange(false); reset(); }}>Cancel</Button>
              {preview && (
                <Button onClick={handleConfirm}>
                  Import {preview.length} Investor{preview.length !== 1 ? 's' : ''}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
