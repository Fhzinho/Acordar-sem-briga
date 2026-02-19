import React from 'react';
import { AppView } from '../types';
import { Button } from './Button';
import { X, Clock, Wind, Volume2, Fingerprint, Repeat } from 'lucide-react';

interface QuickModeProps {
  onNavigate: (view: AppView) => void;
}

export const QuickMode: React.FC<QuickModeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-[#FFF8F0] animate-fade-in">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-6">
           <div className="bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200/50 shadow-sm">
             <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-stone-600">Momento de ajuste</span>
           </div>
          <button onClick={() => onNavigate(AppView.HOME)} className="p-2 -mr-2 text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3 text-stone-800 mb-2">
            <div className="p-2 bg-orange-50 rounded-xl text-orange-400 border border-orange-100/50">
              <Clock size={20} />
            </div>
            <h2 className="text-2xl font-serif font-medium tracking-tight">Manhã Difícil</h2>
        </div>
        <p className="text-sm text-stone-500 ml-1 font-medium">Atraso ou resistência? Vamos retomar com calma.</p>
      </div>

      {/* Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4 no-scrollbar">
        
        {/* Block 1 - Base Regulation */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-orange-100/30 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-200/50"></div>
          <div className="flex items-center gap-2.5 mb-3 text-stone-800">
            <Wind size={16} className="text-orange-300" />
            <h3 className="font-semibold text-[11px] uppercase tracking-[0.15em] text-stone-400">Antes de falar novamente</h3>
          </div>
          <p className="text-lg text-stone-800 leading-snug font-medium mb-1">
            Respire fundo uma vez.
          </p>
          <p className="text-sm text-stone-500">
            Se subir o tom, ele trava.
          </p>
        </div>

        {/* Block 2 - Tension */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-white/50">
          <h3 className="font-semibold text-[11px] uppercase tracking-[0.15em] text-stone-400 mb-4 flex items-center gap-2">
            <Volume2 size={16} className="text-stone-300" />
            Reduza a tensão
          </h3>
          
          <p className="text-sm font-medium text-stone-800 mb-3">Aproxime-se.</p>

          <ul className="space-y-3 pl-1">
            <li className="flex items-center gap-3 text-stone-600 text-sm">
              <div className="w-1 h-1 rounded-full bg-stone-300" />
              Toque no ombro
            </li>
            <li className="flex items-center gap-3 text-stone-600 text-sm">
              <div className="w-1 h-1 rounded-full bg-stone-300" />
              Fale perto
            </li>
            <li className="flex items-center gap-3 text-stone-600 text-sm">
              <div className="w-1 h-1 rounded-full bg-stone-300" />
              Voz baixa
            </li>
          </ul>
        </div>

        {/* Block 3 - Action */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-white/50">
          <h3 className="font-semibold text-[11px] uppercase tracking-[0.15em] text-stone-400 mb-4 flex items-center gap-2">
            <Fingerprint size={16} className="text-stone-300" />
            Escolha uma única ação
          </h3>
          <p className="text-stone-600 mb-4 text-sm">Dê apenas uma frase curta.</p>
          
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 mb-4 flex items-center justify-center">
             <p className="font-semibold text-stone-800 text-xl tracking-tight">“Senta na cama.”</p>
          </div>
          
          <div className="flex gap-4 text-[11px] font-medium text-stone-400 justify-center uppercase tracking-wide">
            <span>Nada de frase longa</span>
            <span className="text-stone-300">•</span>
            <span>Nada de ameaça</span>
          </div>
        </div>

         {/* Block 4 - Resistance */}
         <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-orange-200/40">
          <h3 className="font-semibold text-[11px] uppercase tracking-[0.15em] text-orange-800/60 mb-3 flex items-center gap-2">
            <Repeat size={16} />
            Se ainda houver resistência
          </h3>
          
          <p className="text-sm font-medium text-stone-800 mb-2">Não negocie.</p>

          <p className="text-stone-600 text-sm leading-relaxed">
            Repita a mesma frase no mesmo tom.<br/>
            Não aumente. Não mude.
          </p>
        </div>
        
        {/* Spacer for button visibility */}
        <div className="h-4"></div>
      </div>

      <div className="p-6 pt-2 bg-[#FFF8F0]">
        <Button onClick={() => onNavigate(AppView.END_SCREEN)} className="bg-stone-800 text-white hover:bg-stone-900 shadow-lg shadow-stone-800/10 border-none py-4">
          Aplicar agora
        </Button>
      </div>
    </div>
  );
};