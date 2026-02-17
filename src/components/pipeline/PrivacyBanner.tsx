import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { ShieldCheck, Globe, Eye, Download, Trash2, Lock } from 'lucide-react';

interface PrivacyBannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyBanner({ open, onOpenChange }: PrivacyBannerProps) {
  const commitments = [
    {
      icon: Globe,
      title: "Runs entirely in your browser",
      desc: "All data is stored in your browser's local storage. Nothing leaves your device—no servers, no cloud sync, no API calls.",
    },
    {
      icon: Lock,
      title: "No logins, no accounts, no tracking",
      desc: "There are no user accounts, no analytics, no cookies, and no tracking pixels. You are invisible to us.",
    },
    {
      icon: Eye,
      title: "No one else can see your pipeline",
      desc: "There is no shared database. Your investor data is inaccessible to anyone but you, including the tool creator.",
    },
    {
      icon: Download,
      title: "Export or migrate anytime",
      desc: "Copy your data to Notion, Google Sheets, or any other tool whenever you want. You're never locked in.",
    },
    {
      icon: Trash2,
      title: "Delete everything in one click",
      desc: "Clear your browser data and it's gone permanently. No backups on our end, no recovery process needed.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Privacy Commitment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            This tracker is built on a simple principle: <span className="text-foreground font-medium">your fundraising data belongs to you</span>. 
            We treat it with the same care you'd expect for clinical data.
          </p>

          <div className="space-y-4">
            {commitments.map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/60 rounded-lg p-4 mt-5">
            <p className="text-[12px] text-secondary-foreground leading-relaxed">
              <span className="font-semibold">A note on best practices:</span> Avoid storing sensitive personal information about investors 
              beyond what you need to manage relationships. Use initials for intro sources. If something feels too sensitive 
              to write down, trust your memory—this tool supports your judgment, not replaces it.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
