import React, { useState } from 'react';
import { AppView } from '../types';
import { Button } from './Button';
import { Check, ArrowLeft, Star } from 'lucide-react';

interface PrepareTomorrowProps {
  onNavigate: (view: AppView) => void;
}

export const PrepareTomorrow: React.FC<PrepareTomorrowProps> = ({ onNavigate }) => {
  const [items, setItems] = useState([
    { id: 1, label: 'Mochila pronta', checked: false },
    { id: 2, label: 'Roupa separada', checked: false },
    { id: 5, label: 'Lancheira organizada', checked: false },
    { id: 3, label: 'Ambiente organizado', checked: false },
    { id: 4, label: 'Horário definido', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const allChecked = items.every(i => i.checked);

  return (
    <div className="flex flex-col h-full p-6 pt-8 animate-fade-in bg-white">
      <div className="flex items-center mb-8">
        <button onClick={() => onNavigate(AppView.HOME)} className="p-2 -ml-2 text-brand-gray hover:text-brand-dark transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-brand-dark ml-2 tracking-tight">Preparar Amanhã</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <div className="space-y-4">
            {items.map((item) => (
            <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`
                flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer group select-none
                ${item.checked 
                    ? 'bg-brand-blue/30 border-brand-blue/50 shadow-sm' 
                    : 'bg-white border-gray-100 shadow-sm hover:border-brand-blue/30'}
                `}
            >
                <span className={`text-lg transition-colors duration-300 ${item.checked ? 'text-brand-dark font-medium' : 'text-gray-500 font-light'}`}>
                {item.label}
                </span>
                <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${item.checked 
                    ? 'bg-brand-dark border-brand-dark scale-110' 
                    : 'border-gray-200 group-hover:border-brand-blue/50'}
                `}>
                {item.checked && <Check size={14} className="text-white" />}
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 relative z-10">
        {allChecked && (
          <div className="mb-4 text-center animate-fade-in">
             <div className="inline-flex items-center gap-2 bg-brand-greenSoft/50 px-4 py-1 rounded-full text-brand-dark text-xs font-bold tracking-wide text-green-700 mb-2">
                <Star size={12} className="fill-green-700" />
                TUDO PRONTO
             </div>
             <p className="text-sm text-gray-500">Amanhã começa mais leve.</p>
          </div>
        )}
        
        <Button 
          variant="primary"
          onClick={() => onNavigate(AppView.PREPARE_END)}
          disabled={!allChecked}
          className={`
            w-full transition-all duration-500 py-5 text-lg tracking-wide rounded-2xl
            ${allChecked 
                ? '!bg-brand-dark !text-white !shadow-glow hover:!bg-stone-800 hover:scale-[1.02] ring-4 ring-brand-gold/20 opacity-100' 
                : 'opacity-40 grayscale cursor-not-allowed shadow-none'}
          `}
        >
          {allChecked ? "Concluir Preparação" : "Marque os itens acima"}
        </Button>
      </div>
    </div>
  );
};