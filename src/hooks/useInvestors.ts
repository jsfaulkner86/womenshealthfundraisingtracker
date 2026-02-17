import { useState, useEffect, useCallback } from 'react';
import type { Investor } from '@/lib/types';

const STORAGE_KEY = 'femtech-fundraising-pipeline';
const REFLECTION_KEY = 'femtech-weekly-reflection';
const ONBOARDING_KEY = 'femtech-onboarding-dismissed';
const STATS_SNAPSHOT_KEY = 'femtech-stats-snapshot';

export function useInvestors() {
  const [investors, setInvestors] = useState<Investor[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      // Migrate older investors missing new fields
      return parsed.map((inv: any) => ({
        ...inv,
        introPath: inv.introPath ?? '',
        founderNotes: inv.founderNotes ?? '',
        isPractice: inv.isPractice ?? false,
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investors));
  }, [investors]);

  const addInvestor = useCallback((investor: Investor) => {
    setInvestors(prev => [...prev, investor]);
  }, []);

  const updateInvestor = useCallback((updated: Investor) => {
    setInvestors(prev =>
      prev.map(inv => inv.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : inv)
    );
  }, []);

  const deleteInvestor = useCallback((id: string) => {
    setInvestors(prev => prev.filter(inv => inv.id !== id));
  }, []);

  const updateFunnelStage = useCallback((id: string, stage: Investor['funnelStage']) => {
    setInvestors(prev =>
      prev.map(inv => inv.id === id ? { ...inv, funnelStage: stage, updatedAt: new Date().toISOString() } : inv)
    );
  }, []);

  return { investors, addInvestor, updateInvestor, deleteInvestor, updateFunnelStage };
}

export function useWeeklyReflection() {
  const [reflection, setReflectionState] = useState(() => {
    return localStorage.getItem(REFLECTION_KEY) || '';
  });
  const setReflection = (text: string) => {
    setReflectionState(text);
    localStorage.setItem(REFLECTION_KEY, text);
  };
  return { reflection, setReflection };
}

export function useOnboarding() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });
  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };
  return { dismissed, dismiss };
}

export interface StatsSnapshot {
  meetingsScheduled: number;
  weekStart: string;
}

export function useStatsSnapshot() {
  const [snapshot, setSnapshotState] = useState<StatsSnapshot | null>(() => {
    try {
      const stored = localStorage.getItem(STATS_SNAPSHOT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const saveSnapshot = (snap: StatsSnapshot) => {
    setSnapshotState(snap);
    localStorage.setItem(STATS_SNAPSHOT_KEY, JSON.stringify(snap));
  };
  return { snapshot, saveSnapshot };
}
