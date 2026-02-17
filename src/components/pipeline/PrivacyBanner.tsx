import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Shield, Lock, Download, Trash2, Eye } from 'lucide-react';

interface PrivacyBannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyBanner({ open, onOpenChange }: PrivacyBannerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Control
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-foreground">
          <p className="text-muted-foreground">
            This tracker is built on a simple principle: <strong>your fundraising data belongs to you</strong>. 
            Treat it with healthcare-grade respect.
          </p>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">100% Local Storage</p>
                <p className="text-muted-foreground text-xs">All data lives in your browser's local storage. Nothing is sent to any server, ever.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Eye className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">No Cross-Founder Data</p>
                <p className="text-muted-foreground text-xs">There is no shared database. No analytics. No tracking. Your pipeline is invisible to everyone but you.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Download className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Export Anytime</p>
                <p className="text-muted-foreground text-xs">You can copy your data to Notion, Sheets, or any other tool at any time. You're never locked in.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Trash2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Delete Everything Instantly</p>
                <p className="text-muted-foreground text-xs">Clear your browser data and it's gone. No backups on our end, no recovery needed.</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-3 mt-4">
            <p className="text-xs text-secondary-foreground">
              <strong>Best practices:</strong> Avoid storing sensitive personal info about investors beyond what you need. 
              Use initials or shorthand for intro sources. If it feels too sensitive to write down, trust your memory instead — 
              this tracker is here to support you, not to create a liability.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
