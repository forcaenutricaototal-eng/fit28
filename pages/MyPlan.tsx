import React from 'react';
import { usePlan } from '../context/PlanContext';
import { DocumentTextIcon } from '../components/Icons';

const MyPlan: React.FC = () => {
  const { savedPlans } = usePlan();

  return (
    <div className="flex flex-col h-full text-white p-4">
      <header className="pt-4 pb-4">
        <h1 className="text-2xl font-bold text-center">Meu Plano</h1>
        <p className="text-center text-brand-text-secondary text-sm">Suas receitas e planos salvos.</p>
      </header>
      
      <div className="flex-1 overflow-y-auto mt-4 space-y-4">
        {savedPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-brand-text-secondary p-8">
            <DocumentTextIcon className="w-16 h-16 mb-4"/>
            <h2 className="text-xl font-bold text-white mb-2">Nenhum plano salvo</h2>
            <p>Converse com nossa I.A. e salve suas receitas favoritas para vê-las aqui!</p>
          </div>
        ) : (
          savedPlans.map((plan, index) => (
            <div key={index} className="bg-brand-gray-1 p-4 rounded-xl">
              <p className="text-sm whitespace-pre-wrap">{plan}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPlan;
