import { useState, useEffect, useCallback } from 'react';
import type { Investor } from '@/lib/types';

const STORAGE_KEY = 'femtech-fundraising-pipeline';

export function useInvestors() {
  const [investors, setInvestors] = useState<Investor[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
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
