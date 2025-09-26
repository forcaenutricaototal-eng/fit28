import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PlanContextType {
  savedPlans: string[];
  addPlan: (plan: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedPlans, setSavedPlans] = useState<string[]>([]);

  const addPlan = (plan: string) => {
    if (!savedPlans.includes(plan)) {
        setSavedPlans(prevPlans => [plan, ...prevPlans]);
    }
  };

  return (
    <PlanContext.Provider value={{ savedPlans, addPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
